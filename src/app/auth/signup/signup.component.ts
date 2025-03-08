import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

// function mustContainQuestionMark(control: AbstractControl) {
//   return control.value.includes('?') ? null : { doesNotContainQuestionMark: true };
// }

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    nickname: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  constructor(private authService: AuthService, private router: Router) {}

  get emailIsInvalid() {
    return this.form.controls.email.touched && this.form.controls.email.invalid;
  }

  get passwordIsInvalid() {
    return this.form.controls.password.touched && this.form.controls.password.invalid;
  }

  get nicknameIsInvalid() {
    return this.form.controls.nickname.touched && this.form.controls.nickname.invalid;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password, nickname } = this.form.value;
    if (this.authService.signup(email!, password!, nickname!)) {
      this.router.navigate(['/expenses/Monday']);
    } else {
      alert('Email already in use');
    }
  }

}
