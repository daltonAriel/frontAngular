import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../Clases/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  api="https://localhost:44349/api/usuarios/";
  constructor(
    private http:HttpClient
  ) { }

  login(usuario:any,contrasena:any)
  {
    const params =new HttpParams()
    .set('usu',usuario)
    .set('contra',contrasena)

    return this.http.get(this.api+"login",{params})
  }

  nuevo(usuario:any)
  {
    return this.http.post(this.api,usuario);
  }

  listar():Observable<Usuarios[]>
  {
    return this.http.get<Usuarios[]>(this.api);
  }

  eliminar(IdUsuario:any)
  {
    return this.http.delete(this.api + IdUsuario);
  }

  cargar(IdUsuario: number): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.api + IdUsuario);
  }

  editar(IdUsuario: number, usuarios: Usuarios): Observable<Usuarios[]>
  {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    return this.http.put<Usuarios[]>(this.api + IdUsuario, usuarios);
  }

   cedula(cedula:any)
  {
    const params =new HttpParams()
    .set('cedula',cedula)
    return this.http.get(this.api+'cedulaCliente',{params});

  }
}
