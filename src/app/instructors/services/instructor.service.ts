import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { Course, Instructor, InstructorCourseBySemester, UserRole } from 'src/app/core/models/main';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private _instructorCache$: Observable<Instructor[]> | null = null;

  constructor(
    private http: HttpClient
  ) { }

  getInstructors() {
    if (!this._instructorCache$) {
      console.log('Get instructors');

      this._instructorCache$ = this.http.get<Instructor[]>('/api/users').pipe(
        map(users => users.filter(user => user.roles.includes(UserRole.INSTRUCTOR))),
        shareReplay()
      );
    }

    return this._instructorCache$;
  }

  invalidateCache() {
    this._instructorCache$ = null;
  }

  getInstructorById(id: number) {
    return this.http.get<Instructor|null>(`/api/users/${id}`);
  }

  saveInstructor(instructor: Instructor) {
    console.log('Save instructor');
    return this.http.put(`/api/users/${instructor.id}`, instructor);
  }
  
  createInstructor(instructor: Instructor) {
    console.log('Create instructor');
    const {id, ...rest} = instructor;

    return this.http.post('/api/users', rest);
  }

  getCoursesBySemester(instructorId: number, semesterId: number) {
    return this.http.get<Course[]>('/api/instructorCoursesBySemester', {
      params: {
        instructorId,
        semesterId
      }
    });
  }

  addCourseForSemester(instructorId: number, semesterId: number, courseId: number) {
    return this.http.post<InstructorCourseBySemester>('/api/instructorCoursesBySemester', {
      instructorId,
      courseId,
      semesterId
    }).pipe(
      tap(console.log)
    );
  }

  deleteCourseForSemester(instructorId: number, semesterId: number, courseId: number) {
    return this.http.post(`/api/instructorCoursesBySemester/delete`, {
      instructorId,
      courseId,
      semesterId
    }).pipe(
      tap(console.log)
    );
  }
}
