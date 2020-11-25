import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LibraryService} from '../../services/library/library.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Library} from '../../models/library/library';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-library',
  templateUrl: './edit-library.component.html',
  styleUrls: ['./edit-library.component.css']
})
export class EditLibraryComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  library: Library;
  loading = false;
  editLibrarySubscription: Subscription;
  successMessage: string;

  constructor(private route: ActivatedRoute,
              private libraryService: LibraryService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    const editUrl = this.route.snapshot.paramMap.has('id');

    if (editUrl) {
      this.library = this.libraryService.libraryOnEdit;
    } else {
      this.library = new Library();
    }

    this.editForm = this.formBuilder.group({
      name: new FormControl(this.library.name,
        [Validators.required, Validators.maxLength(10)]),
      description: new FormControl(this.library.description,
        [Validators.required, Validators.maxLength(50)])
    });
  }

  get description(): any {
    return this.editForm.get('description');
  }

  get name(): any {
    return this.editForm.get('name');
  }

  onSubmit(): void {
    this.successMessage = '';
    this.loading = true;

    let isUndefined = false;
    if (this.library.description === undefined) {
      isUndefined = true;
    }

    this.library.description = this.description.value;
    this.library.name = this.name.value;

    if (!isUndefined) {
      this.editLibrarySubscription = this.libraryService.saveLibrary(this.library).subscribe(() => {
        this.loading = false;
        this.editForm.reset();
        this.successMessage = 'Library has been updated';
      });
    } else {
      this.editLibrarySubscription = this.libraryService.createLibrary(this.library).subscribe(() => {
        this.loading = false;
        this.editForm.reset();
        this.successMessage = 'Library has been created';
      });
    }

  }

  ngOnDestroy(): void {
    if (this.editLibrarySubscription) {
      this.editLibrarySubscription.unsubscribe();
    }

  }
}
