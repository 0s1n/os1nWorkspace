import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainNavComponent } from './main-nav/main-nav.component';
import { initCategory, selectAllCategory } from '@os1n-workspace/category';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  imports: [RouterModule, MainNavComponent, AsyncPipe, JsonPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-ecommerce';

  categories$ = this.store.select(selectAllCategory);

  // categories$ = this.categoryService.getCategories();

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(initCategory());
  }
}
