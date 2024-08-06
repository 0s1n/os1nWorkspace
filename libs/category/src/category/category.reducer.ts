import { createReducer, on, Action, createFeature } from '@ngrx/store';

import * as CategoryActions from './category.actions';

export const CATEGORY_FEATURE_KEY = 'category';

export interface CategoryState {
  category?: string[]; // list of Categories
  currentCategory?: string; // which Category record has been selected
  loaded: boolean; // has the Category list been loaded
  error?: string | null; // last known error (if any)
}

export interface CategoryPartialState {
  readonly [CATEGORY_FEATURE_KEY]: CategoryState;
}

export const initialCategoryState: CategoryState = {
  // set initial required properties
  category: [],
  currentCategory: '',
  loaded: false,
};

const reducer = createReducer(
  initialCategoryState,
  on(CategoryActions.initCategory, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CategoryActions.loadCategorySuccess, (state, { categories }) => ({
    ...state,
    category: categories,
    loaded: true,
  })),
  on(CategoryActions.loadCategoryFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function categoryReducer(
  state: CategoryState | undefined,
  action: Action
) {
  return reducer(state, action);
}
