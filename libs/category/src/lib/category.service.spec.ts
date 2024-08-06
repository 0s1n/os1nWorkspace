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
    expect(service).toMatchObject({
      getCategories: expect.any(Function),
    });
  });

  it('should return categories', (done) => {
    const expectedData = ['electronics'];
    service.getCategories().subscribe((categories) => {
      expect(categories).toEqual(expectedData);
      done();
    });

    const testRequest = httpTestingController.expectOne({
      method: 'GET',
      url: 'http://fakestoreapi.com/products/categories',
    });

    testRequest.flush(expectedData);
    httpTestingController.verify();
  });
});
