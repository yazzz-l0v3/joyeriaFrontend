import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Marca } from '../model/marca.interface';
import { Producto } from '../model/producto.interface';
import { MarcaService } from '../services/marca.service';
import { ProductoService } from '../services/producto.service';
@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatInputModule, MatButtonModule, FormsModule, MatGridListModule, MatSelectModule, MatIconModule],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export default class FormularioProductoComponent implements OnInit{
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private marcaService = inject(MarcaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  listaMarcas: Marca[]=[]
  form?: FormGroup;
  editarDatosProducto?:Producto;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')  
    if(id!=null){
      this.productoService.obtener(parseInt(id)).subscribe(res =>{
        this. editarDatosProducto = res;
        this.form = this.fb.group({
          nombreProd: [res.nombreProd, [Validators.required]],         
          descripcionProd: [res.descripcionProd, [Validators.required]],   
          precioProd: [res.precioProd, [Validators.required]],      
          imagenUrl: [res.imagenUrl, [Validators.required]],         
          idMarca: [res.marca.id, [Validators.required]]              
        })
        }
      )
    }else{//no existe valores previos, esto es para crear
      this.form = this.fb.group({
        nombreProd: ['', [Validators.required]],         
        descripcionProd: ['', [Validators.required]],    
        precioProd: ["", [Validators.required]],        
        imagenUrl: ['', [Validators.required]],           
        idMarca: ["", [Validators.required]]            
      })
    }
    
    //Traer todos los valores del listado de especialidades para pintar en el combo de selección
    this.marcaService.listar().subscribe(
      (lista)=>{
        this.listaMarcas = lista
      }
    )
  }



  guardar(){
    if (this.form!.invalid) {//validar todos los campos del formulario como obligatorios
      return;
    }

    const productoFormulario = this.form!.value;
    if(this.editarDatosProducto){
      let idProducto = this.editarDatosProducto.id;
      this.productoService.actualizar(idProducto, productoFormulario)
      .subscribe(
        ()=>{
          this.router.navigate(['/']);
        }
      )
      this.openSnackBarActualizar();

    }else{
      this.productoService.registrar(productoFormulario)
      .subscribe(
        ()=>{
          this.router.navigate(['/']);
        }
      )
      this.openSnackBarCrear();
    }
  }

  openSnackBarCrear() {
    this.snackBar.open('Registrado con éxito!', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:4000
    });
  }

  openSnackBarActualizar() {
    this.snackBar.open('Actualizado con éxito!', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:4000
    });
  }
}
