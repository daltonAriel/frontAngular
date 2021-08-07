import { Component, OnInit } from '@angular/core';
import { Productores } from 'src/app/Clases/productores';
import { ProductoresService } from 'src/app/Servicios/productores.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-productores',
  templateUrl: './listar-productores.component.html',
  styleUrls: ['./listar-productores.component.css']
})
export class ListarProductoresComponent implements OnInit {

  proveeObj: Productores[]=[];
  spinner:number=0;

  constructor(
    private productor : ProductoresService
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar()
  {
    this.spinner=1;
    this.productor.listar().subscribe(res=>{
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

        this.productor.eliminar(id).subscribe(res=>{

          this.listar();

          Swal.fire('Proveedores', 'Registro Eliminado exitosamente ', 'success');

        },error=>alert("error al eliminar el registro"))
      }
    })
  }
}
