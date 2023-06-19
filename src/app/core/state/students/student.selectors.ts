import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { StudentState } from "./student.reducer.";

export const selectStudents = (state: AppState) => state.students;

export const selectAllStudents = createSelector(
  selectStudents,
  (state: StudentState) => state.students
);

const selectFilterValue = createSelector(
  selectStudents,
  (state: StudentState) => state.filterValue
);

export const selectFilteredStudents = createSelector(
  selectAllStudents,
  selectFilterValue,
  (instructors, filterValue) => instructors.filter(
    instructor => instructor.neptunCode.toLocaleLowerCase().includes(filterValue)
              || instructor.name.toLocaleLowerCase().includes(filterValue)
              || instructor.email.toLocaleLowerCase().includes(filterValue)
              || instructor.major.toLocaleLowerCase().includes(filterValue)
              || instructor.department.toLocaleLowerCase().includes(filterValue)
  )
);

export const selectCurrentStudent = createSelector(
  selectStudents,
  (state: StudentState) => state.currentStudent
);


export const selectCurrentStudentCourses = createSelector(
  selectStudents,
  (state: StudentState) => state.currentStudentCourses
);