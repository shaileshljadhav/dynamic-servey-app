import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      { name: 'Text', code: 'text' },
      { name: 'Multiple Choice ', code: 'mcq' },
      { name: 'Checkbox ', code: 'checkbox' }
    ];

    this.serveyForm = this.fb.group({
      questionsArray: this.fb.array([])
    });

    this.addAddress();
  }

  get questionsArray() {
    return this.serveyForm.get('questionsArray') as FormArray;
  }

  addAddress() {
    const questionGroup = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(2)]],
      questionType: [null, Validators.required]
    });
    this.questionsArray.push(questionGroup);
  }

  removeAddress(index: number) {
    this.questionsArray.removeAt(index);
  }

  onSubmit() {
    if (this.serveyForm.valid) {
      console.log('Form Submitted:', this.serveyForm.value);
    }
  }
}
