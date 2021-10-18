import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorias } from '../Clases/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  api="http://raphaelrod-001-site1.itempurl.com/api/categorias/";

  constructor(private http:HttpClient) { }

/*
  nuevo(categoria:any)
  {
    return this.http.post(this.api,categoria);
  }
*/

  listar():Observable<Categorias[]>
  {
    return this.http.get<Categorias[]>(this.api);
  }
/*
  eliminar(idCliente:any)
  {
    return this.http.delete(this.api + idCliente);
  }


  cargar(idCategoria: number): Observable<Categorias[]> {

    return this.http.get<Categorias[]>(this.api + idCategoria);
  }



  editar(idCategoria: number, categoria: Categorias): Observable<Categorias[]> {
    return this.http.put<Categorias[]>(this.api + idCategoria, categoria);
  }
  */
}
