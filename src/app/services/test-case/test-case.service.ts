import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Compound} from '../../models/compound/compound';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  constructor() {
  }

}


interface GetResponseTestCases {
  testCaseList: Compound[];
  totalElements: number;
}
