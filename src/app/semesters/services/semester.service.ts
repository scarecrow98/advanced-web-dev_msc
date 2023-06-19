import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Semester } from 'src/app/core/models/main';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  private _semesterCache$: Observable<Semester[]>|null = null;

  constructor(private http: HttpClient) { }

  getSemesters() {
    if (!this._semesterCache$) {
      console.log('Get semesters');
      this._semesterCache$ = this.http.get<Semester[]>('/api/semesters').pipe(
        shareReplay()
      );
    }

    return this._semesterCache$;
  }

  invalidateCache() {
    this._semesterCache$ = null;
  }

  getSemesterById(id: number) {
    console.log('Get semester by id', id);
    return this.http.get<Semester|null>(`/api/semesters/${id}`);
  }

  saveSemester(semester: Semester) {
    console.log('Save semester');
    return this.http.put(`/api/semesters/${semester.id}`, semester);
  }
  
  createSemester(semester: Semester) {
    console.log('Create semester');
    const {id, ...rest} = semester;

    return this.http.post('/api/semesters', rest);
  }
}
