import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { ProductEntity } from '../store/product.models';
import { of, throwError } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let httpClient: jest.Mocked<HttpClient>;

  const mockProducts: ProductEntity[] = [
    {
      id: 1,
      title: 'Test Product',
      price: 99.99,
      description: 'Test Description',
      category: 'electronics',
      image: 'test.jpg'
    }
  ];

  beforeEach(() => {
    // Crear un mock del HttpClient
    const httpClientMock = {
      get: jest.fn()
    } as Partial<HttpClient>;

    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: HttpClient, useValue: httpClientMock }
      ]
    });

    service = TestBed.inject(ProductService);
    httpClient = TestBed.inject(HttpClient) as jest.Mocked<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProductsByCategory', () => {
    it('should call correct URL with category name', () => {
      const category = 'electronics';
      httpClient.get.mockReturnValue(of(mockProducts));

      service.getProductsByCategory(category).subscribe();

      expect(httpClient.get).toHaveBeenCalledWith(
        `https://fakestoreapi.com/products/category/${category}`
      );
      expect(httpClient.get).toHaveBeenCalledTimes(1);
    });

    it('should return products for a category', (done) => {
      const category = 'electronics';
      httpClient.get.mockReturnValue(of(mockProducts));

      service.getProductsByCategory(category).subscribe({
        next: (products) => {
          expect(products).toEqual(mockProducts);
          expect(products.length).toBe(1);
          expect(products[0].category).toBe('electronics');
          done();
        },
        error: done
      });
    });

    it('should return empty array when no products found', (done) => {
      const category = 'non-existent';
      httpClient.get.mockReturnValue(of([]));

      service.getProductsByCategory(category).subscribe({
        next: (products) => {
          expect(products).toEqual([]);
          expect(products.length).toBe(0);
          done();
        },
        error: done
      });
    });

    it('should propagate error when HTTP request fails', (done) => {
      const category = 'electronics';
      const errorMessage = 'Network error';
      httpClient.get.mockReturnValue(throwError(() => new Error(errorMessage)));

      service.getProductsByCategory(category).subscribe({
        next: () => {
          done.fail('Should have failed with error');
        },
        error: (error) => {
          expect(error.message).toBe(errorMessage);
          done();
        }
      });
    });

    it('should handle different category values', () => {
      const categories = ['electronics', 'clothing', 'jewelery'];
      
      categories.forEach(category => {
        httpClient.get.mockReturnValue(of([]));
        service.getProductsByCategory(category).subscribe();
        
        expect(httpClient.get).toHaveBeenCalledWith(
          `https://fakestoreapi.com/products/category/${category}`
        );
      });

      expect(httpClient.get).toHaveBeenCalledTimes(categories.length);
    });
  });
});
