import {Injectable} from '@angular/core';
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

  getDataSets(thePageNumber: number, thePageSize: number, theTestCase: number): Observable<GetResponseDataSets> {
    const url = `${environment.apiUrl}/api/data-set?&title=&size=${thePageSize}&page=${thePageNumber}&idTestCase=${theTestCase}`;
    return this.http.get<GetResponseDataSets>(url);
  }

  searchDataSets(thePageNumber: number, theTestCaseId: number, thePageSize: number, theKeyword: string): Observable<GetResponseDataSets> {
    const url = `${environment.apiUrl}/api/data-set?&title=${theKeyword}&size=${thePageSize}&page=${thePageNumber}&idTestCase=${theTestCaseId}`;
    return this.http.get<GetResponseDataSets>(url);
  }

  deleteDataSet(id: number): Observable<any> {
    const url = `${environment.apiUrl}/api/data-set?&id=${id}`;
    return this.http.delete<any>(url);
  }
  createDataSet(dataSet: DataSet): Observable<any> {
    const url = `${environment.apiUrl}/api/data-set`;
    return this.http.post<DataSet>(url, dataSet);
  }

  editDataSet(dataset: DataSet): Observable<any>{
    const url = `${environment.apiUrl}/api/data-set/${dataset.id}`;
    return this.http.put<any>(url, dataset);
  }
}

interface GetResponseDataSets {
    dataSets: DataSet[];
    totalElements: number;
}
