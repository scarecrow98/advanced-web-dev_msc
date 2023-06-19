import { createReducer, on } from "@ngrx/store";
import { Course, Student } from "../../models/main";
import { StudentsActions } from "./student.action";

export interface StudentState {
  students: Student[],
  filterValue: string,
  currentStudent: Student|null,
  error: string|null,
  status: 'pending' | 'loading' | 'error' | 'success',

  currentFilterSemesterId: number|null,
  currentStudentCourses: Course[]
}

export const initialState: StudentState = {
  students: [],
  filterValue: '',
  currentStudent: null,
  error: null,
  status: 'pending',

  currentFilterSemesterId: null,
  currentStudentCourses: []
}

export const studentReducer = createReducer(
  initialState,
  on(StudentsActions.loadStudents, (state) => ({ ...state, status: 'loading' })),
  on(StudentsActions.loadStudentsSuccess, (state, { students }) => {
    return { ...state, students, status: 'success' }
  }),
  on(StudentsActions.loadStudentsFailure, (state, { error }) => {
    return { ...state, error, status: 'error' }
  }),
  on(StudentsActions.filterStudents, (state, { filterValue }) => ({ ...state, filterValue })),
  on(StudentsActions.loadStudent, (state) => ({ ...state, status: 'loading' })),
  on(StudentsActions.loadStudentSuccess, (state, { student }) => {
    return { ...state, status: 'success', currentStudent: student }
  }),
  on(StudentsActions.loadStudentFailure, (state, { error }) => {
    return { ...state, status: 'error', error };
  }),
  on(StudentsActions.saveStudent, (state) => ({ ...state })),

  on(StudentsActions.filterCourses, (state, { semesterId }) => ({ ...state, currentFilterSemesterId: semesterId })),
  on(StudentsActions.filterCoursesSuccess, (state, { courses }) => ({  ...state, currentStudentCourses: courses })),
  on(StudentsActions.filterCoursesFailure, (state, { error }) => ({  ...state, error })),

  on(StudentsActions.addCourse, (state) => ({ ...state })),
  on(StudentsActions.deleteCourse, (state) => ({ ...state })),
);