import { AfterContentChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { last } from 'rxjs';
import { Course, Semester } from 'src/app/core/models/main';


@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent implements OnInit {
  @Input() courses: Course[] = [];

  @Input() semesters: Semester[] = [];

  form = this.fb.group({
    courseId: ['', [Validators.required]],
    semesterId: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef
  ) {
    this.modalRef.updateConfig({
      nzFooter: [
        {
          label: 'Cancel',
          type: 'default',
          onClick: () => {
            this.modalRef.close();
          }
        },
        {
          label: 'Assign',
          type: 'primary',
          onClick: () => {
            if (this.form.valid) {
              this.modalRef.close(this.form.value);
            }
          }
        }
      ]
    });
  }

  ngOnInit(): void {
    
  }
}
