import { tipoProductores } from './../Clases/tipoProductores';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TipoProductoresService {
  api="https://localhost:44349/api/tipoProductores/";
  constructor(
    private http:HttpClient
  ) { }

  listar():Observable<[tipoProductores]>
  {
    return this.http.get<[tipoProductores]>(this.api);
  }

}
