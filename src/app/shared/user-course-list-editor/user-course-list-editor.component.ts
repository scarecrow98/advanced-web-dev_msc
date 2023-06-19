import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course, Semester } from 'src/app/core/models/main';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddCourseFormComponent } from './components/add-course-form/add-course-form.component';


export type AddUserCoursePayload = {
  semesterId: number,

  courseId: number
}

export type DeleteUserCoursePayload = AddUserCoursePayload;


@Component({
  selector: 'app-user-course-list-editor',
  templateUrl: './user-course-list-editor.component.html',
  styleUrls: ['./user-course-list-editor.component.scss']
})
export class UserCourseListEditorComponent implements OnInit {

  @Input() semesters: Semester[] = [];

  @Input() courses: Course[] = [];

  @Input() userCourses: Course[] = [];

  @Output() onAddCourse = new EventEmitter<AddUserCoursePayload>();

  @Output() onDeleteCourse = new EventEmitter<DeleteUserCoursePayload>();

  @Output() onFilter = new EventEmitter<Semester|null>();

  filterSemester: Semester|null = null;

  constructor(
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  openAddCourseForm() {
    const modalRef = this.modalService.create<AddCourseFormComponent, any>({
      nzTitle: 'Assign new course',
      nzContent: AddCourseFormComponent,
      nzComponentParams: {
        semesters: this.semesters,
        courses: this.courses
      },
      nzOkText: 'Assign',
      nzCancelText: 'Cancel',
      nzFooter: null
    });

    modalRef.afterClose.subscribe((results: AddUserCoursePayload|undefined) => {
      if (results) {
        this.onAddCourse.emit(results);
      }
    });
  }

  onDeleteCourseEvent(course: Course) {
    this.onDeleteCourse.emit({ courseId: course.id, semesterId: this.filterSemester!.id });
  }

}
