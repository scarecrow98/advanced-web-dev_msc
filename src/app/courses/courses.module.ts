import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './containers/courses/courses.component';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CourseListComponent } from './components/course-list/course-list.component';
import { TypeaheadFilterModule } from '../shared/typeahead-filter/typeahead-filter.module';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

import { PlusCircleOutline, EditOutline, SaveOutline } from '@ant-design/icons-angular/icons';
import { CourseService } from './services/course.service';
import { CourseDetailsComponent } from './containers/course-details/course-details.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from '../core/guards/admin.guard';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseListComponent,
    CourseDetailsComponent,
    CourseEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CoursesComponent,
        children: [
          {
            path: ':courseId',
            component: CourseDetailsComponent,
            canActivate: [AdminGuard]
          }
        ]
      }
    ]),
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    TypeaheadFilterModule,
    NzIconModule.forChild([
      PlusCircleOutline,
      EditOutline,
      SaveOutline
    ]),
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzEmptyModule
  ],
  providers: [
    // CourseService
  ]
})
export class CoursesModule { }
