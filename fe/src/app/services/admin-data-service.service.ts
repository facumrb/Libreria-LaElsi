import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminDataService {
  private adminId?: number;

  setAdminId(id: number): void {
    this.adminId = id;
  }

  getAdminId(): number | undefined {
    return this.adminId;
  }
}
