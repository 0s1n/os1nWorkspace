import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('CategoryService', () => {
  let httpTestingController: HttpTestingController;
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(CategoryService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.getCategories).toBeDefined();
  });

  it('should make GET request to correct URL', () => {
    service.getCategories().subscribe();

    const testRequest = httpTestingController.expectOne('https://fakestoreapi.com/products/categories');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush([]);
  });

  it('should return categories successfully', () => {
    const expectedData = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

    service.getCategories().subscribe({
      next: (categories) => {
        expect(categories).toEqual(expectedData);
        expect(categories.length).toBe(4);
      }
    });

    const testRequest = httpTestingController.expectOne('https://fakestoreapi.com/products/categories');
    testRequest.flush(expectedData);
  });

  it('should handle HTTP error', () => {
    const errorMessage = 'Error fetching categories';

    service.getCategories().subscribe({
      next: () => fail('Should have failed with 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    });

    const testRequest = httpTestingController.expectOne('https://fakestoreapi.com/products/categories');
    testRequest.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
