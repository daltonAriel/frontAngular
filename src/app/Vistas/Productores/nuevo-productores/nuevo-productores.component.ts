import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargarScriptsService } from 'src/app/Servicios/cargar-scripts.service';
import { ProductoresService } from 'src/app/Servicios/productores.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as Mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-nuevo-productores',
  templateUrl: './nuevo-productores.component.html',
  styleUrls: ['./nuevo-productores.component.css']
})
export class NuevoProductoresComponent implements OnInit {

  idProveedores: any;
  igual: any;
  geo: any;

  proved = new FormGroup({

    cedula: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('',Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    correo: new FormControl('',  Validators.email),
    edad : new FormControl('', Validators.required),
    sexo : new FormControl('', Validators.required),
    cargo : new FormControl('', Validators.required),
    longitud : new FormControl (),
    latitud : new FormControl (),
    web :new FormControl (),
    organizacion :new FormControl (),
    detalleOrganizacion :new FormControl (),
    discapacidad :new FormControl (),
    detalleDiscapacidad :new FormControl (),
    porcentajeDiscapacidad :new FormControl ()
  })

  constructor(
    private proveedores: ProductoresService, 
    private router: Router, 
    private ra: ActivatedRoute,
    private _cargarScripts : CargarScriptsService
  ) { 
    this.idProveedores = this.ra.snapshot.params.id;
    _cargarScripts.carga(["mapa"]);
  }

  mapa : Mapboxgl.Map;
  ngOnInit(): void {

    (Mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-78.6613343, -1.4190227], // starting position
      zoom: 13 // starting zoom
    });
    this.crearMarcador(-78.6613343, -1.4190227)
    if (this.idProveedores != null) {
      this.cargar(this.idProveedores);
    }
  }

  crearMarcador(lng: number , lat: number){
    const marker = new Mapboxgl.Marker({
      draggable: true
    })
    .setLngLat([lng, lat])
    .addTo(this.mapa);
    marker.on('dragend', ()=>{
      this.geo = marker.getLngLat();
      console.log(marker.getLngLat());
    });
  }

  guardar(obj: any){
    if(this.validarCedula(this.proved.get('cedula').value) == false){
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
      }, error =>  
      console.log(obj, error) )
    } 
    else {
      obj.idProveedor = this.idProveedores;
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

      }, error => console.log(obj))
    }
  }

  validarCedula(_cedula:any)
  {
    var total = 0;
    var longitud = _cedula.length;  //// -> parametro o variable de la cedula
    var longcheck = longitud - 1;

    if (_cedula !== "" && longitud == 10)
    {
      for(let i = 0; i < longcheck; i++)
      {
        if (i%2 === 0)
        {
          var aux = _cedula.charAt(i) * 2;
          if (aux > 9) aux -= 9;
              total += aux;
            } else {
              total += parseInt(_cedula.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
          }
          total = total % 10 ? 10 - total % 10 : 0;

          if (_cedula.charAt(longitud-1) == total) {
            return true;
          }else{
            return false;
          }
    }
    console.log(false);
    return false;
  }
  cargar(id: number) {
    this.proveedores.cargar(id).subscribe(res => {
      this.proved.patchValue(Object.assign({}, res));
    });
  }
  
}
