import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Status} from '../../models/status.model';
import {TaskService} from '../../services/task/task.service';
import {TaskDTOModel} from '../../models/taskDTO.model';
import {RouterLink} from '@angular/router';
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-home',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup
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
    this.taskService.getStatuses().subscribe({
      next: statuses => {
        this.statuses = statuses;

        this.statuses.forEach(status => {
          this.loadTasksByStatus(status.id)

        });
      },
      error: (error): void => {
        this.errorMessage = error;
      }
    })
  }

  loadTasksByStatus(statusId: number): void {
    this.taskService.getTasksByStatus(statusId).subscribe({
      next: (tasks) => {
        this.tasksByStatus[statusId] = tasks;
      },
      error: (error): void => {
      this.errorMessage = error;
    }
    }
    )

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


  drop(event: CdkDragDrop<{ [key: number]: TaskDTOModel[] }, any>) {
    const { previousIndex, currentIndex, container, previousContainer } = event;

    const currentColumnId = Number(container.id);
    const previousColumnId =Number(previousContainer.id);
    const previousColumnData = previousContainer.data[previousColumnId] ;
    const currentColumnData = container.data[currentColumnId] ;

    transferArrayItem(previousColumnData, currentColumnData, previousIndex, currentIndex);

  }

  protected readonly String = String;
}
