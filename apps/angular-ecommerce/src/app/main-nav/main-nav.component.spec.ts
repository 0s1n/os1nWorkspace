import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BehaviorSubject, of } from 'rxjs';
import { RouterLink } from '@angular/router';

import { MainNavComponent } from './main-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { selectAllCategory } from '@os1n-workspace/category';
import { By } from '@angular/platform-browser';

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;
  let store: MockStore;
  let breakpointObserver: { observe: jest.Mock };
  const isHandsetSubject = new BehaviorSubject<BreakpointState>({ matches: false, breakpoints: {} });

  const mockCategories = ['electronics', 'clothing', 'books'];

  beforeEach(async () => {
    // Mock BreakpointObserver
    breakpointObserver = {
      observe: jest.fn().mockReturnValue(isHandsetSubject.asObservable())
    };

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MainNavComponent
      ],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [
            { selector: selectAllCategory, value: mockCategories }
          ]
        }),
        { provide: BreakpointObserver, useValue: breakpointObserver }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use BreakpointObserver to check for handset mode', () => {
    expect(breakpointObserver.observe).toHaveBeenCalledWith(Breakpoints.Handset);
  });

  it('should show categories from store in the sidenav', fakeAsync(() => {
    store.refreshState();
    fixture.detectChanges();
    tick();

    const navItems = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(navItems.length).toBe(mockCategories.length);

    mockCategories.forEach((category, index) => {
      const navItem = navItems[index];
      const linkText = navItem.nativeElement.textContent.trim();
      expect(linkText).toBe(category);
      
      // Obtener los datos del RouterLink usando la directiva
      const routerLinkInstance = navItem.injector.get(RouterLink);
      expect(routerLinkInstance['commands']).toEqual(['/category', category]);
    });
  }));

  it('should toggle sidenav mode based on handset state', fakeAsync(() => {
    // Desktop mode
    isHandsetSubject.next({ matches: false, breakpoints: {} });
    fixture.detectChanges();
    tick();

    let sidenav = fixture.debugElement.query(By.css('mat-sidenav'));
    expect(sidenav.componentInstance.mode).toBe('side');
    expect(sidenav.componentInstance.opened).toBe(true);

    // Mobile mode
    isHandsetSubject.next({ matches: true, breakpoints: {} });
    fixture.detectChanges();
    tick();

    sidenav = fixture.debugElement.query(By.css('mat-sidenav'));
    expect(sidenav.componentInstance.mode).toBe('over');
    expect(sidenav.componentInstance.opened).toBe(false);
  }));

  it('should show menu button only in handset mode', fakeAsync(() => {
    // Desktop mode
    isHandsetSubject.next({ matches: false, breakpoints: {} });
    store.refreshState();
    fixture.detectChanges();
    tick();

    let menuButton = fixture.debugElement.query(By.css('button[aria-label="Toggle sidenav"]'));
    expect(menuButton).toBeNull();

    // Mobile mode
    isHandsetSubject.next({ matches: true, breakpoints: {} });
    fixture.detectChanges();
    tick();

    menuButton = fixture.debugElement.query(By.css('button[aria-label="Toggle sidenav"]'));
    expect(menuButton).toBeTruthy();
  }));

  it('should update category list when store changes', fakeAsync(() => {
    const updatedCategories = ['electronics', 'clothing', 'books', 'sports'];
    store.overrideSelector(selectAllCategory, updatedCategories);
    store.refreshState();
    
    fixture.detectChanges();
    tick();

    const navItems = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(navItems.length).toBe(updatedCategories.length);
    
    updatedCategories.forEach((category, index) => {
      const navItem = navItems[index];
      const linkText = navItem.nativeElement.textContent.trim();
      expect(linkText).toBe(category);
      
      // Obtener los datos del RouterLink usando la directiva
      const routerLinkInstance = navItem.injector.get(RouterLink);
      expect(routerLinkInstance['commands']).toEqual(['/category', category]);
    });
  }));
});
