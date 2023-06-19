import { createReducer, on } from "@ngrx/store";
import { Course } from "../../models/main";
import { CoursesActions } from "./course.actions";

export interface CourseState {
  courses: Course[],
  filterValue: string,
  currentCourse: Course|null,
  error: string|null,
  status: 'pending' | 'loading' | 'error' | 'success'
}

export const initialState: CourseState = {
  courses: [],
  filterValue: '',
  currentCourse: null,
  error: null,
  status: 'pending'
}

export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, (state) => ({ ...state, status: 'loading' })),
  on(CoursesActions.loadCoursesSuccess, (state, { courses }) => {
    return { ...state, courses, status: 'success' }
  }),
  on(CoursesActions.loadCoursesFailure, (state, { error }) => {
    return { ...state, error, status: 'error' }
  }),
  on(CoursesActions.filterCourses, (state, { filterValue }) => ({ ...state, filterValue })),
  on(CoursesActions.loadCourse, (state) => ({ ...state, status: 'loading' })),
  on(CoursesActions.loadCourseSuccess, (state, { course }) => {
    return { ...state, status: 'success', currentCourse: course }
  }),
  on(CoursesActions.loadCourseFailure, (state, { error }) => {
    return { ...state, status: 'error', error };
  }),
  on(CoursesActions.saveCourse, (state) => ({ ...state }))
);