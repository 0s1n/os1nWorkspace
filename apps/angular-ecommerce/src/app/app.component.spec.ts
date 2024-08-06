import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { StoreModule } from '@ngrx/store';
import { categoryReducer } from '@os1n-workspace/category';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          category: categoryReducer,
        }),
        AppComponent,
        NoopAnimationsModule,
        MainNavComponent,
        RouterModule.forRoot([
          {
            path: '',
            component: MainNavComponent,
          },
        ]),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
