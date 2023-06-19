import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Semester } from "../../models/main";

export const SemesterActions = createActionGroup({
  source: 'Semesters',
  events: {
    'Load Semesters': emptyProps(),
    'Load Semesters Success': props<{ semesters: Semester[] }>(),
    'Load Semesters Failure': props<{ error: string }>(),
    'Filter Semesters': props<{ filterValue: string }>(),
    'Load Semester': props<{ id: number }>(),
    'Load Semester Success': props<{ semester: Semester|null }>(),
    'Load Semester Failure': props<{ error: string }>(),
    'Save Semester': props<{ semester: Semester }>()
  }
});
