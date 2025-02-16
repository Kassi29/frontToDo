import { Injectable } from '@angular/core';

import {Category} from '../../models/category.model';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable <Category []>{
    return this.http.get<Category[]>(this.url);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError(() => throwError(() => new Error('This category can\'t be deleted because it has tasks. Please delete the tasks first.')))
    );
  }



}
