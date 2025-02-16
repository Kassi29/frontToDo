import { Injectable } from '@angular/core';

import {Category} from '../../models/category.model';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) {
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url , category)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCategories(): Observable <Category []>{
    return this.http.get<Category[]>(this.url);
  }

    deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof Array) {
      errorMessage = error.error[0];
    }else if (error.error instanceof ErrorEvent){
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    return throwError(() => new Error(errorMessage) );
  }



}
