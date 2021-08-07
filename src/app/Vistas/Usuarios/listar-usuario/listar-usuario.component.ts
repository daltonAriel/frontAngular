import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/Clases/usuarios';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  clienteObj:Usuarios[]=[];
  spinner:Number=0;

  constructor(
    private usuarios : UsuariosService
  ) { }

  ngOnInit(): void {
    this.listar();  
  }

  listar()
  {
    this.spinner=1;
  
    this.usuarios.listar().subscribe(res=>{
      this.clienteObj=res;
      console.log(this.clienteObj)
      this.spinner=0;
    },error=>alert("Error al listar"))
  }

  eliminar(id:any)
  {
    Swal.fire({
      title: '¿Esta seguro que desea eliminar?',
      text: " este registro se eliminará permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarios.eliminar(id).subscribe(res=>{

          this.listar();

          Swal.fire('Usuarios', 'Registro Eliminado exitosamente ', 'success');

        },error=>alert("error al eliminar el registro"))
    
      }
    })
  }
}
