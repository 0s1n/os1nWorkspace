import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainNavComponent } from './main-nav/main-nav.component';

@Component({
  standalone: true,
  imports: [RouterModule, MainNavComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-ecommerce';
}
