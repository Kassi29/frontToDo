import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {

  statuses = [
    {id: 1, name: 'To Do'},
    {id: 2, name: 'In Progress'},
    {id: 3, name: 'Done'},
  ]

  category1 = {
    id: 1,
    name:'university'
  }
  category2 = {
    id: 2,
    name:'job'
  }

  category3 = {
    id: 3,
    name:'gym'
  }

  title = 'ToDoFront';

  tasks = [
    { id: 1, name: 'Task 1', description: 'Omg this is a description',
      category: this.category3
    },
    { id:2,  name: 'Task 2', description: 'Omg this is a description',
      category: this.category2
    },
    { id: 3,name: 'Task 3', description: 'Omg this is a description',
      category: this.category1
    },
    { id: 4,name: 'Task 4', description: 'Omg this is a description',
      category: this.category3
    },
    { id:5, name: 'Task 5', description: 'Omg this is a description',
      category: this.category1
    },
    { id:6, name: 'Task 6', description: 'Omg this is a description',
      category: this.category2
    }
  ]


}
