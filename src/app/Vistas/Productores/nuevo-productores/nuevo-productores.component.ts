import { error } from '@angular/compiler/src/util';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargarScriptsService } from 'src/app/Servicios/cargar-scripts.service';
import { ProductoresService } from 'src/app/Servicios/productores.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as Mapboxgl from 'mapbox-gl';
import { tipoProductores } from 'src/app/Clases/tipoProductores';
import { TipoProductoresService } from 'src/app/Servicios/tipoProductores.service';


@Component({
  selector: 'app-nuevo-productores',
  templateUrl: './nuevo-productores.component.html',
  styleUrls: ['./nuevo-productores.component.css']
})
export class NuevoProductoresComponent implements OnInit {

  idProveedores: any;
  igual: any;
  lat: any;
  lng: any;
  chb = false;

  listaTipo: any[] = [];

  tipoProductoresObj: tipoProductores[] = [];

  proved = new FormGroup({

    cedula: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    correo: new FormControl('',[Validators.required, Validators.email]),
    edad: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
    latitud: new FormControl('', Validators.required),
    paginaWeb: new FormControl(''),
    organizacion: new FormControl(''),
    detalleOrganizacion: new FormControl(''),
    discapacidad: new FormControl(''),
    detalleDiscapacidad: new FormControl(''),
    porcentajeDiscapacidad: new FormControl(''),
    idTipoProductores: new FormControl('', Validators.required)
  })

  constructor(
    private proveedores: ProductoresService,
    private router: Router,
    private ra: ActivatedRoute,
    private _cargarScripts: CargarScriptsService,
    private element: ElementRef,
    private tipoProductoresService: TipoProductoresService
  ) {
    this.idProveedores = this.ra.snapshot.params.id;
    _cargarScripts.carga(["mapa"]);
  }



    mapa: Mapboxgl.Map;


  ngOnInit(): void {
    (Mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-78.6613343, -1.4190227], 
      zoom: 15 
    });
    this.crearMarcador(-78.6613343, -1.4190227);
    if (this.idProveedores != null) {
      this.cargar(this.idProveedores);
    }
    this.llenarTProductores()
  }

  crearMarcador(lng: number, lat: number) {
    const marker = new Mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
    marker.on('dragend', () => {
      this.element.nativeElement.querySelector('#latitud').value = marker.getLngLat().lat;
      this.element.nativeElement.querySelector('#longitud').value = marker.getLngLat().lng;

      this.lat = marker.getLngLat().lat.toString();
      this.lng = marker.getLngLat().lng.toString();
    });
  }

  guardar(obj: any) {

    if (obj.organizacion == ""){
      obj.organizacion = false;
      obj.detalleOrganizacion =""
    }

    if (obj.discapacidad == ""){
      obj.discapacidad = false;
      obj.porcentajeDiscapacidad = 0;
    }


    if (this.validarCedula(this.proved.get('cedula').value) == false) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Cedula no valida',
        showConfirmButton: false,
        timer: 1500,
      })
      return;
    }

    if (this.idProveedores == null) {
      this.proveedores.nuevo(obj).subscribe(res => {

        this.router.navigate(['/menu/listarProveedor']);
        Swal.fire("Proveedores", "Registro guardado con exito", "success");

      }, error => {           

        Swal.fire("Productores","Ha ocurrido un error","warning");
        return
      
      })
    }
    else {
      obj.idProductores = this.idProveedores;
      obj.Cedula = this.proved.get('cedula')?.value;

      this.proveedores.editar(this.idProveedores, obj).subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Editado con exito',
          showConfirmButton: false,
          timer: 1500,
        })
        this.router.navigate(['/menu/listarProveedor']);

      }, error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ha ocurrido un error',
          showConfirmButton: false,
          timer: 1500,
        })
        this.router.navigate(['/menu/listarProveedor']);

      })
    }
  }


  // guardar(obj: any) {


  //   if (this.idProveedores == null){

  //     if (obj.organizacion == "") {
  //       obj.organizacion = false;
  //       obj.detalleOrganizacion = ""
  //     }
  
  //     if (obj.discapacidad == "") {
  //       obj.discapacidad = false;
  //       obj.porcentajeDiscapacidad = 0;
  //     }
      
  //     // if(this.proved.invalid){ Swal.fire("Productores","Todos los campos son requeridos","warning"); console.log(obj); return}

  //     this.proveedores.cedula(this.proved.get('cedula').value).subscribe(res=>{
         
  //       if (res==null)
  //       {
  //         Swal.fire("Usuarios","Cedula Incorrecta","warning");
  //         return
  //       }
    
  //       if (res==true)
  //       {
  //         Swal.fire("Usuarios","Esta cedula ya se encuentra registrada","warning");
  //         return
  //       }

  //       if (res==false)
  //       {


  //           this.proveedores.nuevo(obj).subscribe(res=>{

  //       this.router.navigate(['/menu/listarUsuario']);
  //       Swal.fire("Proveedores","Registro guardado con exito","success");
   
  //     },error=>alert("Error al insertar el registro"))
          
  //       }
  //     }, error=>{
  //       alert("error..."+error);
  //     });
  //   }
  // }

  validarCedula(_cedula: any) {
    var total = 0;
    var longitud = _cedula.length;  //// -> parametro o variable de la cedula
    var longcheck = longitud - 1;

    if (_cedula !== "" && longitud == 10) {
      for (let i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
          var aux = _cedula.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(_cedula.charAt(i)); // parseInt o concatenará en lugar de sumar
        }
      }
      total = total % 10 ? 10 - total % 10 : 0;

      if (_cedula.charAt(longitud - 1) == total) {
        return true;
      } else {
        return false;
      }
    }
   
    return false;
  }
  cargar(id: number) {

 

    this.proveedores.cargar(id).subscribe(res => {

      console.log(res);
      this.proved.patchValue(Object.assign({}, res));
    });

  }

  llenarTProductores() {
    this.tipoProductoresService.listar().subscribe(res => {
      this.listaTipo = res;
    })
  }

  abrir(){
    alert("hola");
  }
}
