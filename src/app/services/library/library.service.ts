import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Library} from '../../models/library/library';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor() {
  }

  // getLibraryList(thePageNumber: number, thePageSize: number): Observable<Library[]> {
  //   return null;
  // }

  getLibraryList(thePageNumber: number, thePageSize: number): Library[] {
    if (thePageNumber === 0) {
      const libraries: Library[] = [
        {title: 'Library1', description: 'this is library n1', createDate: '14.06.2001'},
        {title: 'Library2', description: 'this is library n2', createDate: '15.10.2010'},
        {title: 'Library3', description: 'this is library n3', createDate: '13.04.2000'},
        {title: 'Library4', description: 'this is library n4', createDate: '12.03.1990'},
        {title: 'Library5', description: 'this is library n5', createDate: '11.10.2020'},
      ];
      return libraries.slice(0, thePageSize);
    } else if (thePageNumber === 1) {
      const libraries: Library[] = [
        {title: 'Library6', description: 'this is library n6', createDate: '1.06.2001'},
        {title: 'Library7', description: 'this is library n7', createDate: '2.10.2010'},
        {title: 'Library8', description: 'this is library n8', createDate: '3.04.2000'},
        {title: 'Library9', description: 'this is library n9', createDate: '4.03.1990'},
        {title: 'Library10', description: 'this is library n10', createDate: '5.10.2020'},
      ];
      return libraries.slice(0, thePageSize);
    } else if (thePageNumber === 2) {
      const libraries: Library[] = [
        {title: 'Library11', description: 'this is library n6', createDate: '1.06.2001'},
        {title: 'Library12', description: 'this is library n7', createDate: '2.10.2010'},
        {title: 'Library13', description: 'this is library n8', createDate: '3.04.2000'},
        {title: 'Library14', description: 'this is library n9', createDate: '4.03.1990'},
        {title: 'Library15', description: 'this is library n10', createDate: '5.10.2020'},
      ];
      return libraries.slice(0, thePageSize);
    }

  }

  searchProductsPaginate(thePageNumber: number, thePageSize: number, theKeyword: string): Observable<Library[]> {
    return null;
  }
}
