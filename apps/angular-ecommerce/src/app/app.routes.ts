import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'category/:categoryName',
    loadComponent: () =>
      import('@os1n-workspace/product').then((m) => m.ProductComponent),
    data: { animation: 'Category Page' },
  },
];
