import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  PRODUCT_FEATURE_KEY,
  ProductEffects,
  productReducer,
} from '@os1n-workspace/product';

export const appRoutes: Route[] = [
  {
    path: 'category/:categoryName',
    loadComponent: () =>
      import('@os1n-workspace/product').then((m) => m.ProductComponent),
    data: { animation: 'Category Page' },
    providers: [
      provideState(PRODUCT_FEATURE_KEY, productReducer),
      provideEffects(ProductEffects),
    ],
  },
];
