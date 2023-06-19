import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Semester } from 'src/app/core/models/main';

@Component({
  selector: 'app-semester-edit',
  templateUrl: './semester-edit.component.html',
  styleUrls: ['./semester-edit.component.scss']
})
export class SemesterEditComponent implements OnInit {


  private _semester: Semester|null = null;

  @Input()
  set semester(value: Semester|null) {
    this._semester = value;

    if (value) {
      this.form.setValue({
        name: value.name,
        startDate: value.startDate,
        endDate: value.endDate,
      });
    }
  }

  @Output()
  onSave = new EventEmitter<Semester>();

  @Output()
  onCancel = new EventEmitter<any>();

  form = this.fb.group({
    name: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
  });


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  submit() {
    if (this.form.valid) {
      this.onSave.emit({ ...this._semester, ...this.form.value } as Semester);
    }
  }

  cancel() {
    this.onCancel.emit(true);
  }

}
