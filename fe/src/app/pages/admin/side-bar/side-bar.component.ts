import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  private _router = inject(Router);
  @Output() onMenuSelect = new EventEmitter<string>();

  selectMenu(menu: string): void {
    this.onMenuSelect.emit(menu);
  }

  Productos(): void {
    this._router.navigate(['/admin/items']);
  }

  Categorias(): void {
    this._router.navigate(['/admin/categorias']);
  }

  Usuarios() {}
}
