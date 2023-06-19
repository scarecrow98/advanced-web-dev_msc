import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { CourseService } from "src/app/courses/services/course.service";
import { CoursesActions } from "./course.actions";
import { catchError, from, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class CourseEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private courseService: CourseService
  ) {

  }

  loadCourses$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.loadCourses),
    switchMap(() => from(this.courseService.getCourses()).pipe(
      map(courses => CoursesActions.loadCoursesSuccess({ courses })),
      catchError((err: any) => of(CoursesActions.loadCoursesFailure({ error: err.message })))
    ))
  ));

  loadCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.loadCourse),
    switchMap(({ id }) => from(this.courseService.getCourseById(id)).pipe(
      map(course => CoursesActions.loadCourseSuccess({ course })),
      catchError((err: any) => of(CoursesActions.loadCourseFailure({ error: err.message })))
    ))
  ));

  saveCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.saveCourse),
    switchMap(({ course }) => {
      return (course.id < 0
        ? this.courseService.createCourse(course)
        : this.courseService.saveCourse(course)).pipe(
          map(_ => {
            this.courseService.invalidateCache();
            return CoursesActions.loadCourses();
          })
        )
    })
  ));
}