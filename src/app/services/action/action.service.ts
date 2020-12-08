import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Action} from '../../models/action/action';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ActionDto} from '../../models/actionDto/action-dto';
import {catchError, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {CompoundDtoWithActions} from '../../models/compound-actions-dto/compound-dto-with-actions';
import {Compound} from '../../models/compound/compound';

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
    return this.http.put<GetResponseActions>(url, new ActionDto(description))
      .pipe(
        catchError(err => of(err))
      );
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
    return this.http.post<CompoundDtoWithActions>(url, compoundWithActions)
      .pipe(
        catchError(err => of(err))
      );
  }

  getAction(id: number): Observable<Action> {
    const url = `${environment.apiUrl}/api/library/actions/${id}`;
    return this.http.get<Action>(url);
  }

  getActionsByCompoundId(compoundId: number): Observable<Action[]> {
    const url = `${environment.apiUrl}/api/library/${compoundId}/all-actions`;
    return this.http.get<Action[]>(url);
  }

  saveOrder(compound: Compound, actions: Action[]): Observable<any> {
    const url = `${environment.apiUrl}/api/library/${compound.id}`;

    const compoundWithActions: CompoundDtoWithActions =
      new CompoundDtoWithActions(compound, actions);

    return this.http.put<any>(url, compoundWithActions)
      .pipe(
        catchError(err => of(err))
      );
  }
}

interface GetResponseActions {
  list: Action[];
  totalElements: number;
}
