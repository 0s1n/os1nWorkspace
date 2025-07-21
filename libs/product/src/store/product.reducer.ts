import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ProductActions from './product.actions';
import { ProductEntity } from './product.models';

export const PRODUCT_FEATURE_KEY = 'product';

export interface ProductState extends EntityState<ProductEntity> {
  selectedId?: string | number; // which Product record has been selected
  loaded: boolean; // has the Product list been loaded
  error?: string | null; // last known error (if any)
  productCount: number;
}

export interface ProductPartialState {
  readonly [PRODUCT_FEATURE_KEY]: ProductState;
}

export const productAdapter: EntityAdapter<ProductEntity> =
  createEntityAdapter<ProductEntity>();

export const initialProductState: ProductState = productAdapter.getInitialState(
  {
    productCount: 0,
    loaded: false,
  }
);

const reducer = createReducer(
  initialProductState,
  on(ProductActions.productActions.loadProduct, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProductActions.productActions.productSuccess, (state, { product }) =>
    productAdapter.setAll(product, { ...state, loaded: true })
  ),
  on(ProductActions.productActions.productFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function productReducer(
  state: ProductState | undefined,
  action: Action
) {
  return reducer(state, action);
}
