import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, map, takeUntil } from 'rxjs';
import { Semester } from 'src/app/core/models/main';
import { AppState } from 'src/app/core/state/app.state';
import { SemesterActions } from 'src/app/core/state/semesters/semester.actions';
import { selectCurrentSemester } from 'src/app/core/state/semesters/semester.selectors';

@Component({
  selector: 'app-semester-details',
  templateUrl: './semester-details.component.html',
  styleUrls: ['./semester-details.component.scss']
})
export class SemesterDetailsComponent implements OnInit {

  semester$ = this.store.select(selectCurrentSemester);

  private _onDestroy$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: NzMessageService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['semesterId']),
      takeUntil(this._onDestroy$)
    ).subscribe(semesterId => {
      if (semesterId === 'new') {
        this.store.dispatch(SemesterActions.loadSemesterSuccess({
          semester: {
            id: -1,
            name: '',
            startDate: '',
            endDate: ''
          }
        }));
      } else {
        this.store.dispatch(SemesterActions.loadSemester({ id: parseInt(semesterId) }));
      }
    });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(true);
    this._onDestroy$.complete();
  }

  saveSemester(payload: Semester) {
    this.store.dispatch(SemesterActions.saveSemester({ semester: payload }));
    // this.store.dispatch(CoursesActions.loadCourseSuccess({ course: null }));

    this.messageService.success('Semester saved');
    this.router.navigate(['/dashboard/semesters']);
  }

  cancelEdit() {
    this.router.navigate(['/dashboard/semesters']);
  }

}
