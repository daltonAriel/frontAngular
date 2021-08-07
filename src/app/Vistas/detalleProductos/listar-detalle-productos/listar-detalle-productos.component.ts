import { ProductosService } from './../../../Servicios/productos.service';
import { detalleCategorias } from './../../../Clases/detalleProductos';
import { NuevoDetalleProductosComponent } from './../nuevo-detalle-productos/nuevo-detalle-productos.component';
import { Component, OnInit } from '@angular/core';
import { DetalleCategoriasService } from 'src/app/Servicios/detalle-categorias.service';
import { Productores } from 'src/app/Clases/productores';
import { Productos } from 'src/app/Clases/productos';
import { ProductoresService } from 'src/app/Servicios/productores.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-detalle-productos',
  templateUrl: './listar-detalle-productos.component.html',
  styleUrls: ['./listar-detalle-productos.component.css']
})
export class ListarDetalleProductosComponent implements OnInit {


  detalleCategoriaList: detalleCategorias[] = [];

  spinner: number = 0;



  constructor(private detalleCategoria: DetalleCategoriasService) { }

  ngOnInit(): void {

    this.listar();

  }

  listar() {

    this.spinner = 1;

    this.detalleCategoria.listar().subscribe(res => {

      this.detalleCategoriaList = res;


  



      this.spinner = 0;


    }, error => {

      alert(error);

      this.spinner = 1;

    });





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

        this.detalleCategoria.eliminar(id).subscribe(res=>{

          this.listar();

          Swal.fire('Producto', 'Registro Eliminado exitosamente ', 'success');

        },error=>alert("error al eliminar el registro"))





      }
    })






  }




}
