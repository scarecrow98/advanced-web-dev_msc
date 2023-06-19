import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export interface LoginSubmitPayload {
  email: string,

  password: string
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {
  
  @Output() onSubmit = new EventEmitter<LoginSubmitPayload>();

  form = this.fb.group({
    email: ['student@email.com', [Validators.required, Validators.email]],
    password: ['password123', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value as LoginSubmitPayload);
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
