import { ClientesService } from './../../../Servicios/clientes.service';
import { Component, OnInit } from '@angular/core';
import { Clientes } from 'src/app/Clases/clientes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  clienteObj:Clientes[]=[];
  spinner:Number=0;


  constructor(private clientes:ClientesService) { }

  ngOnInit(): void {
    
    this.listar();
  }

  listar()
  {


    this.spinner=1;


   
    this.clientes.listar().subscribe(res=>{


      this.clienteObj=res;

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

        this.clientes.eliminar(id).subscribe(res=>{

          this.listar();

          Swal.fire('Usuarios', 'Registro Eliminado exitosamente ', 'success');

        },error=>alert("error al eliminar el registro"))
    
      



      }
    })






  }


}
