import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  CATEGORY_FEATURE_KEY,
  CategoryEffects,
  categoryReducer,
} from '@os1n-workspace/category';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
// import * as fromCategory2 from './+state/category2.reducer';
// import { Category2Effects } from './+state/category2.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(CategoryEffects),
    provideState(CATEGORY_FEATURE_KEY, categoryReducer),
    provideHttpClient(),
    provideStore(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
