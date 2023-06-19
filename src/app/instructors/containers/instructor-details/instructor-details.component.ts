import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map } from 'rxjs';
import { Instructor, Semester } from 'src/app/core/models/main';
import { UserRole } from 'src/app/core/models/main';
import { InstructorStatus } from 'src/app/core/models/main';
import { Department } from 'src/app/core/models/main';
import { AppState } from 'src/app/core/state/app.state';
import { InstructorsActions } from 'src/app/core/state/instructors/instructor.actions';
import { selectCurrentInstructor, selectCurrentInstructorCourses } from 'src/app/core/state/instructors/instructor.selectors';
import { InstructorService } from '../../services/instructor.service';
import { selectAllSemesters } from 'src/app/core/state/semesters/semester.selectors';
import { SemesterActions } from 'src/app/core/state/semesters/semester.actions';
import { selectAllCourses } from 'src/app/core/state/courses/course.selectors';
import { CoursesActions } from 'src/app/core/state/courses/course.actions';
import { AddUserCoursePayload, DeleteUserCoursePayload } from 'src/app/shared/user-course-list-editor/user-course-list-editor.component';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.scss']
})
export class InstructorDetailsComponent implements OnInit {

  instructor$ = this.store.select(selectCurrentInstructor);

  instructorCourses$ = this.store.select(selectCurrentInstructorCourses);

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
      map(params => params['instructorId'])
    ).subscribe(instructorId => {
      if (instructorId === 'new') {
        this.store.dispatch(InstructorsActions.loadInstructorSuccess({
          instructor: {
            id: -1,
            name: '',
            email: '',
            neptunCode: '',
            birthDate: '',
            department: Department.UNKOWN,
            status: InstructorStatus.OTHER,
            password: '',
            roles: [
              UserRole.INSTRUCTOR
            ]
          }
        }));
      } else {
        this.store.dispatch(InstructorsActions.loadInstructor({ id: parseInt(instructorId) }));
      }
    });

    // load semesters and courses (it wont load multiple times unnecessarily, because data is cached in the service layer)
    this.store.dispatch(SemesterActions.loadSemesters());
    this.store.dispatch(CoursesActions.loadCourses());
  }

  saveInstructor(payload: Instructor) {
    this.store.dispatch(InstructorsActions.saveInstructor({ instructor: payload }));

    this.messageService.success('Instructor saved');
    this.router.navigate(['/dashboard/instructors']);
  }

  cancelEdit() {
    this.router.navigate(['/dashboard/instructors']);
  }

  addInstructorCourse(payload: AddUserCoursePayload) {
    this.store.dispatch(InstructorsActions.addCourse({ semesterId: payload.semesterId, courseId: payload.courseId }));
  }
  
  deleteInstructorCourse(payload: DeleteUserCoursePayload) {
    this.store.dispatch(InstructorsActions.deleteCourse({ semesterId: payload.semesterId, courseId: payload.courseId }));
    console.log(payload);
  }

  filterInstructorCourses(filterSemester: Semester|null) {
    if (filterSemester) {
      this.store.dispatch(InstructorsActions.filterCourses({ semesterId: filterSemester.id }));
    }
  }
}
