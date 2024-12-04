import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from '../../../services/admin-data-service.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private _router = inject(Router);
  private adminId?: number;
  _adminDataService = inject(AdminDataService);

  ngOnInit(): void {
    this.adminId = this._adminDataService.getAdminId();
  }

  navegateHome(): void {
    this._router.navigate(['/admin/home']);
  }

  navegateViewProfile(id: number): void {
    this._router.navigate(['/admin/view-profile', this.adminId]);
  }

  navegateLogout(): void {
    this._router.navigate(['/login']);
  }
}
