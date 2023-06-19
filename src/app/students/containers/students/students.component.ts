import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Student } from 'src/app/core/models/main';
import { AppState } from 'src/app/core/state/app.state';
import { StudentsActions } from 'src/app/core/state/students/student.action';
import { selectAllStudents, selectFilteredStudents } from 'src/app/core/state/students/student.selectors';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students$ = this.store.select(selectAllStudents);

  filteredStudents$ = this.store.select(selectFilteredStudents);

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(StudentsActions.loadStudents());
  }

  filterStudents(filterValue: string) {
    this.store.dispatch(StudentsActions.filterStudents({ filterValue }));
  }

  newStudent() {
    this.router.navigate([ '/dashboard/students/new' ]);
  }

  editStudent(student: Student) {
    this.router.navigate([ '/dashboard/students/', student.id ]);
  }

}
