import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

function mustContainNumber(control: AbstractControl) {
  return /\d/.test(control.value) ? null : { doesNotContainNumber: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
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
    nickname: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor(private authService: AuthService, private router: Router) {}

  get emailIsInvalid() {
    return this.form.controls.email.touched && this.form.controls.email.invalid;
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched && this.form.controls.password.invalid
    );
  }

  get nicknameIsInvalid() {
    return (
      this.form.controls.nickname.touched && this.form.controls.nickname.invalid
    );
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password, nickname } = this.form.value;
    if (this.authService.signup(email!, password!, nickname!)) {
      this.router.navigate(['/expenses/Monday']);
    } else {
      this.errorMessage = 'Email already in use';
    }
  }
}
