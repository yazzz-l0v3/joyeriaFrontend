import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ConfirmarDialogComponent } from '../confirmar-dialog/confirmar-dialog.component';
import { Producto } from '../model/producto.interface';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatIconModule, MatPaginatorModule, MatTableModule, MatIconModule, MatTooltipModule, MatButtonModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  private productoService = inject(ProductoService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource:any;
  displayedColumns: string[] = ['id', 'imagenUrl','nombreProd', 'descripcionProd', 'marca', 'precioProd',   'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.productoService.listar().subscribe(
      (producto) => {
        console.log('Productos:', producto);  
        this.dataSource = new MatTableDataSource<Producto>(producto);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al cargar los productos', error);
      }
    );
  }
  

  eliminar(idProducto: number): void {
    const dialogRef = this.dialog.open(ConfirmarDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productoService.eliminar(idProducto).subscribe(
          (producto)=>{
            if(producto!=undefined){
              this.listar();
              this.openSnackBarEliminar();
            }
          }
        )
      }
    });
  }

  openSnackBarEliminar() {
    this.snackBar.open('Eliminado con éxito!', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:4000
    });
  }
}
