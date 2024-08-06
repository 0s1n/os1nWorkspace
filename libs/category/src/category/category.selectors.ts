import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CATEGORY_FEATURE_KEY, CategoryState } from './category.reducer';

// Lookup the 'Category' feature state managed by NgRx
export const selectCategoryState =
  createFeatureSelector<CategoryState>(CATEGORY_FEATURE_KEY);

export const selectCategoryLoaded = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.loaded
);

export const selectCategoryError = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.error
);

export const selectAllCategory = createSelector(
  selectCategoryState,
  (state) => state.category
);
