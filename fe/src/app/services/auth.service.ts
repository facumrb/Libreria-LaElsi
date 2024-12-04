import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IApiAccountInfo } from '../models/accountInfo.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/administradores';

  login(usuario: string, password: string): Observable<IApiAccountInfo> {
    return this._http
      .post<{ message: string; data: IApiAccountInfo }>(
        `${this.apiUrl}/login`,
        {
          usuario,
          password,
        }
      )
      .pipe(map((response) => response.data));
  }
}
