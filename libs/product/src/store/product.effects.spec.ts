import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ProductActions from './product.actions';
import { ProductEffects } from './product.effects';
import { ProductService } from '../service/product.service';

describe('ProductEffects', () => {
  let actions: Observable<Action>;
  let effects: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ProductEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ProductService);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: ProductActions.productActions.loadProduct({ categoryName: 'test' }),
      });

      const expected = hot('-a-|', {
        a: ProductActions.productActions.productSuccess({ product: [] }),
      });

      expect(effects.getProductsByCategory).toBeObservable(expected);
    });
  });
});
