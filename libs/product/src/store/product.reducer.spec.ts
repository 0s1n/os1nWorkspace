import { Action } from '@ngrx/store';

import * as ProductActions from './product.actions';
import { ProductEntity } from './product.models';
import {
  ProductState,
  initialProductState,
  productReducer,
} from './product.reducer';

describe('Product Reducer', () => {
  describe('valid Product actions', () => {
    it('loadProductSuccess should return the list of known Product', () => {
      const product: ProductEntity[] = [
        {
          category: 'Category A',
          id: 1,
          title: 'Product A',
          description: 'Product A description',
          price: 10,
          image: 'image',
        },
        {
          category: 'Category B',
          id: 2,
          title: 'Product B',
          description: 'Product B description',
          price: 20,
          image: 'image',
        },
      ];
      const action = ProductActions.productActions.productSuccess({ product });

      const result: ProductState = productReducer(initialProductState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = productReducer(initialProductState, action);

      expect(result).toBe(initialProductState);
    });
  });
});
