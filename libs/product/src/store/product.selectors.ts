import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PRODUCT_FEATURE_KEY,
  ProductState,
  productAdapter,
} from './product.reducer';

// Lookup the 'Product' feature state managed by NgRx
export const selectProductState =
  createFeatureSelector<ProductState>(PRODUCT_FEATURE_KEY);

const { selectAll, selectEntities } = productAdapter.getSelectors();

export const selectProductLoaded = createSelector(
  selectProductState,
  (state: ProductState) => state.loaded
);

export const selectProductError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

export const selectAllProduct = createSelector(
  selectProductState,
  (state: ProductState) => selectAll(state)
);

export const selectProductEntities = createSelector(
  selectProductState,
  (state: ProductState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectProductState,
  (state: ProductState) => state.selectedId
);

export const selectEntity = createSelector(
  selectProductEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
