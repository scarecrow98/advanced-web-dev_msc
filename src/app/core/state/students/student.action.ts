import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Course, Student } from "../../models/main";

export const StudentsActions = createActionGroup({
  source: 'Students',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ students: Student[] }>(),
    'Load Students Failure': props<{ error: string }>(),
    'Filter Students': props<{ filterValue: string }>(),
    'Load Student': props<{ id: number }>(),
    'Load Student Success': props<{ student: Student|null }>(),
    'Load Student Failure': props<{ error: string }>(),
    'Save Student': props<{ student: Student  }>(),

    'Filter Courses': props<{ semesterId: number }>(),
    'Filter Courses Success': props<{ courses: Course[] }>(),
    'Filter Courses Failure': props<{ error: string }>(),

    'Add Course': props<{ semesterId: number, courseId: number }>(),
    'Delete Course': props<{ semesterId: number, courseId: number }>()
  }
});
