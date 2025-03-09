import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

function mustContainNumber(control: AbstractControl) {
  return /\d/.test(control.value) ? null : { doesNotContainNumber: true };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMessage: string | null = null;

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainNumber,
      ],
    }),
  });

  constructor(private authService: AuthService, private router: Router) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.router.navigate(['/expenses/Monday']);
    }
  }

  get emailIsInvalid() {
    return this.form.controls.email.touched && this.form.controls.email.invalid;
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched && this.form.controls.password.invalid
    );
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    if (this.authService.login(email!, password!)) {
      this.router.navigate(['/expenses/Monday']);
    } else {
      this.errorMessage = 'Incorrect email or password';
    }
  }
}
