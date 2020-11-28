import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {DataSet} from '../../models/data-set/data-set';

@Injectable({
  providedIn: 'root'
})
export class DataSetService {

  constructor(private http: HttpClient) {
  }

  getDataSets(thePageNumber: number, thePageSize: number): Observable<GetResponseDataSets> {
    const url = `${environment.apiUrl}/api/data-set?&title=&size=${thePageSize}&page=${thePageNumber}`;
    return this.http.get<GetResponseDataSets>(url);
  }

  searchDataSets(thePageNumber: number, thePageSize: number, theKeyword: string): Observable<GetResponseDataSets> {
    const url = `${environment.apiUrl}/api/data-set?&title=${theKeyword}&size=${thePageSize}&page=${thePageNumber}`;
    return this.http.get<GetResponseDataSets>(url);
  }

  deleteDataSet(id: number): Observable<any> {
    const url = `${environment.apiUrl}/api/data-set?id=${id}`;
    return this.http.delete<GetResponseDataSets>(url);
  }
}

interface GetResponseDataSets {
    dataSets: DataSet[];
    totalDataSets: number;
}
