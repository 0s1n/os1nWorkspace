import { ProductEntity } from './product.models';
import {
  productAdapter,
  ProductPartialState,
  initialProductState,
} from './product.reducer';
import * as ProductSelectors from './product.selectors';

describe('Product Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getProductId = (it: ProductEntity) => it.id;

  let state: ProductPartialState;

  beforeEach(() => {
    state = {
      product: productAdapter.setAll(
        [
          {
            category: 'Category A',
            id: 1,
            title: 'Product A',
            description: 'Product A description',
            price: 10,
            image: 'image',
          },
          {
            category: 'Category B',
            id: 2,
            title: 'Product B',
            description: 'Product B description',
            price: 20,
            image: 'image',
          }
        ],
        {
          ...initialProductState,
          selectedId: 2, // Cambiado para que coincida con un ID existente
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Product Selectors', () => {
    it('selectAllProduct() should return the list of Product', () => {
      const results = ProductSelectors.selectAllProduct(state);

      expect(results.length).toBe(2);
      expect(results[0].id).toBe(1);
      expect(results[1].id).toBe(2);
      expect(results[0].title).toBe('Product A');
      expect(results[1].title).toBe('Product B');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ProductSelectors.selectEntity(state) as ProductEntity;

      expect(result).toBeDefined();
      expect(result.id).toBe(2);
      expect(result.title).toBe('Product B');
    });

    it('selectProductLoaded() should return the current "loaded" status', () => {
      const result = ProductSelectors.selectProductLoaded(state);

      expect(result).toBe(true);
    });

    it('selectProductError() should return the current "error" state', () => {
      const result = ProductSelectors.selectProductError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
