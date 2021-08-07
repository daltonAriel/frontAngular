import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clientes } from '../Clases/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
 api="https://localhost:44349/api/clientes/";
//api="https://apinuevo.azurewebsites.net/api/clientes/";
  constructor(private http:HttpClient) { }

  login(usuario:any,contrasena:any)
  {

    const params =new HttpParams()
    .set('usu',usuario)
    .set('contra',contrasena)

    return this.http.get(this.api+"login",{params})

  }

  nuevo(cliente:any)

  {

    return this.http.post(this.api,cliente);
  }

  listar():Observable<Clientes[]>

  {
    return this.http.get<Clientes[]>(this.api);
  }

  eliminar(idCliente:any)

  {


    return this.http.delete(this.api + idCliente);
  }


  cargar(idCliente: number): Observable<Clientes[]> {

    return this.http.get<Clientes[]>(this.api + idCliente);
  }


  editar(idcliente: number, clientes: Clientes): Observable<Clientes[]> {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           


    return this.http.put<Clientes[]>(this.api + idcliente, clientes);

  }

   cedula(cedula:any)
  {

    const params =new HttpParams()
    .set('cedula',cedula)
    return this.http.get(this.api+'cedulaCliente',{params});

  }
}
