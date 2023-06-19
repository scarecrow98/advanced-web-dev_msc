import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { catchError, from, map, of, switchMap, tap } from "rxjs";
import { SemesterService } from "src/app/semesters/services/semester.service";
import { SemesterActions } from "./semester.actions";

@Injectable()
export class SemesterEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private semesterService: SemesterService
  ) {

  }

  loadSemesters$ = createEffect(() => this.actions$.pipe(
    ofType(SemesterActions.loadSemesters),
    switchMap(() => from(this.semesterService.getSemesters()).pipe(
      map(semesters => SemesterActions.loadSemestersSuccess({ semesters })),
      catchError((err: any) => of(SemesterActions.loadSemestersFailure({ error: err.message })))
    ))
  ));

  loadSemester$ = createEffect(() => this.actions$.pipe(
    ofType(SemesterActions.loadSemester),
    switchMap(({ id }) => from(this.semesterService.getSemesterById(id)).pipe(
      map(semester => SemesterActions.loadSemesterSuccess({ semester })),
      catchError((err: any) => of(SemesterActions.loadSemesterFailure({ error: err.message })))
    ))
  ));

  saveSemester$ = createEffect(() => this.actions$.pipe(
    ofType(SemesterActions.saveSemester),
    switchMap(({ semester }) => {
      return (semester.id < 0
        ? this.semesterService.createSemester(semester)
        : this.semesterService.saveSemester(semester)).pipe(
          map(_ => {
            this.semesterService.invalidateCache();
            return SemesterActions.loadSemesters();
          })
        )
    })
  ));
}