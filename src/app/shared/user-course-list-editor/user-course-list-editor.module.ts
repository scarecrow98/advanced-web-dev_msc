import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCourseListEditorComponent } from './user-course-list-editor.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserCourseListComponent } from './components/user-course-list/user-course-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AddCourseFormComponent } from './components/add-course-form/add-course-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { PlusCircleOutline, DeleteOutline } from '@ant-design/icons-angular/icons';


@NgModule({
  declarations: [
    UserCourseListEditorComponent,
    UserCourseListComponent,
    AddCourseFormComponent
  ],
  imports: [
    CommonModule,
    NzFormModule,
    NzSelectModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    ReactiveFormsModule,
    FormsModule,
    NzPopconfirmModule,
    NzIconModule.forChild([
      PlusCircleOutline,
      DeleteOutline
    ])
  ],
  exports: [
    UserCourseListEditorComponent
  ]
})
export class UserCourseListEditorModule { }
