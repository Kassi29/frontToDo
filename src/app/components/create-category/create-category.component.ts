import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  standalone: true,
  imports:[FormsModule],
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  chosenColor:string = '#000000';

  saveColor(){

    console.log('The color chosen was: '+ this.chosenColor);
  }

}
