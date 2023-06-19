import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { UserRole, Course, InstructorCourseBySemester, Student } from 'src/app/core/models/main';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _studentCache$: Observable<Student[]> | null = null;

  constructor(
    private http: HttpClient
  ) { }

  getStudents() {
    if (!this._studentCache$) {
      console.log('Get students');

      this._studentCache$ = this.http.get<Student[]>('/api/users').pipe(
        map(users => users.filter(user => user.roles.includes(UserRole.STUDENT))),
        shareReplay()
      );
    }

    return this._studentCache$;
  }

  invalidateCache() {
    this._studentCache$ = null;
  }

  getStudentById(id: number) {
    return this.http.get<Student|null>(`/api/users/${id}`);
  }

  saveStudent(student: Student) {
    console.log('Save student');
    return this.http.put(`/api/users/${student.id}`, student);
  }
  
  createStudent(student: Student) {
    console.log('Create student');
    const {id, ...rest} = student;

    return this.http.post('/api/users', rest);
  }

  getCoursesBySemester(studentId: number, semesterId: number) {
    return this.http.get<Course[]>('/api/studentCoursesBySemester', {
      params: {
        studentId,
        semesterId
      }
    });
  }

  addCourseForSemester(studentId: number, semesterId: number, courseId: number) {
    return this.http.post<InstructorCourseBySemester>('/api/studentCoursesBySemester', {
      studentId,
      courseId,
      semesterId
    }).pipe(
      tap(console.log)
    );
  }

  deleteCourseForSemester(studentId: number, semesterId: number, courseId: number) {
    return this.http.post(`/api/studentCoursesBySemester/delete`, {
      studentId,
      courseId,
      semesterId
    }).pipe(
      tap(console.log)
    );
  }
}
