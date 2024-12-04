import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from '../categorias/categorias.component';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, SideBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentComponent: any = null; // Componente actual que se mostrará

  // Método para cargar el componente seleccionado
  loadComponent(componentName: string): void {
    if (componentName === 'productos') {
      this.currentComponent = ItemsComponent;
    }
    if (componentName === 'categorias') {
      this.currentComponent = CategoriasComponent;
    }
  }
}
