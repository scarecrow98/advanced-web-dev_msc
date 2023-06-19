import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Course, Instructor, Semester } from "../../models/main";

export const InstructorsActions = createActionGroup({
  source: 'Instructors',
  events: {
    'Load Instructors': emptyProps(),
    'Load Instructors Success': props<{ instructors: Instructor[] }>(),
    'Load Instructors Failure': props<{ error: string }>(),
    'Filter Instructors': props<{ filterValue: string }>(),
    'Load Instructor': props<{ id: number }>(),
    'Load Instructor Success': props<{ instructor: Instructor|null }>(),
    'Load Instructor Failure': props<{ error: string }>(),
    'Save Instructor': props<{ instructor: Instructor }>(),

    'Filter Courses': props<{ semesterId: number }>(),
    'Filter Courses Success': props<{ courses: Course[] }>(),
    'Filter Courses Failure': props<{ error: string }>(),

    'Add Course': props<{ semesterId: number, courseId: number }>(),
    'Delete Course': props<{ semesterId: number, courseId: number }>()
  }
});
