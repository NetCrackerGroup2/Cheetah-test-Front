import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionsAndCompoundsService} from '../../services/actions-compounds/actions-and-compounds.service';

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.css']
})
export class DataSetComponent implements OnInit {
  dataSetId: number;
  dataSetName: string;
  isFound = true;

  constructor(private route: ActivatedRoute,
              // private libraryService: LibraryService,
              private router: Router,
              private actionsCompoundService: ActionsAndCompoundsService) {
  }

  ngOnInit(): void {
    this.dataSetId = +this.route.snapshot.paramMap.get('id');
    this.dataSetName = this.route.snapshot.paramMap.get('name');
  }
}
