import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Instructor } from 'src/app/core/models/main';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.scss']
})
export class InstructorListComponent implements OnInit {


  columns = [
    {
      title: 'ID',
      compare: (a: Instructor, b: Instructor) => a.id - b.id,
      priority: false
    },
    {
      title: 'Name',
      compare: (a: Instructor, b: Instructor) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()),
      priority: false
    },
    {
      title: 'Date of Birth',
      compare: (a: Instructor, b: Instructor) => a.birthDate.toLocaleLowerCase().localeCompare(b.birthDate.toLocaleLowerCase()),
      priority: false
    },
    {
      title: 'Email',
      compare: (a: Instructor, b: Instructor) => a.email.toLocaleLowerCase().localeCompare(b.email.toLocaleLowerCase()),
      priority: false
    },
    {
      title: 'Neptun Code',
      compare: (a: Instructor, b: Instructor) => a.neptunCode.toLocaleLowerCase().localeCompare(b.neptunCode.toLocaleLowerCase()),
      priority: false
    },
    {
      title: 'Department',
      compare: (a: Instructor, b: Instructor) => a.department!.toLocaleLowerCase().localeCompare(b.department!.toLocaleLowerCase()),
      priority: false
    },
    {
      title: 'Status',
      compare: (a: Instructor, b: Instructor) => a.status.toLocaleLowerCase().localeCompare(b.status.toLocaleLowerCase()),
      priority: false
    },
  ];

  @Input() data: Instructor[] = [];

  @Output() onEdit = new EventEmitter<Instructor>();

  constructor() { }

  ngOnInit(): void {
  }


}
