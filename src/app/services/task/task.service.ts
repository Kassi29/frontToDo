import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Status} from '../../models/status.model';
import {Observable} from 'rxjs';
import {TaskDTOModel} from '../../models/taskDTO.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private statusUrl = 'http://localhost:8080/status';
  private taskUrl = 'http://localhost:8080/tasks/filter/';

  constructor(private http: HttpClient) { }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusUrl);
  }

  getTasksByStatus(id: number): Observable<TaskDTOModel[]>{
    return this.http.get<TaskDTOModel[]>(`${this.taskUrl}${id}`);
  }
}
