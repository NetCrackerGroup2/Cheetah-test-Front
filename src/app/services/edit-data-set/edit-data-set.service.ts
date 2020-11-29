import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Parameter} from '../../models/parameter/parameter';
import {DataSet} from '../../models/data-set/data-set';

@Injectable({
  providedIn: 'root'
})
export class EditDataSetService {

  constructor(private http: HttpClient) {
  }

  getParameters(thePageNumber: number, thePageSize: number, theDataSet: number, theType: string): Observable<GetResponseParameters> {
    const url = `${environment.apiUrl}/api/parameters?&id=${theDataSet}&type=${theType}&size=${thePageSize}&page=${thePageNumber}`;
    return this.http.get<GetResponseParameters>(url);
  }
  //
  searchParameters(thePageNumber: number, theTestCaseId: number, thePageSize: number, theKeyword: string): Observable<GetResponseParameters> {
    const url = `${environment.apiUrl}/api/parameters?&title=${theKeyword}&size=${thePageSize}&page=${thePageNumber}&idTestCase=${theTestCaseId}`;
    return this.http.get<GetResponseParameters>(url);
  }

  deleteParameter(id: number): Observable<any> {
    const url = `${environment.apiUrl}/api/parameters?&id=${id}`;
    return this.http.delete<GetResponseParameters>(url);
  }
  createParameter(parameter: Parameter): Observable<any> {
    const url = `${environment.apiUrl}/api/parameters`;
    return this.http.post<DataSet>(url, parameter);
  }
}

interface GetResponseParameters {
  parameters: Parameter[];
  totalElements: number;
}
