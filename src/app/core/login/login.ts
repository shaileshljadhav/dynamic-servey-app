import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FloatLabelModule,
  ],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  constructor(private router: Router,
    private authService: AuthService
  ) { }

  loginForm!: FormGroup;

  ngOnInit(): void {
    if (!this.authService.isLoggedIn())
      this.authService.logout();
    else
      this.router.navigate(['/dashboard']);

    
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  // onSubmit(): void {
  //   // this.router.navigate(['/dashboard']);
  //   if (this.loginForm.valid) {
  //     console.log('Login Data:', this.loginForm.value);
  //     this.authService.login(this.loginForm.value).subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //       // Example: Save token to local storage and redirect
  //       localStorage.setItem('authToken', res.token);
  //       this.router.navigate(['/dashboard']);
  //     },
  //     error: (err: any) => {
  //       // Example: Capture and display backend error message
  //       console.log(err.error.message || 'Login failed. Please try again.');
  //     }
  //     });
  //   }
  // }

  onSubmit(): void {

    const payload = this.loginForm.value;

    this.authService.login(payload)
      .subscribe({
        next: (response) => {

          console.log(response);

          sessionStorage.setItem(
            'token',
            response.token
          );

          this.router.navigate(['/dashboard']);
        },

        error: (err) => {
          console.log(err);
        }
      });
  }
}
