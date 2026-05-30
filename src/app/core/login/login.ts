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

  loginForm!: FormGroup;
  constructor(private router: Router,
    private authService: AuthService
  ) { }

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

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.loginUser(email, password).subscribe({
        next: (response) => {
          // console.log('User exists!:', response);
          if (response.length > 0) {
            sessionStorage.setItem('token', response.token);
  
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          console.error('Request failed:', err);
        }
      });
    }
  }

  // onSubmit(): void {

  //   const payload = this.loginForm.value;

  //   this.authService.login(payload)
  //     .subscribe({
  //       next: (response) => {

  //         console.log(response);

  //         sessionStorage.setItem(
  //           'token',
  //           response.token
  //         );

  //         this.router.navigate(['/dashboard']);
  //       },

  //       error: (err) => {
  //         console.log(err);
  //       }
  //     });
  // }
}
