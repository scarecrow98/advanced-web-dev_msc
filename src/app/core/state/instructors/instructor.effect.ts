import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { catchError, from, map, of, switchMap } from "rxjs";
import { InstructorService } from "src/app/instructors/services/instructor.service";
import { InstructorsActions } from "./instructor.actions";
import { selectCurrentInstructor } from "./instructor.selectors";

@Injectable()
export class InstructorEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private instructorService: InstructorService
  ) {

  }

  loadInstructors$ = createEffect(() => this.actions$.pipe(
    ofType(InstructorsActions.loadInstructors),
    switchMap(() => from(this.instructorService.getInstructors()).pipe(
      map(instructors => InstructorsActions.loadInstructorsSuccess({ instructors })),
      catchError((err: any) => of(InstructorsActions.loadInstructorsFailure({ error: err.message })))
    ))
  ));

  loadInstructor$ = createEffect(() => this.actions$.pipe(
    ofType(InstructorsActions.loadInstructor),
    switchMap(({ id }) => from(this.instructorService.getInstructorById(id)).pipe(
      map(instructor => InstructorsActions.loadInstructorSuccess({ instructor })),
      catchError((err: any) => of(InstructorsActions.loadInstructorFailure({ error: err.message })))
    ))
  ));

  saveInstructor$ = createEffect(() => this.actions$.pipe(
    ofType(InstructorsActions.saveInstructor),
    switchMap(({ instructor }) => {
      return (instructor.id < 0
        ? this.instructorService.createInstructor(instructor)
        : this.instructorService.saveInstructor(instructor)).pipe(
          map(_ => {
            this.instructorService.invalidateCache();
            return InstructorsActions.loadInstructors();
          })
        )
    })
  ));

  filterInstructorCourses$ = createEffect(() => this.actions$.pipe(
    ofType(InstructorsActions.filterCourses),
    concatLatestFrom(action => this.store.select(selectCurrentInstructor)),
    switchMap(([ action, instructor ]) => from(this.instructorService.getCoursesBySemester(instructor!.id, action.semesterId)).pipe(
      map(courses => InstructorsActions.filterCoursesSuccess({ courses })),
      catchError((err: any) => of(InstructorsActions.filterCoursesFailure({ error: err.message })))
    ))
  ));

  addCourse$ = createEffect(() => this.actions$.pipe(
    ofType(InstructorsActions.addCourse),
    concatLatestFrom(action => this.store.select(selectCurrentInstructor)),
    switchMap(([action, instructor]) => {
      return this.instructorService.addCourseForSemester(instructor!.id, action.semesterId, action.courseId).pipe(
        map((instructorCourse) => {
          return InstructorsActions.filterCourses({ semesterId: instructorCourse.semesterId })
        })
      )
    })
  ));

  deleteCourse$ = createEffect(() => this.actions$.pipe(
    ofType(InstructorsActions.deleteCourse),
    concatLatestFrom(action => this.store.select(selectCurrentInstructor)),
    switchMap(([action, instructor]) => {
      return this.instructorService.deleteCourseForSemester(instructor!.id, action.semesterId, action.courseId).pipe(
        map((instructorCourse: any) => {
          return InstructorsActions.filterCourses({ semesterId: instructorCourse.semesterId })
        })
      )
    })
  ));
}