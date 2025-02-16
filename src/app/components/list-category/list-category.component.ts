import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Category} from '../../models/category.model';
import {CategoryService} from '../../services/category/category.service';

@Component({
  selector: 'app-list-category',
  imports: [
    NgForOf
  ],
  templateUrl: './list-category.component.html',
  standalone: true,
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit {
  categories : Category[] = [];

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe( categories =>
    this.categories = categories
    );
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.loadCategories();

      },
      error: (error) => {
        console.log('Failed to delete category' + error);
      }
    })
  }

}
