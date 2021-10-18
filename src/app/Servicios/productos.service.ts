import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorias } from '../Clases/categorias';
import { Productos } from '../Clases/productos';
import { Proveedores } from '../Clases/proveedores';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
    apiCategoria="http://raphaelrod-001-site1.itempurl.com/api/categorias/";
    apiProducto="http://raphaelrod-001-site1.itempurl.com/api/productos/";
    apiProveedor="http://raphaelrod-001-site1.itempurl.com/api/proveedores/";
  

  //apiCategoria="https://apinuevo.azurewebsites.net/api/categorias/";
  //apiProducto="https://apinuevo.azurewebsites.net/api/productos/";
  //apiProveedor="https://apinuevo.azurewebsites.net/api/proveedores/";

  constructor(private http:HttpClient) { }


  nuevoProducto(producto:any)
  {
    return this.http.post(this.apiProducto,producto);
  }



  listarProductos():Observable<Productos[]>
  {
    return this.http.get<Productos[]>(this.apiProducto);
  }



  eliminarProducto(idProducto:any)
  {
    return this.http.delete(this.apiProducto + idProducto);
  }


  //cargar(idCategoria: number): Observable<Categorias[]> {
  //
  //  return this.http.get<Categorias[]>(this.apiProducto + idCategoria);
  //}



  editarProducto(idProducto: number, producto: Productos): Observable<Productos[]> {
    return this.http.put<Productos[]>(this.apiProducto + idProducto, producto);
  }
}
