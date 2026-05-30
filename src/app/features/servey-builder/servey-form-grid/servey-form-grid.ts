import { Component, OnInit } from '@angular/core';
import { Servey } from '../../../core/services/servey';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-servey-form-grid',
  imports: [
    TableModule,
    ButtonModule,
  ],
  templateUrl: './servey-form-grid.html',
  styleUrl: './servey-form-grid.scss',
})
export class ServeyFormGrid implements OnInit {

  forms!: any[];

  constructor(
    private serveyService: Servey,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFormData();
  }

  getFormData() {
    this.serveyService.getForms().subscribe({
      next: (response) => {
        this.forms = response;
      },
      error: (err) => {
        console.error('Request failed:', err);
      }
    });
  }

  onNewForm() {
    this.router.navigate(['/servey/add-form']); 
  }

}
