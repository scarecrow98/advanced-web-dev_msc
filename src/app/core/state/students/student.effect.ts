import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { catchError, from, map, of, switchMap, tap } from "rxjs";
import { StudentService } from "src/app/students/services/student.service";
import { StudentsActions } from "./student.action";
import { selectCurrentStudent } from "./student.selectors";

@Injectable()
export class StudentEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private studentService: StudentService
  ) {

  }

  loadStudents$ = createEffect(() => this.actions$.pipe(
    ofType(StudentsActions.loadStudents),
    switchMap(() => from(this.studentService.getStudents()).pipe(
      map(students => StudentsActions.loadStudentsSuccess({ students })),
      catchError((err: any) => of(StudentsActions.loadStudentsFailure({ error: err.message })))
    ))
  ));

  loadStudent$ = createEffect(() => this.actions$.pipe(
    ofType(StudentsActions.loadStudent),
    switchMap(({ id }) => from(this.studentService.getStudentById(id)).pipe(
      map(student => StudentsActions.loadStudentSuccess({ student })),
      catchError((err: any) => of(StudentsActions.loadStudentFailure({ error: err.message })))
    ))
  ));

  saveStudent$ = createEffect(() => this.actions$.pipe(
    ofType(StudentsActions.saveStudent),
    switchMap(({ student }) => {
      return (student.id < 0
        ? this.studentService.createStudent(student)
        : this.studentService.saveStudent(student)).pipe(
          map(_ => {
            this.studentService.invalidateCache();
            return StudentsActions.loadStudents();
          })
        )
    })
  ));

  filterStudentCourses$ = createEffect(() => this.actions$.pipe(
    ofType(StudentsActions.filterCourses),
    concatLatestFrom(action => this.store.select(selectCurrentStudent)),
    switchMap(([ action, student ]) => from(this.studentService.getCoursesBySemester(student!.id, action.semesterId)).pipe(
      map(courses => StudentsActions.filterCoursesSuccess({ courses })),
      catchError((err: any) => of(StudentsActions.filterCoursesFailure({ error: err.message })))
    ))
  ));

  addCourse$ = createEffect(() => this.actions$.pipe(
    ofType(StudentsActions.addCourse),
    concatLatestFrom(action => this.store.select(selectCurrentStudent)),
    switchMap(([action, student]) => {
      return this.studentService.addCourseForSemester(student!.id, action.semesterId, action.courseId).pipe(
        map((instructorCourse) => {
          return StudentsActions.filterCourses({ semesterId: instructorCourse.semesterId })
        })
      )
    })
  ));

  deleteCourse$ = createEffect(() => this.actions$.pipe(
    ofType(StudentsActions.deleteCourse),
    concatLatestFrom(action => this.store.select(selectCurrentStudent)),
    switchMap(([action, student]) => {
      return this.studentService.deleteCourseForSemester(student!.id, action.semesterId, action.courseId).pipe(
        map((instructorCourse: any) => {
          return StudentsActions.filterCourses({ semesterId: instructorCourse.semesterId })
        })
      )
    })
  ));
}