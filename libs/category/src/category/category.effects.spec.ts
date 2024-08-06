import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CategoryActions from './category.actions';
import { CategoryEffects } from './category.effects';

describe('CategoryEffects', () => {
  let actions: Observable<Action>;
  let effects: CategoryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CategoryEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CategoryEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CategoryActions.initCategory() });

      const expected = hot('-a-|', {
        a: CategoryActions.loadCategorySuccess({ categories: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
