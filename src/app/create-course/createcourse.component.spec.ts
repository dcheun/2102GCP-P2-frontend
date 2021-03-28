import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmaterialComponent } from './create-course.component';

describe('AddmaterialComponent', () => {
  let component: AddmaterialComponent;
  let fixture: ComponentFixture<AddmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
