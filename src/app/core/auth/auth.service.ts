import { computed, Injectable, signal } from "@angular/core";
import { AuthResponse, LoginRequest } from "./auth.models";
import { HttpClient } from "@angular/common/http";
import { delay, Observable, of, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';

  currentUser = signal<AuthResponse | null>(null);

  isAuthenticated = computed(() =>
    !!this.currentUser()
  );

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
    // this.restoreSession();
  }

  // login(payload: LoginRequest) {
  //   console.log(payload)
  //   return this.http.post<AuthResponse>(
  //     '/api/login',
  //     payload
  //   ).pipe(
  //     tap((response) => {

  //       sessionStorage.setItem(
  //         this.tokenKey,
  //         response.token
  //       );

  //       sessionStorage.setItem(
  //         'role',
  //         response.role
  //       );

  //       this.currentUser.set(response);
  //     })
  //   );
  // }

  login(payload: LoginRequest): Observable<AuthResponse> {

    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token',
      role: 'admin',
      user: {
        id: 1,
        name: 'Admin User'
      }
    };

    return of(mockResponse).pipe(
      delay(1000)
    );
  }

  isLoggedIn() {
    const token = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.clear();
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  // private restoreSession() {

  //   const token = this.getToken();

  //   if (token) {

  //     this.currentUser.set({
  //       token,
  //       role: this.getRole() as any,
  //       user: {
  //         id: 1,
  //         name: 'Restored User'
  //       }
  //     });
  //   }
  // }

  loginUser(email: any, password: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?email=${email}&password=${password}`);
  }
}