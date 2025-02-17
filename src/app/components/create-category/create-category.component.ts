import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category/category.service';
import {NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Category} from '../../models/category.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, RouterLink],
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent implements OnInit{
  categoryForm: FormGroup;
  errorMessage: string = '';

  categoryId: number = 0;
  title: string = 'Create a new category';



  constructor(private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,) {
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

  ngOnInit(): void {
    this.categoryId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if(this.categoryId){
      this.title="Update Category";
      this.loadCategory(this.categoryId);
    }
  }

  loadCategory(id: number): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        this.categoryForm.patchValue({
          name: category.name,
          color: category.color,
        });
      },error: (error) => {
        this.errorMessage = error;
      }
    })
  }


  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.errorMessage = 'Please fill all the fields';
      return;
    }

    const categoryData: Category = this.categoryForm.value;

    if(this.categoryId ){

      console.log(this.categoryForm.value);

      this.categoryService.updateCategory(this.categoryId, categoryData).subscribe({
        next: () => {
          this.categoryForm.reset();
          this.router.navigate(['/list-categories']);
        },
        error: (error) => {
          this.errorMessage = error;
        }
      })
    }else{

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

}
