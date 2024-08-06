import { createAction, props } from '@ngrx/store';

export const initCategory = createAction('[Category Page] Init');

export const loadCategorySuccess = createAction(
  '[Category/API] Load Category Success',
  // (categories: string[]) => ({ categories })
  props<{ categories: string[] }>()
);

export const loadCategoryFailure = createAction(
  '[Category/API] Load Category Failure',
  props<{ error: any }>()
);
