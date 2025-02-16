import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category/category.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {Category} from '../../models/category.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  categoryForm: FormGroup;
  errorMessage: string = '';


  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder, private router: Router) {
    this.categoryForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3)
      ]
      ],
      color: ['#578571', Validators.required],
    })
  }


  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.errorMessage = 'Please fill all the fields';
      return;
    }

    const categoryData: Category = this.categoryForm.value;

    this.categoryService.createCategory(categoryData).subscribe( {
      next: () => {
        this.categoryForm.reset();
        this.router.navigate(['/list-categories']);
      },
        error: (error) => {
          this.errorMessage = error;
        }
    }

    )
  }

}
