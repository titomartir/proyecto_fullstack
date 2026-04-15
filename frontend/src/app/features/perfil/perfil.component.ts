import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../core/services/perfil.service';
import { Perfil } from '../../models/perfil.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  form: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private perfilService: PerfilService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(18), Validators.max(120)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
    });
  }

  ngOnInit() {
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.perfilService.getPerfil().subscribe({
      next: perfil => {
        this.form.patchValue(perfil);
      },
      error: err => this.error = err.error?.error || 'Error al cargar perfil'
    });
  }

  actualizarPerfil() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.perfilService.updatePerfil(this.form.value).subscribe({
      next: perfil => this.form.patchValue(perfil),
      error: err => this.error = err.error?.error || 'Error al actualizar perfil'
    });
  }

  get nombre() { return this.form.get('nombre'); }
  get apellido() { return this.form.get('apellido'); }
  get edad() { return this.form.get('edad'); }
  get correo() { return this.form.get('correo'); }
  get telefono() { return this.form.get('telefono'); }
}
