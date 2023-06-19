import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { CourseState } from "./course.reducer";

export const selectCourses = (state: AppState) => state.courses;

export const selectAllCourses = createSelector(
  selectCourses,
  (state: CourseState) => state.courses
);

const selectFilterValue = createSelector(
  selectCourses,
  (state: CourseState) => state.filterValue
);

export const selectFilteredCourses = createSelector(
  selectAllCourses,
  selectFilterValue,
  (courses, filterValue) => courses.filter(
    course => course.code.toLocaleLowerCase().includes(filterValue)
              || course.name.toLocaleLowerCase().includes(filterValue)
  )
);

export const selectCurrentCourse = createSelector(
  selectCourses,
  (state: CourseState) => state.currentCourse
);