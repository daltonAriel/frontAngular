import { Proveedores } from './../Clases/proveedores';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  // api="https://localhost:44382/api/proveedores/";
  
  api="https://apinuevo.azurewebsites.net/api/proveedores/";
  constructor(private http:HttpClient) { }

  login(usuario:any,contrasena:any)
  {

    const params =new HttpParams()
    .set('usu',usuario)
    .set('contra',contrasena)

    return this.http.get(this.api+"login",{params})

  }

  nuevo(proveedor:any)

  {

    return this.http.post(this.api,proveedor);
  }

  listar():Observable<Proveedores[]>

  {
    return this.http.get<Proveedores[]>(this.api);
  }

  eliminar(idProveedor:any)

  {


    return this.http.delete(this.api + idProveedor);
  }


  cargar(idProveedor: number): Observable<Proveedores[]> {

    return this.http.get<Proveedores[]>(this.api + idProveedor);
  }


  editar(idProveedor: number, proveedores: Proveedores): Observable<Proveedores[]> {


    return this.http.put<Proveedores[]>(this.api + idProveedor, proveedores);

  }
}


