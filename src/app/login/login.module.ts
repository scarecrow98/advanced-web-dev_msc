import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent }
    ]),
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule
  ]
})
export class LoginModule { }
