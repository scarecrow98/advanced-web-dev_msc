import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Semester } from 'src/app/core/models/main';
import { AppState } from 'src/app/core/state/app.state';
import { SemesterActions } from 'src/app/core/state/semesters/semester.actions';
import { selectAllSemesters, selectFilteredSemesters } from 'src/app/core/state/semesters/semester.selectors';

@Component({
  selector: 'app-semesters',
  templateUrl: './semesters.component.html',
  styleUrls: ['./semesters.component.scss']
})
export class SemestersComponent implements OnInit {

  isEditMode: boolean = false;

  semesters$ = this.store.select(selectAllSemesters);

  filteredSemesters$ = this.store.select(selectFilteredSemesters);

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(SemesterActions.loadSemesters());
  }

  filterSemesters(filterValue: string) {
    this.store.dispatch(SemesterActions.filterSemesters({ filterValue }));
  }

  editSemester(semester: Semester) {
    this.router.navigate([ '/dashboard/semesters', semester.id ]);
  }

  newSemester() {
    this.router.navigate([ '/dashboard/semesters/new' ]);
  }

  onEditBegin() {
    this.isEditMode = true;
  }

  onEditEnd() {
    this.isEditMode = false;
  }

}
