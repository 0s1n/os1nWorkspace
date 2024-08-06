import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map } from 'rxjs';
import * as CategoryActions from './category.actions';
import { CategoryService } from '../lib/category.service';

@Injectable()
export class CategoryEffects {
  private actions$ = inject(Actions);
  private categoryService = inject(CategoryService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.initCategory),
      exhaustMap(() =>
        this.categoryService.getCategories().pipe(
          map((categories) =>
            CategoryActions.loadCategorySuccess({
              categories: categories,
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(CategoryActions.loadCategoryFailure({ error }));
          })
        )
      )
    )
  );
}
