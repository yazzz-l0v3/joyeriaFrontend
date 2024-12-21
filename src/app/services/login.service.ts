import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Este decorador indica que Angular puede manejar el ciclo de vida del servicio
})
export class LoginService {
  private baseUrl = "http://localhost:8080/api/usuario";
  private http = inject(HttpClient);  // Asegúrate de que HttpClient esté correctamente inyectado

  constructor() { }

  // Método registrar
  registrar(datos: { usuario: string, correo: string, clave: string, nombres: string, apellidoPaterno: string, apellidoMaterno: string, dni: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/registro`, datos);  // Asegúrate de que la URL sea correcta
  }

  login(credenciales: { usuario: string, clave: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credenciales);
  }
}
