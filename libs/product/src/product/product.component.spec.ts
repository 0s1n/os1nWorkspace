import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { productActions } from '../store/product.actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductEntity } from '../store/product.models';
import { selectAllProduct } from '../store/product.selectors';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let store: MockStore;

  const mockProducts: ProductEntity[] = [
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'Description 1',
      category: 'electronics',
      image: 'image1.jpg'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductComponent,
        MatCardModule,
        MatButtonModule
      ],
      providers: [
        provideMockStore({
          initialState: {
            product: {
              ids: [],
              entities: {},
              selectedId: null,
              loaded: false,
              error: null
            }
          }
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    // Configurar el selector por defecto
    store.overrideSelector(selectAllProduct, []);
  });

  afterEach(() => {
    store.resetSelectors();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProduct action when categoryName input changes and is not empty', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const categoryName = 'electronics';

    component.categoryName = categoryName;
    component.ngOnChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(
      productActions.loadProduct({ categoryName })
    );
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  it('should not dispatch loadProduct action when categoryName is empty', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.categoryName = '';
    component.ngOnChanges();

    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should select products from store', fakeAsync(() => {
    // Configurar el mock del selector
    store.overrideSelector(selectAllProduct, mockProducts);
    store.refreshState();

    let actualProducts: ProductEntity[] | undefined;
    component.product$.subscribe(products => {
      actualProducts = products;
    });

    tick(); // Avanzar el tiempo virtual

    expect(actualProducts).toEqual(mockProducts);
  }));

  it('should update products when store changes', fakeAsync(() => {
    // Estado inicial
    store.overrideSelector(selectAllProduct, []);
    store.refreshState();

    let actualProducts: ProductEntity[] | undefined;
    component.product$.subscribe(products => {
      actualProducts = products;
    });

    tick(); // Avanzar el tiempo virtual
    expect(actualProducts).toEqual([]);

    // Actualizar el store
    store.overrideSelector(selectAllProduct, mockProducts);
    store.refreshState();

    tick(); // Avanzar el tiempo virtual
    expect(actualProducts).toEqual(mockProducts);
  }));
});
