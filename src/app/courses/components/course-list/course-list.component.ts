import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/core/models/main';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

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

  @Output() onEdit = new EventEmitter<Course>();

  constructor() { }

  ngOnInit(): void {
  }

}
