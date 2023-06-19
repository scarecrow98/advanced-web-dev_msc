import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from 'src/app/core/models/main';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, share } from 'rxjs';
import { Store } from '@ngrx/store';
import { CoursesActions } from 'src/app/core/state/courses/course.actions';
import { selectAllCourses, selectFilteredCourses } from 'src/app/core/state/courses/course.selectors';
import { AppState } from 'src/app/core/state/app.state';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  isEditMode: boolean = false;

  courses$ = this.store.select(selectAllCourses)

  filteredCourses$ = this.store.select(selectFilteredCourses);

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses());
  }

  filterCourses(filterValue: string) {
    this.store.dispatch(CoursesActions.filterCourses({ filterValue }));
  }

  editCourse(course: Course) {
    this.router.navigate([ 'dashboard/courses', course.id ]);
  }
  
  newCourse() {
    this.router.navigate([ 'dashboard/courses/new' ]);
  }

  onEditBegin() {
    this.isEditMode = true;
  }
  
  onEditEnd() {
    this.isEditMode = false;
  }
}
