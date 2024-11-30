import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IApiAdmin } from '../../../models/admin.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { IApiAccountInfo } from '../../../models/accountInfo.model';

@Component({
  selector: 'app-edit-profile',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  formEditProfile!: FormGroup;
  loading: boolean = true;
  admin?: IApiAccountInfo;
  errorMessage: string = '';

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _apiService = inject(ApiService);

  constructor(private formBuilder: FormBuilder) {
    this.formEditProfile = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_ ]*$'), // Permitir letras acentuadas y espacios
        ],
      ],
      apellido: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_ ]*$'), // Permitir letras acentuadas y espacios
        ],
      ],

      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      usuario: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      const adminId = params['id'];
      this.fetchAdmin(adminId);
    });
  }

  // Obtener los detalles del administrador desde la API
  private fetchAdmin(id: string): void {
    this._apiService.getAdmin(id).subscribe({
      next: (data: IApiAccountInfo) => {
        this.admin = data;
        this.loading = false;
        this.formEditProfile.patchValue({
          nombre: this.admin.nombre,
          apellido: this.admin.apellido,
          telefono: this.admin.telefono,
          usuario: this.admin.usuario,
          email: this.admin.email,
        });
      },
      error: (error) => {
        this.loading = false;
        // Manejo de errores según el código de estado.
        if (error.status >= 500) {
          this.errorMessage =
            'Error del servidor. Por favor, intenta más tarde.';
        } else {
          this.errorMessage =
            'Ocurrió un error inesperado. Inténtalo más tarde.';
        }
      },
    });
  }

  // Método para guardar los cambios del perfil
  guardarCambios(event: Event): void {
    event.preventDefault();
    if (this.admin) {
      this._apiService.updateAdmin(this.admin.id, this.admin).subscribe({
        next: () => {
          alert('Perfil actualizado con éxito');
          this._router.navigate(['admin/view-profile', this.admin?.id]); // Redirige a la vista del perfil actualizado
        },
        error: (err) => {
          console.error('Error al guardar los cambios:', err);
          alert('Hubo un problema al guardar los cambios. Intenta nuevamente.');
        },
      });
    }
  }

  // Método para volver atrás sin guardar
  volverAtras(id: number): void {
    this._router.navigate(['admin/view-profile', id]);
  }

  hasErrors(field: string, typeError: string) {
    return (
      this.formEditProfile.get(field)?.hasError(typeError) &&
      this.formEditProfile.get(field)?.touched
    );
  }
}
