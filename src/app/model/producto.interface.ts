import {Marca} from "./marca.interface";

export interface Producto{
    id: number,
    nombreProd: string,
    descripcionProd: string,
    precioProd: DoubleRange,
    imagenUrl: string,
    marca: Marca
}