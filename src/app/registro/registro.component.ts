import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RegistroService } from '../services/registro.service';  // Importa el nuevo servicio de registro
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';  // Asegúrate de importar Router correctamente

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  datos = { 
    usuario: '', 
    correo: '', 
    clave: '', 
    nombres: '', 
    apellidoPaterno: '', 
    apellidoMaterno: '', 
    dni: '' 
  };

  // Inyección del servicio Router
  constructor(private registroService: RegistroService, private router: Router) { }

  // Método para registrar el usuario
  registrarUsuario(): void {
    this.registroService.registrar(this.datos).subscribe(
      (response: any) => {  // Aquí se maneja la respuesta del backend
        console.log('Registro exitoso:', response);
        alert('El registro fue exitoso');
        this.irALogin();  // Redirige al login después del registro exitoso
      },
      (error: any) => {  // Aquí se maneja el error
        console.error('Error en el registro:', error);
        alert('Hubo un error en el registro. Intenta de nuevo.');  // Muestra un mensaje de error
      }
    );
  }

  // Método para redirigir al login
  irALogin(): void {
    this.router.navigate(['/']);
  }
}
