import { Component } from '@angular/core';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './components/home/home.component';



@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent,
    CommonModule, HomeComponent, RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {

}
