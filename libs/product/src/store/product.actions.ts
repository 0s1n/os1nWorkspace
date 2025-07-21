/* eslint-disable @typescript-eslint/no-explicit-any */
import { createActionGroup, props } from '@ngrx/store';
import { ProductEntity } from './product.models';

export const productActions = createActionGroup({
  source: 'Product',
  events: {
    'Load Product': props<{ categoryName: string }>(),
    'Product Success': props<{ product: ProductEntity[] }>(),
    'Product Failure': props<{ error: any }>(),
  },
});
