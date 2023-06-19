import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { SemesterState } from "./semester.reducer";

export const selectSemesters = (state: AppState) => state.semesters;

export const selectAllSemesters = createSelector(
  selectSemesters,
  (state: SemesterState) => state.semesters
);

const selectFilterValue = createSelector(
  selectSemesters,
  (state: SemesterState) => state.filterValue
);

export const selectFilteredSemesters = createSelector(
  selectAllSemesters,
  selectFilterValue,
  (semesters, filterValue) => semesters.filter(
    semester => semester.name.toLocaleLowerCase().includes(filterValue)
              || semester.startDate.toLocaleLowerCase().includes(filterValue)
              || semester.endDate.toLocaleLowerCase().includes(filterValue)

  )
);

export const selectCurrentSemester = createSelector(
  selectSemesters,
  (state: SemesterState) => state.currentSemester
);