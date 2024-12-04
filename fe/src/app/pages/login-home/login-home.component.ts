import { CommonModule, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAdministradorService } from '../../services/api-administrador.service';
import { AuthService } from '../../services/auth.service';
import { AdminDataService } from '../../services/admin-data-service.service';

@Component({
  selector: 'app-login-home',
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './login-home.component.html',
  styleUrl: './login-home.component.css',
})
export class LoginHomeComponent {
  formLoginAdmin!: FormGroup;
  private _adminDataService = inject(AdminDataService);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  loading: boolean = false;
  errorMessage: string = '';
  passwordVisible: boolean = false;
  showEyeIcon: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.formLoginAdmin = this.formBuilder.group({
      usuario: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')],
      ],
      password: ['', [Validators.required]],
    });
  }

  enviar(event: Event): boolean {
    event.preventDefault();

    // Si el formulario no es válido, marcamos todos los campos como tocados para mostrar errores.
    if (this.formLoginAdmin.invalid) {
      this.formLoginAdmin.markAllAsTouched();
      return false;
    }

    // Mostramos un spinner y ocultamos mensajes de error mientras procesamos.
    this.loading = true;
    this.errorMessage = ''; // Limpiamos cualquier mensaje de error anterior.

    const { usuario, password } = this.formLoginAdmin.value;

    // Llamamos al servicio de autenticación.
    this._authService.login(usuario, password).subscribe({
      next: (data) => {
        this.loading = false;
        this._adminDataService.setAdminId(data.id);
        this._router.navigate(['/admin/home']); // Redirigimos al home del administrador.
      },
      error: (error) => {
        this.loading = false;
        // Manejo de errores según el código de estado.
        if (error.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        } else if (error.status >= 500) {
          this.errorMessage =
            'Error del servidor. Por favor, intenta más tarde.';
        } else {
          this.errorMessage =
            'Ocurrió un error inesperado. Inténtalo más tarde.';
        }
      },
    });

    return true;
  }

  hasErrors(field: string, typeError: string) {
    return (
      this.formLoginAdmin.get(field)?.hasError(typeError) &&
      this.formLoginAdmin.get(field)?.touched
    );
  }

  //MOSTRAR O NO EL ICONO DEL OJO
  onPasswordInput(): void {
    const passwordValue = this.formLoginAdmin.get('password')?.value || '';
    this.showEyeIcon = passwordValue.length > 0;
  }

  //MOSTRAR CONTRASEÑA
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible; // Alterna la visibilidad
  }
}
