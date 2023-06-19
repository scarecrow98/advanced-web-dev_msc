import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Course } from "../../models/main";

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ courses: Course[] }>(),
    'Load Courses Failure': props<{ error: string }>(),
    'Filter Courses': props<{ filterValue: string }>(),
    'Load Course': props<{ id: number }>(),
    'Load Course Success': props<{ course: Course|null }>(),
    'Load Course Failure': props<{ error: string }>(),
    'Save Course': props<{ course: Course }>()
  }
});
