import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IApiItem } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ApiItemService {
  private _http = inject(HttpClient);
  private apiUrl: string = 'http://localhost:3000/api/items';

  getAllItems(): Observable<IApiItem[]> {
    return this._http
      .get<{ message: string; data: IApiItem[] }>(`${this.apiUrl}`)
      .pipe(map((response) => response.data));
  }

  getItemById(id: number): Observable<IApiItem> {
    return this._http
      .get<{ message: string; data: IApiItem }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  searchItems(query: string): Observable<IApiItem[]> {
    return this._http
      .get<{ message: string; data: IApiItem[] }>(
        `${this.apiUrl}/search?query=${query}`
      )
      .pipe(map((response) => response.data));
  }

  getItemsByCategory(categoryId: number): Observable<IApiItem[]> {
    return this._http
      .get<{ message: string; data: IApiItem[] }>(
        `${this.apiUrl}/category/${categoryId}`
      )
      .pipe(map((response) => response.data));
  }

  addItem(item: IApiItem): Observable<IApiItem> {
    return this._http
      .post<{ message: string; data: IApiItem }>(`${this.apiUrl}`, item)
      .pipe(map((response) => response.data));
  }

  updateItem(id: number, item: Partial<IApiItem>): Observable<IApiItem> {
    return this._http
      .put<{ message: string; data: IApiItem }>(`${this.apiUrl}/${id}`, item)
      .pipe(map((response) => response.data));
  }

  deleteItem(id: number): Observable<void> {
    return this._http
      .delete<{ message: string }>(`${this.apiUrl}/${id}`)
      .pipe(map(() => void 0));
  }
}
