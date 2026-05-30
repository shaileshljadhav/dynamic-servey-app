import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// export interface Student {
//   id?: string;
//   name: string;
//   grade: string;
// }

@Injectable({
  providedIn: 'root'
})

export class Servey {
  private apiUrl = 'http://localhost:3000/forms';

  constructor(private http: HttpClient) {}

  // POST method: Use this to add a NEW entry to your JSON file
  addForm(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  getForms(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // PUT method: Use this instead if you are updating an EXISTING record by ID
  // updateForm(id: string, formData: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  // }
}
