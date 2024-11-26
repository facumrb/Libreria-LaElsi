import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-home',
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './login-home.component.html',
  styleUrl: './login-home.component.css',
})
export class LoginHomeComponent {
  formLoginAdmin!: FormGroup;
  loading: boolean = false;
  passwordVisible: boolean = false;
  showEyeIcon: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.formLoginAdmin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  enviar(event: Event): boolean {
    event.preventDefault();
    if (this.formLoginAdmin.invalid) {
      this.formLoginAdmin.markAllAsTouched();
      return false;
    }

    this.loading = true;
    setTimeout(() => {
      console.log(this.formLoginAdmin.value);
      this.loading = false;
    }, 700); // Simula un tiempo de espera

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
