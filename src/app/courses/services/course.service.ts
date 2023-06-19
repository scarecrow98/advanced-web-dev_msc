import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Course } from 'src/app/core/models/main';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _courseCache$: Observable<Course[]> | null = null;

  constructor(private http: HttpClient) { }

  getCourses() {
    if (!this._courseCache$) {
      console.log('Get courses');
      this._courseCache$ = this.http.get<Course[]>('/api/courses').pipe(
        shareReplay()
      );
    }

    return this._courseCache$;
  }

  invalidateCache() {
    this._courseCache$ = null;
  }

  getCourseById(id: number) {
    console.log('Get course by id', id);
    return this.http.get<Course|null>(`/api/courses/${id}`);
  }

  saveCourse(course: Course) {
    console.log('Save course');
    return this.http.put(`/api/courses/${course.id}`, course);
  }
  
  createCourse(course: Course) {
    console.log('Create course');
    const {id, ...rest} = course;

    return this.http.post('/api/courses', rest);
  }
}
