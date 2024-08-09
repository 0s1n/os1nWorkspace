import { Component, Input, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { productActions } from '../store/product.actions';
import {
  selectAllProduct,
  selectProductEntities,
} from '../store/product.selectors';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { selectAllCategory } from '@os1n-workspace/category';

@Component({
  selector: 'lib-product',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [AsyncPipe, JsonPipe],
})
export class ProductComponent implements OnInit {
  @Input() categoryName = '';

  @Input() animation: any;

  product$ = this.store.select(selectProductEntities);

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(
      productActions.loadProduct({ categoryName: this.categoryName })
    );
  }
}
