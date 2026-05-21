import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-servey-builder',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    ButtonModule
  ],
  templateUrl: './servey-builder.html',
  styleUrl: './servey-builder.scss',
})
export class ServeyBuilder implements OnInit {
  serveyForm!: FormGroup;
  questionTypes: any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.questionTypes = [
      { name: 'Text', code: '1' },
      { name: 'Multiple Choice ', code: '2' },
      { name: 'Checkbox ', code: '3' }
    ];

    this.serveyForm = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(2)]],
      questionType: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.serveyForm.valid) {
      console.log('Form Submitted:', this.serveyForm.value);
    }
  }
}
