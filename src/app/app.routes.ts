import { Routes } from '@angular/router';
import {CreateTaskComponent} from './components/create-task/create-task.component';
import {HomeComponent} from './components/home/home.component';
import {CreateCategoryComponent} from './components/create-category/create-category.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create-task', component: CreateTaskComponent},
  {path: 'create-category', component: CreateCategoryComponent},

];
