import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoProductsFoundComponent } from './no-products-found.component';

describe('NoProductsFoundComponent', () => {
  let component: NoProductsFoundComponent;
  let fixture: ComponentFixture<NoProductsFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoProductsFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoProductsFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
