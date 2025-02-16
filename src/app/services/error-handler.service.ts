import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
  })

export class ErrorHandlerService {
  handleError(error: HttpErrorResponse) {
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
