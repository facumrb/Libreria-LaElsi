import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  listarProductos() {
    console.log('Mostrando lista de productos...');
    // Aquí llamas al componente o servicio que muestra la lista de productos
  }

  listarCategorias() {
    console.log('Mostrando lista de categorías...');
    // Aquí llamas al componente o servicio que muestra la lista de categorías
  }

  listarUsuarios() {
    console.log('Mostrando lista de usuarios...');
    // Aquí llamas al componente o servicio que muestra la lista de usuarios
  }
}
