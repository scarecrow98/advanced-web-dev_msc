import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Instructor } from 'src/app/core/models/main';
import { AppState } from 'src/app/core/state/app.state';
import { InstructorsActions } from 'src/app/core/state/instructors/instructor.actions';
import { selectAllInstructors, selectFilteredInstructors } from 'src/app/core/state/instructors/instructor.selectors';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent implements OnInit {

  instructors$ = this.store.select(selectAllInstructors);

  filteredInstructors$ = this.store.select(selectFilteredInstructors);

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(InstructorsActions.loadInstructors());
  }

  filterInstructors(filterValue: string) {
    this.store.dispatch(InstructorsActions.filterInstructors({ filterValue }));
  }

  newInstructor() {
    this.router.navigate([ '/dashboard/instructors/new' ]);
  }

  editInstructor(instructor: Instructor) {
    this.router.navigate([ '/dashboard/instructors/' + instructor.id ]);
  }
}
