import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseListEditorComponent } from './user-course-list-editor.component';

describe('UserCourseListEditorComponent', () => {
  let component: UserCourseListEditorComponent;
  let fixture: ComponentFixture<UserCourseListEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCourseListEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCourseListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
