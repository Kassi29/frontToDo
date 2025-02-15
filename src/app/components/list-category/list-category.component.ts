import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-list-category',
  imports: [
    NgForOf
  ],
  templateUrl: './list-category.component.html',
  standalone: true,
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent {
  categories = [
    {
      id: 1,
      name:'university',
      color: '#FFB6C1'
    } ,{
      id: 2,
      name:'job',
      color: '#AEC6CF'
    },{
      id: 3,
      name:'gym',
      color: '#FDFD96'
    }


  ]

}
