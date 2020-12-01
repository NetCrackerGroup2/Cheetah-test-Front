import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-general-library',
  templateUrl: './general-library.component.html',
  styleUrls: ['./general-library.component.css']
})
export class GeneralLibraryComponent implements OnInit {

  isAction: boolean = false;
  isCompound: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  viewCompounds(): void {
    this.isAction = false;
    this.isCompound = true;
  }

  viewActions(): void {
    this.isAction = true;
    this.isCompound = false;
  }

  createCompound(): void {
    this.router.navigate(['library-create-compound']);
  }
}
