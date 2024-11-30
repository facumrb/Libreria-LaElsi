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

@Component({
  selector: 'app-edit-profile',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  formEditProfile!: FormGroup;
  loading: boolean = true;
  admin?: IApiAdmin;
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _apiService = inject(ApiService);

  constructor(private formBuilder: FormBuilder) {
    this.formEditProfile = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')],
      ],
      apellido: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')],
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
    this._apiService.getAdminById(id).subscribe({
      next: (data: IApiAdmin) => {
        this.admin = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el administrador:', err);
        this.loading = false;
      },
    });
  }

  // Método para guardar los cambios del perfil
  guardarCambios(event: Event): void {
    event.preventDefault();
    if (this.admin) {
      this._apiService
        .updateAdmin(this.admin.id.toString(), this.admin)
        .subscribe({
          next: () => {
            alert('Perfil actualizado con éxito');
            this._router.navigate(['/perfil', this.admin?.id]); // Redirige a la vista del perfil actualizado
          },
          error: (err) => {
            console.error('Error al guardar los cambios:', err);
            alert(
              'Hubo un problema al guardar los cambios. Intenta nuevamente.'
            );
          },
        });
    }
  }

  // Método para volver atrás sin guardar
  volverAtras(): void {
    this._router.navigate(['/perfil', this.admin?.id]); // Redirige a la vista de perfil del administrador
  }
}
