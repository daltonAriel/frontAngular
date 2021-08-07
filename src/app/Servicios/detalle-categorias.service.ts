import { Productos } from './../Clases/productos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { detalleCategorias } from '../Clases/detalleProductos';
import { Productores } from '../Clases/productores';

@Injectable({
  providedIn: 'root'
})
export class DetalleCategoriasService {

  api="https://localhost:44349/api/detalleCategorias/";
  apiProductor="https://localhost:44349/api/productores/";
  apiProductos="https://localhost:44349/api/productos/";

  constructor(
    
    private http:HttpClient

  ) {}


  nuevo(detalle:any)

  {

    return this.http.post(this.api,detalle);
  }

  listar():Observable<detalleCategorias[]>

  {
    return this.http.get<detalleCategorias[]>(this.api);
  }

  listarProductor():Observable<Productores[]>

  {
    return this.http.get<Productores[]>(this.apiProductor);
  }




  listarProductos():Observable<Productos[]>

  {
    return this.http.get<Productos[]>(this.apiProductos);
  }


  eliminar(idDetalle:any)

  {


    return this.http.delete(this.api + idDetalle);
  }


  cargar(idDetalle: number): Observable<detalleCategorias[]> {

    return this.http.get<detalleCategorias[]>(this.api + idDetalle);
  }


  editar(idDetalle: number, detalleCategorias: detalleCategorias): Observable<detalleCategorias[]> {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           


    return this.http.put<detalleCategorias[]>(this.api + idDetalle, detalleCategorias);

  }

}
