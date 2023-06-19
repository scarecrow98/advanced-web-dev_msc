import { createReducer, on } from "@ngrx/store";
import { Course, Instructor, Semester } from "../../models/main";
import { InstructorsActions } from "./instructor.actions";

export interface InstructorState {
  instructors: Instructor[],
  filterValue: string,
  currentInstructor: Instructor|null,
  error: string|null,
  status: 'pending' | 'loading' | 'error' | 'success',

  currentFilterSemesterId: number|null,
  currentInstructorCourses: Course[]
}

export const initialState: InstructorState = {
  instructors: [],
  filterValue: '',
  currentInstructor: null,
  error: null,
  status: 'pending',

  currentFilterSemesterId: null,
  currentInstructorCourses: []
}

export const instructorReducer = createReducer(
  initialState,
  on(InstructorsActions.loadInstructors, (state) => ({ ...state, status: 'loading' })),
  on(InstructorsActions.loadInstructorsSuccess, (state, { instructors }) => {
    return { ...state, instructors, status: 'success' }
  }),
  on(InstructorsActions.loadInstructorsFailure, (state, { error }) => {
    return { ...state, error, status: 'error' }
  }),
  on(InstructorsActions.filterInstructors, (state, { filterValue }) => ({ ...state, filterValue })),
  on(InstructorsActions.loadInstructor, (state) => ({ ...state, status: 'loading' })),
  on(InstructorsActions.loadInstructorSuccess, (state, { instructor }) => {
    return { ...state, status: 'success', currentInstructor: instructor }
  }),
  on(InstructorsActions.loadInstructorFailure, (state, { error }) => {
    return { ...state, status: 'error', error };
  }),
  on(InstructorsActions.saveInstructor, (state) => ({ ...state })),

  on(InstructorsActions.filterCourses, (state, { semesterId }) => ({ ...state, currentFilterSemesterId: semesterId })),
  on(InstructorsActions.filterCoursesSuccess, (state, { courses }) => ({  ...state, currentInstructorCourses: courses })),
  on(InstructorsActions.filterCoursesFailure, (state, { error }) => ({  ...state, error })),

  on(InstructorsActions.addCourse, (state) => ({ ...state })),
  on(InstructorsActions.deleteCourse, (state) => ({ ...state })),
);