import { CourseState } from "./courses/course.reducer";
import { InstructorState } from "./instructors/instructor.reducer";
import { SemesterState } from "./semesters/semester.reducer";
import { StudentState } from "./students/student.reducer.";

export interface AppState {
  courses: CourseState,
  instructors: InstructorState,
  semesters: SemesterState,
  students: StudentState
}