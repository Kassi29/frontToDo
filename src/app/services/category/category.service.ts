import { Injectable } from '@angular/core';

import {Category} from '../../models/category.model';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ErrorHandlerService} from '../error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = 'http://localhost:8080/categories';

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService
  ) {
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url , category)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  getCategories(): Observable <Category []>{
    return this.http.get<Category[]>(this.url)
      .pipe(
        catchError(this.errorHandler.handleError)
      );;
  }

  getCategoryById(id:number): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`).pipe(
      catchError(this.errorHandler.handleError)
    );

  }

  updateCategory(id:number, category: Category): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, category)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

    deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError(this.errorHandler.handleError)
    );
  }




}
