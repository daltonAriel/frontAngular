import { ProveedoresService } from './../../../Servicios/proveedores.service';
import { Proveedores } from './../../../Clases/proveedores';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.css']
})
export class ListarProveedorComponent implements OnInit {


  proveeObj:Proveedores[]=[];
  spinner:number=0;
  constructor(private proveedores: ProveedoresService) { }

  ngOnInit(): void {
    this.listar();
  }


  listar()
  {

     this.spinner=1;
  


     
    this.proveedores.listar().subscribe(res=>{
      this.proveeObj=res;

      this.spinner=0;


    },error=>{

     alert("Error al conectarse");
     this.spinner=1;

    })
    

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

        this.proveedores.eliminar(id).subscribe(res=>{

          this.listar();

          Swal.fire('Proveedores', 'Registro Eliminado exitosamente ', 'success');

        },error=>alert("error al eliminar el registro"))





      }
    })






  }






}
