import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Status} from '../../models/status.model';
import {catchError, Observable, throwError} from 'rxjs';
import {TaskDTOModel} from '../../models/taskDTO.model';
import {Task} from '../../models/task.model';
import {ErrorHandlerService} from '../error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private statusUrl = 'http://localhost:8080/status';
  private taskUrl = 'http://localhost:8080/tasks/filter/';

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService
  ) { }

  createTask(task: Task){
    return this.http.post<Task>(this.taskUrl , task)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusUrl);
  }

  getTasksByStatus(id: number): Observable<TaskDTOModel[]>{
    return this.http.get<TaskDTOModel[]>(`${this.taskUrl}${id}`);
  }


}
