import { Component, OnInit } from '@angular/core';
import { Categorias } from '../../../Clases/categorias';
import { CategoriaService } from '../../../Servicios/categorias.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})



   export class ListarCategoriaComponent implements OnInit {

    
  categoriaObj: Categorias[] = [];
  closeResult: string;
  NewDetalleCategoria;
  UpdateDetalleCategoria;
  IDCategoria;
  spinner:number=0;

  constructor(private categoriaService: CategoriaService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar() {
    this.spinner=1;
    this.categoriaService.listar().subscribe(res => {
      this.categoriaObj = res;
      this.spinner=0;
    }, error => {alert("Error al listar");
    this.spinner=0;
   
  
  });
  }

  /*guardar() {
    let datoCategoria: Categorias = {
      detalle: this.NewDetalleCategoria,
      idCategorias: undefined
    };
    this.categoriaService.nuevo(datoCategoria).subscribe(res => {
      this.mostrar();
      this.NewDetalleCategoria = "";
    }, error => alert("Error al insertar el registro"));
  }*/

  cargar(item: Categorias) {
    this.IDCategoria = item.idCategorias;
    //this.UpdateDetalleCategoria = item.detalle;
  }

  /*editar() {
    let datoCategoria: Categorias = {
      //detalle: this.UpdateDetalleCategoria,
      idCategorias: this.IDCategoria
    };
    this.categoriaService.editar(this.IDCategoria, datoCategoria).subscribe(res => {
      this.mostrar();
      this.UpdateDetalleCategoria = "";
    }, error => alert("Error al insertar el registro"));
  }*/


  /*
  eliminar(id: any) {
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

        this.categoriaService.eliminar(id).subscribe(res => {
          this.mostrar();
          Swal.fire('Clientes', 'Registro Eliminado exitosamente ', 'success');
        }, error => alert("error al eliminar el registro"));

      }
    });
  }




  //MODAL
  openModal(content) {
    this.modalService.open(content, { size: 'sm' });
  }
*/

}
