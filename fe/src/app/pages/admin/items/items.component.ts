import { Component, inject, OnInit } from '@angular/core';
import { ApiCategoriaService } from '../../../services/api-categoria.service';
import { IApiCategoria } from '../../../models/categoria.model';
import { IApiItem } from '../../../models/item.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiItemService } from '../../../services/api-item.service';

@Component({
  selector: 'app-items',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent implements OnInit {
  formItem!: FormGroup;
  loading: boolean = true;
  errorMessage: string = '';
  private _router = inject(Router);
  private _apiService = inject(ApiItemService);
  items: IApiItem[] = [];
  isModalOpen = false;
  itemSeleccionado?: IApiItem;
  modalMode: 'add' | 'edit' = 'add';
  searchQuery: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.formItem = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_ ]*$'), // Permitir letras acentuadas y espacios
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_ ]*$'), // Permitir letras acentuadas y espacios
        ],
      ],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      marca: ['', [Validators.required]],
      cantVendidos: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      estado: ['', [Validators.required]],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      categoria: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this._apiService.getAllItems().subscribe({
      next: (data: IApiItem[]) => (this.items = data),
    });
  }

  openModal(mode: 'add' | 'edit', item?: IApiItem): void {
    this.modalMode = mode;
    this.isModalOpen = true;
    if (mode === 'edit' && item) {
      this.itemSeleccionado = item;
      this.formItem.patchValue(item);
    } else {
      this.formItem.reset();
      this.formItem.patchValue({ estado: '' });
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    if (this.formItem.valid) {
      const itemData = {
        ...this.itemSeleccionado,
        ...this.formItem.value,
      };
      const request =
        this.modalMode === 'add'
          ? this._apiService.addItem(itemData)
          : this._apiService.updateItem(itemData.id, itemData);

      request.subscribe(() => {
        this.loadItems();
        this.closeModal();
      });
    }
  }

  deleteItem(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
      this._apiService.deleteItem(id).subscribe(() => {
        this.items = this.items.filter((item) => item.id !== id);
      });
    }
  }

  hasErrors(field: string, typeError: string) {
    return (
      this.formItem.get(field)?.hasError(typeError) &&
      this.formItem.get(field)?.touched
    );
  }

  onSearch(): void {
    const trimmedQuery = this.searchQuery.trim();
    if (trimmedQuery) {
      this._apiService.searchItems(trimmedQuery).subscribe({
        next: (data) => {
          this.items = data;
        },
        error: (error) => {
          console.error('Error en la búsqueda:', error);
          this.items = [];
        },
      });
    } else {
      this.loadItems(); // Cargar todas las categorías si no hay búsqueda
    }
  }
}