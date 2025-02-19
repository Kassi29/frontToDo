import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Status} from '../../models/status.model';
import {catchError, Observable} from 'rxjs';
import {TaskDTOModel} from '../../models/taskDTO.model';
import {Task} from '../../models/task.model';
import {ErrorHandlerService} from '../error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private statusUrl = 'http://localhost:8080/status';
  private taskUrl = 'http://localhost:8080/tasks';

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
    return this.http.get<Status[]>(this.statusUrl).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  getTasksByStatus(id: number): Observable<TaskDTOModel[]>{
    return this.http.get<TaskDTOModel[]>(`${this.taskUrl}/filter/${id}`).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  getTaskById(id: number): Observable<Task>{
    return this.http.get<Task>(`${this.taskUrl}/${id}`).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  updateTask(id: number, task: Task){
    return this.http.put<Task>(`${this.taskUrl}/${id}`, task).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.taskUrl}/${id}`).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  changeStatus(id:number, status:Status){
    return this.http.put<void>(`${this.taskUrl}/${id}/status`,status).pipe(
      catchError(this.errorHandler.handleError)
    )
  }

  getStatusById(id: number): Observable<Status> {
    return this.http.get<Status>(`${this.statusUrl}/${id}`).pipe(
      catchError(this.errorHandler.handleError)
    )
  }


}
