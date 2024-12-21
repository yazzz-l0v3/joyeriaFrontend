import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private baseUrl = "http://localhost:8080/api/usuario/registro";  // Usamos el endpoint de registro directamente
  private http = inject(HttpClient);

  constructor() { }

  // Método para registrar un nuevo usuario
  registrar(datos: { 
    usuario: string, 
    correo: string, 
    clave: string, 
    nombres: string, 
    apellidoPaterno: string, 
    apellidoMaterno: string, 
    dni: string 
  }): Observable<any> {
    return this.http.post(this.baseUrl, datos);  // Realiza el POST al backend para registrar el usuario
  }
}
