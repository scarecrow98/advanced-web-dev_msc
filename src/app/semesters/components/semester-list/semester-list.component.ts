import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Semester } from 'src/app/core/models/main';

@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.scss']
})
export class SemesterListComponent implements OnInit {
  columns = [
    {
      title: 'ID',
      compare: (a: Semester, b: Semester) => a.id - b.id,
      priority: false
    },
    {
      title: 'Name',
      compare: (a: Semester, b: Semester) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()),
      priority: false
    },
    {
      title: 'Start Date',
      compare: (a: Semester, b: Semester) => a.startDate.toLocaleLowerCase().localeCompare(b.startDate.toLocaleLowerCase()),
      priority: false
    },
    {
      title: 'End Date',
      compare: (a: Semester, b: Semester) => a.endDate.toLocaleLowerCase().localeCompare(b.endDate.toLocaleLowerCase()),
      priority: false
    },
  ];

  @Input() data: Semester[] = [];

  @Output() onEdit = new EventEmitter<Semester>();

  constructor() { }

  ngOnInit(): void {
  }


}
