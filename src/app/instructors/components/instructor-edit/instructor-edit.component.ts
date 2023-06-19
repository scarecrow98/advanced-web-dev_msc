import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Department, Instructor, InstructorStatus } from 'src/app/core/models/main';
import { neptunCodeValidator } from 'src/app/core/validators/neptun-code.validator';

@Component({
  selector: 'app-instructor-edit',
  templateUrl: './instructor-edit.component.html',
  styleUrls: ['./instructor-edit.component.scss']
})
export class InstructorEditComponent implements OnInit {

  private _instructor: Instructor|null = null;

  @Input()
  set instructor(value: Instructor|null) {
    this._instructor = value;

    if (value) {
      this.form.setValue({
        name: value.name,
        email: value.email,
        birthDate: value.birthDate,
        neptunCode: value.neptunCode, // todo custom validator
        department: value.department,
        status: value.status,
        password: value.password
      });
    }
  }

  @Output()
  onSave = new EventEmitter<Instructor>();

  @Output()
  onCancel = new EventEmitter<any>();

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', [Validators.required]],
    neptunCode: ['', [Validators.required, neptunCodeValidator()]],
    department: ['', [Validators.required]],
    status: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  departments = Object.keys(Department).map(key => key.toLowerCase());

  instructorStatuses = Object.keys(InstructorStatus).map(key => key.toLocaleLowerCase());

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  submit() {
    if (this.form.valid) {
      this.onSave.emit({ ...this._instructor, ...this.form.value } as Instructor);
    }
  }

  cancel() {
    this.onCancel.emit(true);
  }

}
