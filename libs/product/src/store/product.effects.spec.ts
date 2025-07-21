import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import * as ProductActions from './product.actions';
import { ProductEffects } from './product.effects';
import { ProductService } from '../service/product.service';
import { ProductEntity } from './product.models';

describe('ProductEffects', () => {
  let actions$: Observable<Action>;
  let effects: ProductEffects;
  let productService: ProductService;
  let testScheduler: TestScheduler;

  const mockProducts: ProductEntity[] = [
    {
      id: 1,
      title: 'Test Product',
      price: 100,
      description: 'Test Description',
      category: 'test',
      image: 'test.jpg'
    }
  ];

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    const mockProductService = {
      getProductsByCategory: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: ProductService, useValue: mockProductService }
      ],
    });

    effects = TestBed.inject(ProductEffects);
    productService = TestBed.inject(ProductService);
  });

  describe('init$', () => {
    it('should return productSuccess with products on successful load', (done) => {
      const mockFn = productService.getProductsByCategory as jest.Mock;
      mockFn.mockReturnValue(of(mockProducts));

      actions$ = of(ProductActions.productActions.loadProduct({ categoryName: 'electronics' }));

      effects.init$.subscribe(action => {
        expect(action).toEqual(
          ProductActions.productActions.productSuccess({ product: mockProducts })
        );
        expect(mockFn).toHaveBeenCalledWith('electronics');
        done();
      });
    });

    it('should return productFailure on error', (done) => {
      const error = new Error('Error loading products');
      const mockFn = productService.getProductsByCategory as jest.Mock;
      mockFn.mockReturnValue(throwError(() => error));

      actions$ = of(ProductActions.productActions.loadProduct({ categoryName: 'electronics' }));

      effects.init$.subscribe(action => {
        expect(action).toEqual(
          ProductActions.productActions.productFailure({ error })
        );
        done();
      });
    });

    it('should handle empty response', (done) => {
      const mockFn = productService.getProductsByCategory as jest.Mock;
      mockFn.mockReturnValue(of([]));

      actions$ = of(ProductActions.productActions.loadProduct({ categoryName: 'non-existent' }));

      effects.init$.subscribe(action => {
        expect(action).toEqual(
          ProductActions.productActions.productSuccess({ product: [] })
        );
        done();
      });
    });

    it('should handle multiple sequential requests', (done) => {
      const products1 = [{ ...mockProducts[0], category: 'electronics' }];
      const products2 = [{ ...mockProducts[0], category: 'clothing' }];

      const mockFn = productService.getProductsByCategory as jest.Mock;
      mockFn
        .mockReturnValueOnce(of(products1))
        .mockReturnValueOnce(of(products2));

      const actions = [
        ProductActions.productActions.loadProduct({ categoryName: 'electronics' }),
        ProductActions.productActions.loadProduct({ categoryName: 'clothing' })
      ];

      let count = 0;
      const expected = [
        ProductActions.productActions.productSuccess({ product: products1 }),
        ProductActions.productActions.productSuccess({ product: products2 })
      ];

      actions$ = of(...actions);

      effects.init$.subscribe({
        next: (action) => {
          expect(action).toEqual(expected[count]);
          count++;
          if (count === actions.length) {
            done();
          }
        },
        error: done,
      });
    });
  });
});