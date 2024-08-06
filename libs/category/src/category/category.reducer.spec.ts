import { Action } from '@ngrx/store';
import * as CategoryActions from './category.actions';
import {
  CategoryState,
  initialCategoryState,
  categoryReducer,
} from './category.reducer';

describe('Category Reducer', () => {
  describe('valid Category actions', () => {
    it('loadCategorySuccess should return the list of known Category', () => {
      const categories = ['Category A', 'Category B', 'Category C'];

      const action = CategoryActions.loadCategorySuccess({
        categories: categories,
      });

      const result: CategoryState = categoryReducer(
        initialCategoryState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.category?.length).toBe(3);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = categoryReducer(initialCategoryState, action);

      expect(result).toBe(initialCategoryState);
    });
  });
});
