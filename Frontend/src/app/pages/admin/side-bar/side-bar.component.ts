import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  private _router = inject(Router);

  Productos(): void {
    this._router.navigate(['/admin/items']);
  }

  Categorias(): void {
    this._router.navigate(['/admin/categorias']);
  }

  Usuarios() {}
}
