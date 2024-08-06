import { CategoryPartialState, initialCategoryState } from './category.reducer';
import * as CategorySelectors from './category.selectors';

describe('Category Selectors', () => {
  const ERROR_MSG = 'No Error Available';

  let state: CategoryPartialState;

  beforeEach(() => {
    state = {
      category:
        (['Category A', 'Category B', 'Category C'] as string[],
        {
          ...initialCategoryState,
          category: ['Category A', 'Category B', 'Category C'],
          currentCategory: 'Category A',
          error: ERROR_MSG,
          loaded: true,
        }),
    };
  });

  describe('Category Selectors', () => {
    it('selectAllCategory() should return the list of Category', () => {
      const results = CategorySelectors.selectAllCategory(state);

      expect(results?.length).toBe(3);
      expect(results).toEqual(['Category A', 'Category B', 'Category C']);
    });

    // it('selectEntity() should return the selected Entity', () => {
    //   const result = CategorySelectors.selectEntity(state) as CategoryEntity;
    //   const selId = getCategoryId(result);

    //   expect(selId).toBe('PRODUCT-BBB');
    // });

    it('selectCategoryLoaded() should return the current "loaded" status', () => {
      const result = CategorySelectors.selectCategoryLoaded(state);

      expect(result).toBe(true);
    });

    it('selectCategoryError() should return the current "error" state', () => {
      const result = CategorySelectors.selectCategoryError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
