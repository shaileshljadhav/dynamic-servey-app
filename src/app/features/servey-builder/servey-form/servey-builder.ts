import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Servey } from '../../../core/services/servey';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,
    private serveyService: Servey,
    private router: Router
  ) { }

  ngOnInit() {
    this.questionTypes = [
      { name: 'Text', code: 'text' },
      { name: 'Multiple Choice ', code: 'mcq' },
      { name: 'Checkbox ', code: 'checkbox' }
    ];

    this.serveyForm = this.fb.group({
      formName: ['', [Validators.required, Validators.minLength(3)]],
      questionsArray: this.fb.array([])
    });

    this.addQuestion();

    this.serveyService.getForms().subscribe({
      next: (response) => {
        console.log('All forms list: ', response);
      },
      error: (err) => {
        console.error('Request failed:', err);
      }
    });
  }

  get questionsArray() {
    return this.serveyForm.get('questionsArray') as FormArray;
  }

  addQuestion() {
    const questionGroup = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(3)]],
      questionType: ['', Validators.required],
      optionsArray: this.fb.array([], this.uniqueOptionsValidator())
    });
    this.questionsArray.push(questionGroup);
  }

  removeQuestion(index: number) {
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
      this.addOption(qIndex);
    } else {
      // const outerArray = this.serveyForm.get('questionsArray') as FormArray;
      // const innerFormGroup = outerArray.at(qIndex) as FormGroup;
      // const innerArray = innerFormGroup.get('optionsArray') as FormArray;
      const optArray = this.serveyForm.get('questionsArray.0.optionsArray') as FormArray;
      optArray.clear();
    }
  }

  onSubmit() {
    if (this.serveyForm.valid) {
      // console.log('Form Submitted:', this.serveyForm.value);

      // Subscribing triggers the HTTP execution request
      this.serveyService.addForm(this.serveyForm.value).subscribe({
        next: (response) => {
          console.log('JSON database successfully modified on disk!', response);
          this.onReset();
          this.goBack();
        },
        error: (err) => {
          console.error('Request failed:', err);
        }
      });
    }
  }

  onReset() {
    this.serveyForm.reset();
  }

  goBack() {
    this.router.navigate(['/servey']); 
  }

  uniqueOptionsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const formArray = control as FormArray;

    if (!formArray || !formArray.controls) {
      return null;
    }

    const options = formArray.controls
      .map(ctrl => ctrl.get('option')?.value?.trim().toLowerCase())
      .filter(value => value);

    const hasDuplicate =
      options.length !== new Set(options).size;

    return hasDuplicate
      ? { duplicateOptions: true }
      : null;
  };
}
}
