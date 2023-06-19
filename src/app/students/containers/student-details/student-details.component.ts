import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map } from 'rxjs';
import { Department, UserRole, Semester, Major, Student } from 'src/app/core/models/main';
import { AppState } from 'src/app/core/state/app.state';
import { CoursesActions } from 'src/app/core/state/courses/course.actions';
import { selectAllCourses } from 'src/app/core/state/courses/course.selectors';
import { SemesterActions } from 'src/app/core/state/semesters/semester.actions';
import { selectAllSemesters } from 'src/app/core/state/semesters/semester.selectors';
import { StudentsActions } from 'src/app/core/state/students/student.action';
import { selectCurrentStudent, selectCurrentStudentCourses } from 'src/app/core/state/students/student.selectors';
import { AddUserCoursePayload, DeleteUserCoursePayload } from 'src/app/shared/user-course-list-editor/user-course-list-editor.component';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  student$ = this.store.select(selectCurrentStudent);

  studentCourses$ = this.store.select(selectCurrentStudentCourses);

  semesters$ = this.store.select(selectAllSemesters);

  courses$ = this.store.select(selectAllCourses);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: NzMessageService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['studentId'])
    ).subscribe(studentId => {
      if (studentId === 'new') {
        this.store.dispatch(StudentsActions.loadStudentSuccess({
          student: {
            id: -1,
            name: '',
            email: '',
            neptunCode: '',
            birthDate: '',
            department: Department.UNKOWN,
            major: Major.COMPUTER_SCIENCE_BSC,
            password: '',
            roles: [
              UserRole.STUDENT
            ]
          }
        }));
      } else {
        this.store.dispatch(StudentsActions.loadStudent({ id: parseInt(studentId) }));
      }
    });

    // load semesters and courses (it wont load multiple times unnecessarily, because data is cached in the service layer)
    this.store.dispatch(SemesterActions.loadSemesters());
    this.store.dispatch(CoursesActions.loadCourses());
  }

  saveStudent(payload: Student) {
    this.store.dispatch(StudentsActions.saveStudent({ student: payload }));

    this.messageService.success('Student saved');
    this.router.navigate(['/dashboard/students']);
  }

  cancelEdit() {
    this.router.navigate(['/dashboard/students']);
  }

  addStudentCourse(payload: AddUserCoursePayload) {
    this.store.dispatch(StudentsActions.addCourse({ semesterId: payload.semesterId, courseId: payload.courseId }));
  }
  
  deleteStudentCourse(payload: DeleteUserCoursePayload) {
    this.store.dispatch(StudentsActions.deleteCourse({ semesterId: payload.semesterId, courseId: payload.courseId }));
    console.log(payload);
  }

  filterStudentCourses(filterSemester: Semester|null) {
    if (filterSemester) {
      this.store.dispatch(StudentsActions.filterCourses({ semesterId: filterSemester.id }));
    }
  }

}
