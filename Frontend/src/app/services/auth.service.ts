import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/administradores';

  login(usuario: string, password: string): Observable<any> {
    return this._http.post(`${this.apiUrl}/login`, {
      usuario,
      password,
    });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
