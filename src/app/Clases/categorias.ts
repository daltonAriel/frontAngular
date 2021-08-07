import { tipoProductores } from './tipoProductores';
export interface Categorias
{
  idCategorias:number,
  nombre:string;
  descripcion:string;
  idTipoProductores:number;
  tipoProductores:tipoProductores
}
  