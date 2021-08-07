import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productores } from '../Clases/productores';

@Injectable({
  providedIn: 'root'
})
export class ProductoresService {

  api="https://localhost:44349/api/productores/";

  constructor(
    private http:HttpClient
  ) { }

  nuevo(productor:any)
  {
    return this.http.post(this.api,productor);
  }

  listar():Observable<Productores[]>
  {
    return this.http.get<Productores[]>(this.api);
  }

  eliminar(IdProductor:any)
  {
    return this.http.delete(this.api + IdProductor);
  }

  cargar(IdProductor: number): Observable<Productores[]> {
    return this.http.get<Productores[]>(this.api + IdProductor);
  }

  editar(IdProductor: number, usuarios: Productores): Observable<Productores[]>
  {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    return this.http.put<Productores[]>(this.api + IdProductor, usuarios);
  }

   cedula(cedula:any)
  {
    const params =new HttpParams()
    .set('cedula',cedula)
    return this.http.get(this.api+'cedulaCliente',{params});

  }
}
