import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Action} from '../../models/action/action';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ActionDto} from '../../models/actionDto/action-dto';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {CompoundDtoWithActions} from '../../models/compound-actions-dto/compound-dto-with-actions';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private http: HttpClient) {
  }

  getActions(thePageNumber: number, thePageSize: number): Observable<GetResponseActions> {
    const url = `${environment.apiUrl}/api/library/actions?&title=&size=${thePageSize}&page=${thePageNumber}`;
    return this.http.get<GetResponseActions>(url);
  }

  searchActions(thePageNumber: number, thePageSize: number, theKeyword: string): Observable<GetResponseActions> {
    const url = `${environment.apiUrl}/api/library/actions?&title=${theKeyword}&size=${thePageSize}&page=${thePageNumber}`;
    return this.http.get<GetResponseActions>(url);
  }

  save(id: number, description: string): Observable<any> {
    const url = `${environment.apiUrl}/api/library/actions/${id}`;
    return this.http.put<GetResponseActions>(url, new ActionDto(description));
  }

  search(terms: Observable<string>): Observable<Action[]> {
    return terms.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term: any): Observable<Action[]> {
      const url = `${environment.apiUrl}/api/library/actions/all?title=${term}`;
      return this.http.get<Action[]>(url);
  }

  createCompound(compoundWithActions: CompoundDtoWithActions): Observable<any> {
    const url = `${environment.apiUrl}/api/library`;
    return this.http.post<CompoundDtoWithActions>(url, compoundWithActions);
  }
}

interface GetResponseActions {
  list: Action[];
  totalElements: number;
}
