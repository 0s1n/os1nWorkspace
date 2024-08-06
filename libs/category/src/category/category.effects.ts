import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CategoryService } from '../lib/category.service';

import * as categoryActions from './category.actions';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.initCategory),
      exhaustMap(() =>
        this.categoryService.getCategories().pipe(
          map((categories) =>
            categoryActions.loadCategorySuccess({ categories })
          ),
          catchError((error) =>
            of(categoryActions.loadCategoryFailure({ error }))
          )
        )
      )
    )
  );
}
