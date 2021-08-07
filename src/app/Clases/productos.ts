import { Categorias } from './categorias';
export interface Productos{
  idProductos: number;
  nombreProducto: string;
  unidad: string;
  descripcion: string;
  talla: string;
  idCategorias: number;
  categorias:Categorias;

}
