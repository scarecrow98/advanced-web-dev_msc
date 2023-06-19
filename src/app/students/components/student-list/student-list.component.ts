import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from 'src/app/core/models/main';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  columns = [
    {
      title: 'ID',
      compare: (a: Student, b: Student) => a.id - b.id,
      priority: false
    },
    {
      title: 'Name',
      compare: (a: Student, b: Student) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()),
      priority: false
    },
    {
      title: 'Date of Birth',
      compare: (a: Student, b: Student) => a.birthDate.toLocaleLowerCase().localeCompare(b.birthDate.toLocaleLowerCase()),
      priority: false
    },
    {
      title: 'Email',
      compare: (a: Student, b: Student) => a.email.toLocaleLowerCase().localeCompare(b.email.toLocaleLowerCase()),
      priority: false
    },
    {
      title: 'Neptun Code',
      compare: (a: Student, b: Student) => a.neptunCode.toLocaleLowerCase().localeCompare(b.neptunCode.toLocaleLowerCase()),
      priority: false
    },
    {
      title: 'Department',
      compare: (a: Student, b: Student) => a.department!.toLocaleLowerCase().localeCompare(b.department!.toLocaleLowerCase()),
      priority: false
    },
    {
      title: 'Major',
      compare: (a: Student, b: Student) => a.major.toLocaleLowerCase().localeCompare(b.major.toLocaleLowerCase()),
      priority: false
    },
  ];

  @Input() data: Student[] = [];

  @Output() onEdit = new EventEmitter<Student>();

  constructor() { }

  ngOnInit(): void {
  }


}
