import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { Course, Department } from 'src/app/core/models/main';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { selectCurrentCourse } from 'src/app/core/state/courses/course.selectors';
import { CoursesActions } from 'src/app/core/state/courses/course.actions';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit, OnDestroy {

  course$ = this.store.select(selectCurrentCourse);

  private _onDestroy$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: NzMessageService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['courseId']),
      takeUntil(this._onDestroy$)
    ).subscribe(courseId => {
      if (courseId === 'new') {
        this.store.dispatch(CoursesActions.loadCourseSuccess({
          course: {
            id: -1,
            name: '',
            code: '',
            creditScore: 0,
            department: Department.UNKOWN
          }
        }));
      } else {
        this.store.dispatch(CoursesActions.loadCourse({ id: parseInt(courseId) }));
      }
    });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(true);
    this._onDestroy$.complete();
  }

  saveCourse(payload: Course) {
    this.store.dispatch(CoursesActions.saveCourse({ course: payload }));
    // this.store.dispatch(CoursesActions.loadCourseSuccess({ course: null }));

    this.messageService.success('Course saved');
    this.router.navigate(['/dashboard/courses']);
  }

  cancelEdit() {
    this.router.navigate(['/dashboard/courses']);
  }

}
