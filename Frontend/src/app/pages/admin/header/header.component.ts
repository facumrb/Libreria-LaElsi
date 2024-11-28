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

  navegateEditProfile(): void {
    this._router.navigate(['/admin/edit-profile']);
  }

  navegateLogout(): void {
    this._router.navigate(['/login']);
  }
}
