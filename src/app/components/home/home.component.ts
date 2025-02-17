import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Status} from '../../models/status.model';
import {TaskService} from '../../services/task/task.service';
import {TaskDTOModel} from '../../models/taskDTO.model';


@Component({
  selector: 'app-home',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  statuses: Status[] =[];
  tasksByStatus: { [key: number]: TaskDTOModel[] } = {};
  errorMessage: string = '';

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.loadStatuses();
  }

  loadStatuses(): void {
    this.taskService.getStatuses().subscribe(statuses => {
      this.statuses = statuses;

        this.statuses.forEach(status => {
        this.loadTasksByStatus(status.id);
      });
    });
  }

  loadTasksByStatus(statusId: number): void {
    this.taskService.getTasksByStatus(statusId).subscribe(tasks => {
      this.tasksByStatus[statusId] = tasks;
    });
  }

  deleteTask(id: number) : void {
    this.taskService.deleteTask(id).subscribe({

      next: () => {
        this.loadStatuses();
      },
      error: (error): void => {
        this.errorMessage = error;
      }
      }
    )
  }




}
