import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiAdmin } from '../models/admin.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _http = inject(HttpClient);
  private apiUrl: string = 'http://localhost:3000/api';

  getAllAdmins(): Observable<IApiAdmin[]> {
    return this._http.get<IApiAdmin[]>(`${this.apiUrl}/administradores`);
  }

  getAdminById(id: number): Observable<IApiAdmin> {
    return this._http.get<IApiAdmin>(`${this.apiUrl}/administradores/${id}`);
  }
}
