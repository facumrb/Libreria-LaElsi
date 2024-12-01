import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IApiCategoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root',
})
export class ApiCategoriaService {
  private _http = inject(HttpClient);
  private apiUrl: string = 'http://localhost:3000/api/items/categorias';

  getAllCategorias(): Observable<IApiCategoria[]> {
    return this._http
      .get<{ message: string; data: IApiCategoria[] }>(`${this.apiUrl}`)
      .pipe(map((response) => response.data));
  }

  getCategoriaById(id: number): Observable<IApiCategoria> {
    return this._http
      .get<{ message: string; data: IApiCategoria }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  searchCategorias(query: string): Observable<IApiCategoria[]> {
    return this._http
      .get<{ message: string; data: IApiCategoria[] }>(
        `${this.apiUrl}/search?query=${query}`
      )
      .pipe(map((response) => response.data));
  }

  addCategoria(categoria: IApiCategoria): Observable<IApiCategoria> {
    return this._http
      .post<{ message: string; data: IApiCategoria }>(
        `${this.apiUrl}`,
        categoria
      )
      .pipe(map((response) => response.data));
  }

  updateCategoria(
    id: number,
    categoria: Partial<IApiCategoria>
  ): Observable<IApiCategoria> {
    return this._http
      .put<{ message: string; data: IApiCategoria }>(
        `${this.apiUrl}/${id}`,
        categoria
      )
      .pipe(map((response) => response.data));
  }

  deleteCategoria(id: number): Observable<void> {
    return this._http
      .delete<{ message: string }>(`${this.apiUrl}/${id}`)
      .pipe(map(() => void 0));
  }
}
