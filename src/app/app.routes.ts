import { Routes } from '@angular/router';
import {CreateTaskComponent} from './components/create-task/create-task.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create-task', component: CreateTaskComponent},

];
