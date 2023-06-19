import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeaheadFilterComponent } from './typeahead-filter.component';

describe('TypeaheadFilterComponent', () => {
  let component: TypeaheadFilterComponent;
  let fixture: ComponentFixture<TypeaheadFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeaheadFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeaheadFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
