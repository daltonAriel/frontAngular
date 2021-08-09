import { Categorias } from './categorias';
export interface Productos{
  idProductos: number;
  nombreProducto: string;
  unidad: string;
  descripcion: string; //raza
  entrega: string

  talla: string;
  idCategorias: number;
  categorias:Categorias;

}
