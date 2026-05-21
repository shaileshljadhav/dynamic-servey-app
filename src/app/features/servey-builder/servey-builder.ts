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
      questionType: [null, Validators.required],
      optionsArray: this.fb.array([])
    });
    this.questionsArray.push(questionGroup);
  }

  removeAddress(index: number) {
    this.questionsArray.removeAt(index);
  }

  createOptionGroup(): FormGroup {
    return this.fb.group({
      option: ['', Validators.required]
    });
  }

  getOptionsArray(qIndex: number): FormArray {
    return this.questionsArray.at(qIndex).get('optionsArray') as FormArray;
  }

  addOption(qIndex: number): void {
    this.getOptionsArray(qIndex).push(this.createOptionGroup());
  }

  removeOption(qIndex: number, oIndex: number): void {
    this.getOptionsArray(qIndex).removeAt(oIndex);
  }

  onQueTypeChange(e: any, qIndex: number) {
    if (e.value !== 'text') {
      this.addOption(qIndex);
    }
  }

  onSubmit() {
    if (this.serveyForm.valid) {
      console.log('Form Submitted:', this.serveyForm.value);
    }
  }
}
