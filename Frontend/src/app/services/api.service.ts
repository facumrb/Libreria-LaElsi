import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IApiAdmin } from '../models/admin.model';
import { IApiAccountInfo } from '../models/accountInfo.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _http = inject(HttpClient);
  private apiUrl: string = 'http://localhost:3000/api';

  getAllAdmins(): Observable<IApiAdmin[]> {
    return this._http
      .get<{ message: string; data: IApiAdmin[] }>(
        `${this.apiUrl}/administradores`
      )
      .pipe(map((response) => response.data));
  }

  getAdmin(id: string | number): Observable<IApiAccountInfo> {
    return this._http
      .get<{ message: string; data: IApiAccountInfo }>(
        `${this.apiUrl}/administradores/account/${id}`
      )
      .pipe(map((response) => response.data));
  }

  getAdminById(id: string | number): Observable<IApiAdmin> {
    return this._http
      .get<{ message: string; data: IApiAdmin }>(
        `${this.apiUrl}/administradores/${id}`
      )
      .pipe(map((response) => response.data));
  }

  updateAdmin(
    id: string | number,
    admin: IApiAccountInfo
  ): Observable<IApiAccountInfo> {
    return this._http
      .put<{ message: string; data: IApiAccountInfo }>(
        `${this.apiUrl}/administradores/${id}`,
        admin
      )
      .pipe(map((response) => response.data));
  }
}
