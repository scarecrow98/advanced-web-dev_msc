import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'instructors',
        loadChildren: () => import('../instructors/instructors.module').then(m => m.InstructorsModule),
        title: 'Instructors',
        data: {
          title: 'Instructors'
        }
      },
      {
        path: 'students',
        loadChildren: () => import('../students/students.module').then(m => m.StudentsModule),
        title: 'Students',
        data: {
          title: 'Students'
        }
      },
      {
        path: 'courses',
        loadChildren: () => import('../courses/courses.module').then(m => m.CoursesModule),
        title: 'Courses',
        data: {
          title: 'Courses'
        }
      },
      {
        path: 'semesters',
        loadChildren: () => import('../semesters/semesters.module').then(m => m.SemestersModule),
        title: 'Semesters',
        data: {
          title: 'Semesters'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
