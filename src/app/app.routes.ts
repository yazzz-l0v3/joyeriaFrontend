import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', loadComponent:()=>import('./login/login.component')},
    {path: 'registro', loadComponent: () => import('./registro/registro.component').then(m => m.RegistroComponent) },
    {path: 'inicio', loadComponent: () => import('./inicio/inicio.component').then(m => m.InicioComponent) },
    {path:'registrar', loadComponent:()=>import('./formulario-producto/formulario-producto.component')},
    {path:'editar/:id', loadComponent:()=>import('./formulario-producto/formulario-producto.component')},
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
