import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private _router = inject(Router);

  navegateHome(): void {
    this._router.navigate(['/admin/home']);
  }

  navegateViewProfile(id: number): void {
    this._router.navigate(['/admin/view-profile', id]);
  }

  navegateLogout(): void {
    this._router.navigate(['/login']);
  }
}