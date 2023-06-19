import { createReducer, on } from "@ngrx/store";
import { Semester } from "../../models/main";
import { SemesterActions } from "./semester.actions";

export interface SemesterState {
  semesters: Semester[],
  filterValue: string,
  currentSemester: Semester|null,
  error: string|null,
  status: 'pending' | 'loading' | 'error' | 'success'
}

export const initialState: SemesterState = {
  semesters: [],
  filterValue: '',
  currentSemester: null,
  error: null,
  status: 'pending'
}

export const semesterReducer = createReducer(
  initialState,
  on(SemesterActions.loadSemesters, (state) => ({ ...state, status: 'loading' })),
  on(SemesterActions.loadSemestersSuccess, (state, { semesters }) => {
    return { ...state, semesters, status: 'success' }
  }),
  on(SemesterActions.loadSemestersFailure, (state, { error }) => {
    return { ...state, error, status: 'error' }
  }),
  on(SemesterActions.filterSemesters, (state, { filterValue }) => ({ ...state, filterValue })),
  on(SemesterActions.loadSemester, (state) => ({ ...state, status: 'loading' })),
  on(SemesterActions.loadSemesterSuccess, (state, { semester }) => {
    return { ...state, status: 'success', currentSemester: semester }
  }),
  on(SemesterActions.loadSemesterFailure, (state, { error }) => {
    return { ...state, status: 'error', error };
  }),
  on(SemesterActions.saveSemester, (state) => ({ ...state }))
);