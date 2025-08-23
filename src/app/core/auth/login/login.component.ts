import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  msgError: string = '';
  loginForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-z]).{7,}$/)]),

  });

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.loginForm(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.msgError = error.error.message;
          console.log('Registration failed', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {

      console.log('Form is invalid');
      this.isLoading = false;

    }
  }


}
