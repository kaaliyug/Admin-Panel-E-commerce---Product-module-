import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsFormComponent } from './admin-products-form.component';

describe('AdminProductsFormComponent', () => {
  let component: AdminProductsFormComponent;
  let fixture: ComponentFixture<AdminProductsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
