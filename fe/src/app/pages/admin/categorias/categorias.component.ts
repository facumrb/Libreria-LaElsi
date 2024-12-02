import { Component, inject, OnInit } from '@angular/core';
import { ApiCategoriaService } from '../../../services/api-categoria.service';
import { IApiCategoria } from '../../../models/categoria.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent implements OnInit {
  formCategory!: FormGroup;
  loading: boolean = true;
  errorMessage: string = '';
  private _router = inject(Router);
  private _apiService = inject(ApiCategoriaService);
  categorias: IApiCategoria[] = [];
  isModalOpen = false;
  categoriaSeleccionada?: IApiCategoria;
  modalMode: 'add' | 'edit' = 'add';
  searchQuery: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.formCategory = this.formBuilder.group({
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
      estado: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadCategorias();
  }

  onSearch(): void {
    const trimmedQuery = this.searchQuery.trim();
    if (trimmedQuery) {
      this._apiService.searchCategorias(trimmedQuery).subscribe({
        next: (data) => {
          this.categorias = data;
        },
        error: (error) => {
          console.error('Error en la búsqueda:', error);
          this.categorias = [];
        },
      });
    } else {
      this.loadCategorias(); // Cargar todas las categorías si no hay búsqueda
    }
  }

  loadCategorias(): void {
    this._apiService.getAllCategorias().subscribe({
      next: (data: IApiCategoria[]) => (this.categorias = data),
    });
  }

  openModal(mode: 'add' | 'edit', categoria?: IApiCategoria): void {
    this.modalMode = mode;
    this.isModalOpen = true;
    if (mode === 'edit' && categoria) {
      this.categoriaSeleccionada = categoria;
      this.formCategory.patchValue(categoria);
    } else {
      this.formCategory.reset();
      this.formCategory.patchValue({ estado: '' });
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    if (this.formCategory.valid) {
      const categoriaData = {
        ...this.categoriaSeleccionada,
        ...this.formCategory.value,
      };
      const request =
        this.modalMode === 'add'
          ? this._apiService.addCategoria(categoriaData)
          : this._apiService.updateCategoria(categoriaData.id, categoriaData);

      request.subscribe(() => {
        this.loadCategorias();
        this.closeModal();
      });
    }
  }

  deleteCategoria(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
      this._apiService.deleteCategoria(id).subscribe(() => {
        this.categorias = this.categorias.filter(
          (categoria) => categoria.id !== id
        );
      });
    }
  }

  hasErrors(field: string, typeError: string) {
    return (
      this.formCategory.get(field)?.hasError(typeError) &&
      this.formCategory.get(field)?.touched
    );
  }
}
