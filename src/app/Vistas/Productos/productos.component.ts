import { Productos } from 'src/app/Clases/productos';
import { tipoProductores } from './../../Clases/tipoProductores';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Categorias } from '../../Clases/categorias';
import { CategoriaService } from '../../Servicios/categorias.service';
import { Proveedores } from '../../Clases/proveedores';

import { TipoProductoresService } from '../../Servicios/tipoProductores.service';

import { ProductosService } from '../../Servicios/productos.service';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  ///
  checkProductor: boolean = false;
  checkCategoria: boolean = false;
  checkNombre: boolean = false;
  checkUnidad: boolean = false;
  checkTalla: boolean = false;
  ///

  busqueda;
  modalReference: NgbModalRef;
  closeResult: string;
  productoObj: Productos[] = [];
  categoriaObj: Categorias[] = [];
  categoriaFiltradoObj: Categorias[] = [];
  tipoProductoresObj: tipoProductores[] = [];

  razas = ['Holstein Friesianz', 'Brow Swiss', 'Jersey', 'F1 o Mestiza'];
  entregas = ['Centro de acopio', 'Recolector', 'Consumo'];

  tallaCheck: boolean = false;
  razaCheck: boolean = false;
  spinner: number = 0;

  //NUEVO
  tipoProductorIdNew: number = 0;
  categoriaIdNew: number = 0;

  nombreNew: string;
  unidadNew: string;
  descripcionNew = 0; //raza
  entregaNew = 0;
  tallaNew = '';

  //ACTUALIZAR
  IDProducto: number = 0;
  nombreUpdate: string;
  unidadUpdate: string;
  tallaUpdate: string = null;

  constructor(
    private productosService: ProductosService,
    private modalService: NgbModal,
    private tipoProductoresService: TipoProductoresService,
    private categoriaService: CategoriaService,
    private elementRef: ElementRef
  ) {

  }

  ngOnInit(): void {
    this.mostrar();
    this.llenarTipoProductores();
    this.llenarCategorias();
  }

  mostrar() {
    this.productosService.listarProductos().subscribe(
      (res) => {
        this.productoObj = res;
      },
      (error) => alert('Error al listar Productos')
    );
  }

  llenarCategorias() {
    this.categoriaService.listar().subscribe(
      (res) => {
        this.categoriaObj = res;
      },
      (error) => alert('Error al listar Categorias')
    );
  }

  llenarTipoProductores() {
    this.tipoProductoresService.listar().subscribe(
      (res) => {
        this.tipoProductoresObj = res;
      },
      (error) => alert('Error al listar los Tipos de Productores')
    );
  }

  filtrarCategorias(event: any) {
    this.tallaNew = null;
    this.tallaUpdate = null;
    this.categoriaIdNew = 0;
    this.categoriaFiltradoObj = [];
    for (let i of this.categoriaObj) {
      if (i.idTipoProductores == this.tipoProductorIdNew) {
        this.categoriaFiltradoObj.push(i);
      }
    }
    this.comprobarTalla();
    // this.comprobarRaza();
  }

  //funcion que activara o desactivara la casilla de texto de TALLA dependiodo si es TRUE O FALSE
  comprobarTalla() {
    let x: tipoProductores;
    for (let i of this.tipoProductoresObj) {
      if (i.idTipoProductores == this.tipoProductorIdNew) {
        x = i;
      }
    }
    if (
      x.nombre == 'ARTESANO' ||
      x.nombre == 'artesano' ||
      x.nombre == 'ARTESANOS' ||
      x.nombre == 'artesanos' ||
      x.nombre == 'Artesanos' ||
      x.nombre == 'Artesano'
    ) {
      this.tallaCheck = true;
    } else {
      this.tallaCheck = false;
    }
  }
  //funcion que activara o desactivara la casilla de texto de RAZAS Y ENTREGA dependiodo si es TRUE O FALSE
  comprobarRaza(event: any) {
    if (this.categoriaIdNew == 0 || this.categoriaIdNew == null) { this.razaCheck = false }
    let x: Categorias;
    for (let i of this.categoriaFiltradoObj) {
      if (i.idCategorias == this.categoriaIdNew) {
        x = i;
      }
    }
    if (
      x.descripcion == 'LECHE' ||
      x.descripcion == 'leche' ||
      x.descripcion == 'Leche'
    ) {
      this.razaCheck = true;
    } else {
      this.razaCheck = false;
    }
  }

  async guardar() {
    ///validar selects

    if (
      (this.categoriaIdNew == 0 ||
        this.categoriaIdNew == null) && (
        this.tipoProductorIdNew == 0 ||
        this.tipoProductorIdNew == null)
    ) {
      this.checkProductor = true;
      this.checkCategoria = true;
      return;
    }
    else {
      this.checkProductor = false;
      this.checkCategoria = false;
    }
    if (
      this.tipoProductorIdNew == 0 ||
      this.tipoProductorIdNew == null
    ) {
      this.checkProductor = true;
      return;
    }
    else {
      this.checkProductor = false;
    }
    if (
      this.categoriaIdNew == 0 ||
      this.categoriaIdNew == null
    ) {
      this.checkCategoria = true;
      return;
    }
    else {
      this.checkCategoria = false;
    }
    //validar selects fin


    let objProd: Productos = {
      idProductos: undefined,
      nombreProducto: this.nombreNew,
      unidad: this.unidadNew,
      descripcion: this.razas[this.descripcionNew],
      talla: this.tallaNew,
      idCategorias: this.categoriaIdNew,
      categorias: null,
      entrega: this.entregas[this.entregaNew],
    };
    if (this.razaCheck == false) {
      objProd.descripcion = null;
      objProd.entrega = null;
    }


    ///validar nombre unidad
    if (
      (objProd.nombreProducto == '' ||
        objProd.nombreProducto == null) &&
      (objProd.unidad == '' ||
        objProd.unidad == null)
    ) {
      this.checkUnidad = true;
      this.checkNombre = true;
      return;
    }
    else {
      this.checkUnidad = false;
      this.checkNombre = false;
    }

    if (
      objProd.nombreProducto == '' ||
      objProd.nombreProducto == null
    ) {
      this.checkNombre = true;
      return;
    }
    else {
      this.checkNombre = false;
    }

    if (
      objProd.unidad == '' ||
      objProd.unidad == null
    ) {
      this.checkUnidad = true;
      return;
    }
    else {
      this.checkUnidad = false;
    }
    /////



    if (this.tallaCheck == true) {
      objProd.descripcion = null;
      objProd.entrega = null;
      if (objProd.talla == '' || objProd.talla == null) {
        this.checkTalla = true;
        return;
      }
      else {
        this.checkTalla = false;
      }
      await this.productosService.nuevoProducto(objProd).subscribe(
        (res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Guardado con exito',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log('Error al guardar');
        },
        () => {
          this.mostrar();
        }
      );
    } else {
      objProd.talla = null;
      this.productosService.nuevoProducto(objProd).subscribe(
        (res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Guardado con exito',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log('Error al guardar');
        },
        () => {
          this.mostrar();
        }
      );
    }

    let x = this.elementRef.nativeElement.querySelector('#cancelar');
    x.click();
  }

  llenarCampos(item: Productos) {
    this.IDProducto = 0;
    this.nombreUpdate = null;
    this.unidadUpdate = null;
    this.descripcionNew = 0;
    this.entregaNew = 0;
    this.tallaUpdate = null;

    if (item.talla == null || item.talla == undefined || item.talla == '') {
      this.tallaCheck = false;
    } else {
      this.tallaCheck = true;
    }

    let id_cat: number = item.idCategorias;

    for (let i of this.categoriaObj) {
      if (i.idCategorias == id_cat) {
        this.tipoProductorIdNew = i.idTipoProductores;
        break;
      }
    }
    this.filtrarCategorias('');

    this.categoriaIdNew = id_cat;

    this.IDProducto = item.idProductos;
    this.nombreUpdate = item.nombreProducto;
    this.unidadUpdate = item.unidad;
    for (let i = 0; i < this.razas.length; i++) {
      if (this.razas[i] == item.descripcion) {
        this.descripcionNew = i;
        break;
      }
    }
    for (let i = 0; i < this.entregas.length; i++) {
      if (this.entregas[i] == item.entrega) {
        this.entregaNew = i;
        break;
      }
    }
    this.tallaUpdate = item.talla;

    this.comprobarRaza('');

  }

  actualizarProd() {
    ///validar selects
    if (
      (this.categoriaIdNew == 0 ||
        this.categoriaIdNew == null) && (
        this.tipoProductorIdNew == 0 ||
        this.tipoProductorIdNew == null)
    ) {
      this.checkProductor = true;
      this.checkCategoria = true;
      return;
    }
    else {
      this.checkProductor = false;
      this.checkCategoria = false;
    }

    if (
      this.tipoProductorIdNew == 0 ||
      this.tipoProductorIdNew == null
    ) {
      this.checkProductor = true;
      return;
    }
    else {
      this.checkProductor = false;
    }

    if (
      this.categoriaIdNew == 0 ||
      this.categoriaIdNew == null
    ) {
      this.checkCategoria = true;
      return;
    }
    else {
      this.checkCategoria = false;
    }
    //validar selects fin

    let objProd: Productos = {
      idProductos: this.IDProducto,
      nombreProducto: this.nombreUpdate,
      unidad: this.unidadUpdate,
      descripcion: this.razas[this.descripcionNew],
      talla: this.tallaUpdate,
      idCategorias: this.categoriaIdNew,
      categorias: null,
      entrega: this.entregas[this.entregaNew],
    };

    if (this.razaCheck == false) {
      objProd.descripcion = null;
      objProd.entrega = null;
    }



    ///validar nombre unidad
    if (
      (objProd.nombreProducto == '' ||
        objProd.nombreProducto == null) &&
      (objProd.unidad == '' ||
        objProd.unidad == null)
    ) {
      this.checkUnidad = true;
      this.checkNombre = true;
      return;
    }
    else {
      this.checkUnidad = false;
      this.checkNombre = false;
    }

    if (
      objProd.nombreProducto == '' ||
      objProd.nombreProducto == null
    ) {
      this.checkNombre = true;
      return;
    }
    else {
      this.checkNombre = false;
    }

    if (
      objProd.unidad == '' ||
      objProd.unidad == null
    ) {
      this.checkUnidad = true;
      return;
    }
    else {
      this.checkUnidad = false;
    }
    /////




    if (this.tallaCheck == true) {
      objProd.descripcion = null;
      objProd.entrega = null;
      if (objProd.talla == '' || objProd.talla == null) {
        this.checkTalla = true;
        return;
      }
      else {
        this.checkTalla = false;
      }

      this.productosService
        .editarProducto(objProd.idProductos, objProd)
        .subscribe(
          (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Actualizacion exitosa',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (error) => {
            console.log('Error al actualizar');
          },
          () => {
            this.mostrar();
          }
        );
    } //El campo Talla deberia ir null sin lanzar ninguna alerta (PENDIENTE!)
    else {
      objProd.talla = null;
      this.productosService
        .editarProducto(objProd.idProductos, objProd)
        .subscribe(
          (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Actualizacion exitosa',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (error) => {
            console.log('Error al actualizar');
          },
          () => {
            this.mostrar();
          }
        );
    }
    let x = this.elementRef.nativeElement.querySelector('#cancelar2');
    x.click();
  }

  limpiar() {
    this.nombreNew = null;
    this.unidadNew = null;
    this.descripcionNew = 0;
    this.entregaNew = 0;
    this.tipoProductorIdNew = 0;
    this.categoriaIdNew = 0;
    this.tallaNew = null;
    this.tallaCheck = false;
    this.razaCheck = false;
  }

  elimiarProd(id: any) {

alert();


    Swal.fire({
      title: '¿Esta seguro que desea eliminar?',
      text: " este registro se eliminará permanentemente",
      icon: 'warning',
      confirmButtonColor: "#29A05B",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {


        this.productosService.eliminarProducto(id).subscribe(
          (res) => {
    
    
    
            Swal.fire('Productos', 'Registro Eliminado exitosamente ', 'success');
            this.mostrar();
    
    
    
    
      
          },
       
        );

    

    
      }
    },error=>{
       
      alert("Error al eliminar");

    });





  }

  openModal(content) {
    this.checkProductor = false;
    this.checkCategoria = false;
    this.checkNombre = false;
    this.checkUnidad = false;
    this.checkTalla = false;

    this.limpiar();
    this.tipoProductorIdNew = 0;
    this.categoriaIdNew = 0;
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  errorDatos() {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Porfavor llene todos los campos',
      showConfirmButton: false,
      timer: 3000,
    });
  }



}
