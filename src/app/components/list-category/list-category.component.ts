import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Category} from '../../models/category.model';
import {CategoryService} from '../../services/category/category.service';

@Component({
  selector: 'app-list-category',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './list-category.component.html',
  standalone: true,
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit {
  categories : Category[] = [];
  errorMessage: string = '';

  constructor(private categoryService: CategoryService) {

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

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.loadCategories();

      },
      error: (error) => {
        this.errorMessage = error;
      }
    })
  }

}
