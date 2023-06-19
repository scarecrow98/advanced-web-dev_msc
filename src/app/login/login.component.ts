import { Component, OnInit } from '@angular/core';
import { LoginSubmitPayload } from './components/login-form/login-form.component';
import { AuthService } from '../core/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private messageService: NzMessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(payload: LoginSubmitPayload) {
    this.authService.login(payload.email, payload.password).subscribe(success => {
      if (success) {
        this.messageService.success('Login successful');
        this.router.navigate(['/dashboard/instructors']);
      } else {
        this.messageService.error('Login failed');
      }
    })
  }
}
