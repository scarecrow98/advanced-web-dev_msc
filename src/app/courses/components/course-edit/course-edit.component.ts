import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Course, Department } from 'src/app/core/models/main';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  private _course: Course|null = null;

  @Input()
  set course(value: Course|null) {
    this._course = value;

    if (value) {
      this.form.setValue({
        name: value.name,
        code: value.code,
        creditScore: value.creditScore,
        department: value.department
      });
    }
  }

  @Output()
  onSave = new EventEmitter<Course>();

  @Output()
  onCancel = new EventEmitter<any>();

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    code: ['', [Validators.required, Validators.minLength(2)]],
    creditScore: [0, [Validators.required, Validators.min(0), Validators.max(6)]],
    department: ['', [Validators.required]]
  });

  departments = Object.keys(Department).map(key => key.toLowerCase())

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  submit() {
    if (this.form.valid) {
      this.onSave.emit({ ...this.form.value, id: this._course?.id } as Course);
    }
  }

  cancel() {
    this.onCancel.emit(true);
  }

}
