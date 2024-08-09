import { inject, Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, mergeMap, map } from 'rxjs';
import * as ProductActions from './product.actions';
import { ProductService } from '../service/product.service';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.productActions.loadProduct),
      mergeMap(({ categoryName }) =>
        this.productService.getProductsByCategory(categoryName).pipe(
          map((product) =>
            ProductActions.productActions.productSuccess({ product })
          ),
          catchError((error) =>
            of(ProductActions.productActions.productFailure({ error }))
          )
        )
      )
    )
  );
}

// export const loadProduct = createEffect(
//   (actions$ = inject(Actions), productService = inject(ProductService)) => {
//     return actions$.pipe(
//       ofType(ProductActions.productActions.loadProduct),
//       mergeMap(({ categoryName }) =>
//         productService.getProductsByCategory(categoryName).pipe(
//           map((product) =>
//             ProductActions.productActions.productSuccess({ product })
//           ),
//           catchError((error) =>
//             of(ProductActions.productActions.productFailure({ error }))
//           )
//         )
//       )
//     );
//   },
//   { functional: true }
// );
