import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Parameter} from '../../models/parameter/parameter';

@Injectable({
  providedIn: 'root'
})
export class EditDataSetService {

  constructor(private http: HttpClient) {
  }

  getParameters(thePageNumber: number, thePageSize: number, theDataSet: number): Observable<GetResponseParameters> {
    const url = `${environment.apiUrl}/api/parameters/${theDataSet}?&type=&size=${thePageSize}&page=${thePageNumber}`;
    return this.http.get<GetResponseParameters>(url);
  }

  searchParameters(thePageNumber: number, theDataSetId: number, thePageSize: number, theKeyword: string): Observable<GetResponseParameters> {
    const url = `${environment.apiUrl}/api/parameters/${theDataSetId}?&type=${theKeyword}&size=${thePageSize}&page=${thePageNumber}`;
    return this.http.get<GetResponseParameters>(url);
  }

  deleteParameter(id: number): Observable<any> {
    const url = `${environment.apiUrl}/api/parameters?&id=${id}`;
    return this.http.delete<GetResponseParameters>(url);
  }
  createParameter(parameter: Parameter): Observable<any> {
    const url = `${environment.apiUrl}/api/parameters`;
    return this.http.post<Parameter>(url, parameter);
  }
}

interface GetResponseParameters {
  parameters: Parameter[];
  totalParameters: number;
}
