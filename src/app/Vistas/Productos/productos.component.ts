import { Productos } from 'src/app/Clases/productos';
import { tipoProductores } from './../../Clases/tipoProductores';
import { Component, OnInit } from '@angular/core';
import {Categorias} from '../../Clases/categorias';
import {CategoriaService} from '../../Servicios/categorias.service';
import {Proveedores} from '../../Clases/proveedores';


import {TipoProductoresService} from '../../Servicios/tipoProductores.service';

import {ProductosService} from '../../Servicios/productos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productoObj: Productos[] = [];
  categoriaObj: Categorias[] = [];
  categoriaFiltradoObj: Categorias[] = [];
  tipoProductoresObj: tipoProductores[] = [];


  tallaCheck:boolean = false;
  spinner:number=0;

  //NUEVO 
  tipoProductorIdNew:number = 0;
  categoriaIdNew:number = 0;

  nombreNew:string;
  unidadNew:string;
  descripcionNew:string;
  tallaNew:string = null;

  //ACTUALIZAR
  IDProducto:number = 0;
  nombreUpdate:string;
  unidadUpdate:string;
  descripcionUpdate:string;
  tallaUpdate:string = null;


  

  constructor(private productosService:ProductosService, private modalService: NgbModal, private tipoProductoresService:TipoProductoresService, private categoriaService:CategoriaService) { }

  ngOnInit(): void {
    this.mostrar();
    this.llenarTipoProductores();
    this.llenarCategorias();
  }

  mostrar() {
    this.productosService.listarProductos().subscribe(res => {
      this.productoObj = res;
    }, error => alert("Error al listar Productos"));
  }

  llenarCategorias()
  {
    this.categoriaService.listar().subscribe(res => {
      this.categoriaObj = res;
    }, error => alert("Error al listar Categorias"));
  }

  llenarTipoProductores()
  {
    this.tipoProductoresService.listar().subscribe(res => {
      this.tipoProductoresObj = res;
    }, error =>alert("Error al listar los Tipos de Productores"));
  }

  filtrarCategorias()
  {
    this.tallaNew=null;
    this.tallaUpdate=null;
    this.categoriaIdNew = 0;
    this.categoriaFiltradoObj = [];
    for (let i of this.categoriaObj)
    {
      if(i.idTipoProductores == this.tipoProductorIdNew)
      {
        this.categoriaFiltradoObj.push(i);
      }
    }
    this.comprobarTalla();
  }


  //funcion que activara o desactivara la casilla de texto de TALLA dependiodo si es TRUE O FALSE
  comprobarTalla()
  {
    let x:tipoProductores;
    for(let i of this.tipoProductoresObj)
    {
      if(i.idTipoProductores == this.tipoProductorIdNew)
      {
        x=i;
      }
    }
    if(x.nombre == 'ARTESANO' || x.nombre == 'artesano' || x.nombre == 'ARTESANOS' || x.nombre == 'artesanos' || x.nombre == 'Artesanos' || x.nombre == 'Artesano'){
      this.tallaCheck = true;
    }
    else{
      this.tallaCheck = false;
    }
  }


  async guardar(){
    let objProd:Productos ={
      idProductos:undefined,
      nombreProducto : this.nombreNew,
      unidad: this.unidadNew,
      descripcion: this.descripcionNew,
      talla : this.tallaNew,
      idCategorias: this.categoriaIdNew,
      categorias:null
    }
    if(this.tallaCheck == true) //si el campo talla va vacio lanzar una alerta (PENDIENTE!)
    {
    await  this.productosService.nuevoProducto(objProd).subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Guardado con exito',
          showConfirmButton: false,
          timer: 1500,
        })
      }, error => {console.log('Error al guardar')},
      () =>{this.mostrar()}
      )
    }
    else //El campo Talla deberia ir null sin lanzar ninguna alerta (PENDIENTE!)
    {
      objProd.talla = null;
      this.productosService.nuevoProducto(objProd).subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Guardado con exito',
          showConfirmButton: false,
          timer: 1500,
        })
      }, error => {console.log('Error al guardar')},
      () =>{this.mostrar()}
      )
    }

  }

  llenarCampos(item:Productos){
    console.log(this.categoriaObj);
    
    if(item.talla == null || item.talla == undefined){
      this.tallaCheck = false;
    }
    else{
      this.tallaCheck = true;
    }
    
    let id_cat:number = item.idCategorias;
    console.log(this.categoriaObj);
    
    for(let i of this.categoriaObj){
      if(i.idCategorias == id_cat){
        console.log(i);
        this.tipoProductorIdNew = i.idTipoProductores;
        break;
      }
    }
    
    this.filtrarCategorias();
    this.categoriaIdNew = id_cat;

    console.log(this.tipoProductorIdNew);
    console.log(this.categoriaIdNew);


    this.IDProducto = item.idProductos;
    this.nombreUpdate = item.nombreProducto;
    this.unidadUpdate = item.unidad;
    this.descripcionUpdate = item.descripcion;
    this.tallaUpdate = item.talla;
  }


  actualizarProd(){


  


    let objProd:Productos ={
      idProductos:this.IDProducto,
      nombreProducto : this.nombreUpdate,
      unidad: this.unidadUpdate,
      descripcion: this.descripcionUpdate,
      talla : this.tallaUpdate,
      idCategorias: this.categoriaIdNew,
      categorias:null
      
    }
    if(this.tallaCheck == true) //si el campo talla va vacio lanzar una alerta (PENDIENTE!)
    {
      this.productosService.editarProducto(objProd.idProductos,objProd).subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Actualizacion exitosa',
          showConfirmButton: false,
          timer: 1500,
        })
      }, error => {console.log('Error al actualizar')},
      () =>{this.mostrar()}
      )
    }
    else //El campo Talla deberia ir null sin lanzar ninguna alerta (PENDIENTE!)
    {
      objProd.talla = null;
      this.productosService.editarProducto(objProd.idProductos,objProd).subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Actualizacion exitosa',
          showConfirmButton: false,
          timer: 1500,
        })
      }, error => {console.log('Error al actualizar')},
      () =>{this.mostrar()}
      )
    }

  }

  limpiar(){
    this.nombreNew = null;
    this.unidadNew = null;
    this.descripcionNew = null;
    this.tallaNew = null;
    this.tallaCheck = false;
  }


  elimiarProd(id:any){
    this.productosService.eliminarProducto(id).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Eliminacion exitosa',
        showConfirmButton: false,
        timer: 1500,
      })
    }, error => {console.log('Error al eliminar')},
    () =>{this.mostrar()}
    )
  }

  openModal(content) {
    this.limpiar();
    this.modalService.open(content);
    this.tipoProductorIdNew = 0;
    this.categoriaIdNew = 0;
  }

}



  