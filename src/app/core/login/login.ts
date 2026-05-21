import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({ 
  selector: 'app-login',
  imports: [ReactiveFormsModule,CardModule, InputTextModule, PasswordModule, ButtonModule, FloatLabelModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit{

  constructor(private router: Router){  }

  loginForm!: FormGroup;

  ngOnInit(): void {
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
    this.router.navigate(['/dashboard']);
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      // Implement your authentication API service call here
    }
  }
}
