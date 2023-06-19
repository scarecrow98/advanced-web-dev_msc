import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { InstructorState } from "./instructor.reducer";

export const selectInstructors = (state: AppState) => state.instructors;

export const selectAllInstructors = createSelector(
  selectInstructors,
  (state: InstructorState) => state.instructors
);

const selectFilterValue = createSelector(
  selectInstructors,
  (state: InstructorState) => state.filterValue
);

export const selectFilteredInstructors = createSelector(
  selectAllInstructors,
  selectFilterValue,
  (instructors, filterValue) => instructors.filter(
    instructor => instructor.neptunCode.toLocaleLowerCase().includes(filterValue)
              || instructor.name.toLocaleLowerCase().includes(filterValue)
              || instructor.email.toLocaleLowerCase().includes(filterValue)
              || instructor.status.toLocaleLowerCase().includes(filterValue)
              || instructor.department?.toLocaleLowerCase().includes(filterValue)
  )
);

export const selectCurrentInstructor = createSelector(
  selectInstructors,
  (state: InstructorState) => state.currentInstructor
);


export const selectCurrentInstructorCourses = createSelector(
  selectInstructors,
  (state: InstructorState) => state.currentInstructorCourses
);