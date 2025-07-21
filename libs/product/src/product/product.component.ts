import { Component, Input, OnChanges } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { productActions } from '../store/product.actions';
import { selectAllProduct } from '../store/product.selectors';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-product',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [AsyncPipe, JsonPipe],
})
export class ProductComponent implements OnChanges {
  @Input() categoryName = '';

  @Input() animation: any;

  product$ = this.store.select(selectAllProduct);

  constructor(private readonly store: Store) {}

  ngOnChanges() {
    this.store.dispatch(
      productActions.loadProduct({
        categoryName: this.categoryName,
      })
    );
  }
}
