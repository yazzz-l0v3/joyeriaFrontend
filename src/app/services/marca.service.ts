import { inject, Injectable } from '@angular/core';
import { Marca } from '../model/marca.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private http = inject(HttpClient);
  constructor() { }

  listar(){
    return this.http.get<Marca[]>('http://localhost:8080/api/marca/listar');
  }
}
