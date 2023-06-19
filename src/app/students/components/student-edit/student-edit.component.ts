import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Department, Instructor, Major, Student } from 'src/app/core/models/main';
import { neptunCodeValidator } from 'src/app/core/validators/neptun-code.validator';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

  private _student: Student|null = null;

  @Input()
  set student(value: Student|null) {
    this._student = value;

    if (value) {
      this.form.setValue({
        name: value.name,
        email: value.email,
        birthDate: value.birthDate,
        neptunCode: value.neptunCode,
        major: value.major,
        password: value.password
      });
    }
  }

  @Output()
  onSave = new EventEmitter<Student>();

  @Output()
  onCancel = new EventEmitter<any>();

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', [Validators.required]],
    neptunCode: ['', [Validators.required, neptunCodeValidator()]],
    major: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  studentMajors = Object.keys(Major).map(key => key.toLocaleLowerCase());

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  submit() {
    if (this.form.valid) {
      this.onSave.emit({ ...this._student, department: Department.UNKOWN, ...this.form.value } as Student);
    }
  }

  cancel() {
    this.onCancel.emit(true);
  }

}
