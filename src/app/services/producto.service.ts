import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Injector } from '@angular/core';
import { Producto } from '../model/producto.interface';
import { Marca } from '../model/marca.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  constructor() { }

  listar(){
    return this.http.get<Producto[]>('http://localhost:8080/api/producto/listar')
  }

  registrar(producto: Producto){
    return this.http.post('http://localhost:8080/api/producto/registrar', producto)
  }

  obtener(id:number){
    return this.http.get<Producto>('http://localhost:8080/api/producto/obtener/'+id)
  }

  actualizar(id:number, producto: Producto){
    return this.http.put('http://localhost:8080/api/producto/actualizar/'+id, producto)
  }

  eliminar(id:number){
    return this.http.delete('http://localhost:8080/api/producto/eliminar/'+id)
  }
}
