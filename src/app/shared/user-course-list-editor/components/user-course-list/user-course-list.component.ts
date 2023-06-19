import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/core/models/main';

@Component({
  selector: 'app-user-course-list',
  templateUrl: './user-course-list.component.html',
  styleUrls: ['./user-course-list.component.scss']
})
export class UserCourseListComponent implements OnInit {

  columns = [
    {
      title: 'ID',
      compare: (a: Course, b: Course) => a.id - b.id,
      priority: false
    },
    {
      title: 'Name',
      compare: (a: Course, b: Course) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()),
      priority: false
    },
    {
      title: 'Code',
      compare: (a: Course, b: Course) => a.code.toLocaleLowerCase().localeCompare(b.code.toLocaleLowerCase()),
      priority: false
    },
    {
      title: 'Credit score',
      compare: (a: Course, b: Course) => a.creditScore - b.creditScore,
      priority: false
    },
    {
      title: 'Department',
      compare: (a: Course, b: Course) => a.department.toLocaleLowerCase().localeCompare(b.department.toLocaleLowerCase()),
      priority: false
    }
  ];

  @Input() data: Course[] = [];

  @Output() onDelete = new EventEmitter<Course>();

  constructor() { }

  ngOnInit(): void {
  }

}
