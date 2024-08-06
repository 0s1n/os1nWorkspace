import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold } from 'jasmine-marbles';
import { CategoryEffects } from './category.effects';
import * as CategoryActions from './category.actions';
import { CategoryService } from '../lib/category.service';
import { Observable, of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('CategoryEffects', () => {
  let actions$ = new Observable<unknown>();
  let effects: CategoryEffects;
  let categoryService: jest.Mocked<CategoryService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryEffects,
        provideMockActions(() => actions$),
        provideHttpClient(),
        {
          provide: CategoryService,
          useValue: {
            getCategories: jest.fn(),
          },
        },
      ],
    });

    effects = TestBed.inject(CategoryEffects);
    categoryService = TestBed.inject(
      CategoryService
    ) as jest.Mocked<CategoryService>;
  });

  it('should return loadCategorySuccess when getCategories is successful', () => {
    const categories = ['Category A', 'Category B', 'Category C'];
    const action = CategoryActions.initCategory();

    categoryService.getCategories.mockReturnValue(of(categories));

    actions$ = of(action);

    effects.init$.subscribe((result) => {
      expect(result).toEqual(
        CategoryActions.loadCategorySuccess({ categories })
      );
    });

    expect(categoryService.getCategories).toHaveBeenCalled();
  });

  it('should return loadCategoryFailure when getCategories is unsuccessful', () => {
    const error = new Error('Failed to get categories');
    const action = CategoryActions.initCategory();

    categoryService.getCategories.mockReturnValue(cold('error', { error }));

    actions$ = of(action);

    effects.init$.subscribe((result) => {
      expect(result).toEqual(CategoryActions.loadCategoryFailure({ error }));
    });

    expect(categoryService.getCategories).toHaveBeenCalled();
  });
});
