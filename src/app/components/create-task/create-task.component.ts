import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {TaskService} from '../../services/task/task.service';
import {Task} from '../../models/task.model';
import {CategoryService} from '../../services/category/category.service';
import {Category} from '../../models/category.model';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit  {
  taskForm: FormGroup;
  errorMessage: string = '';
  categories: Category[] = [];

  taskId: number = 0;
  title: string = 'Create a new task';


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private taskService: TaskService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,) {

    this.taskForm = this.formBuilder.group({
      name: ['', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3)
      ]],
      category: ['',[
        Validators.required,
      ]]

    })
  }

  ngOnInit() {

    this.taskId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if(this.taskId){
      this.title = 'Update Task';
    }
    this.loadCategories();
  }

  loadTask(id: number): void{

    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        const selectedCategory = this.categories.find( category =>
                                                                              category.name === task.category.name)
        this.taskForm.patchValue({
          name: task.name,
          description: task.description,
          category: selectedCategory
        });
      },error: (error) => {
        this.errorMessage = error;
    }
    })
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {

        this.categories = categories;
        this.errorMessage = '';
        if(this.taskId){
          this.loadTask(this.taskId);

        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to load categories. Please try again later.';
      }
    });
  }

  onSubmit(): void {

    if(this.taskForm.invalid){
      this.errorMessage = 'Please fill all the fields';
      return;
    }


    const taskData: Task = this.taskForm.value;

    const selectedCategory = this.categories.find(c =>
                                                                           c === taskData.category)
    if(selectedCategory){
      taskData.category = selectedCategory;
    }

    if(this.taskId ){


       this.taskService.updateTask(this.taskId, taskData).subscribe({
        next: () =>{
          this.taskForm.reset();
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = error;
        }
      })

    }else{
      this.taskService.createTask(taskData).subscribe( {
        next: () => {
          this.taskForm.reset();
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = error;
        }
      })

    }



  }

}
