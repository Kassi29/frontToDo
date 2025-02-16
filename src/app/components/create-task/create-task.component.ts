import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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
    NgForOf
  ],
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit  {
  taskForm: FormGroup;
  errorMessage: string = '';
  categories: Category[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private taskService: TaskService,
              private categoryService: CategoryService) {

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
      category: [null,[
        Validators.required,
      ]]

    })
  }

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.errorMessage = '';
      },
      error: (error) => {
        console.log('Error loading categories:', error);
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
