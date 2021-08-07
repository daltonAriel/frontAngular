import { ProveedoresService } from './../../../Servicios/proveedores.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.css']
})
export class NuevoProveedorComponent implements OnInit {

  idProveedor: any;
  igual: any;

  proved = new FormGroup({

    cedula: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),


  })

  constructor(private proveedores: ProveedoresService, private router: Router, private ra: ActivatedRoute) {

    this.idProveedor = this.ra.snapshot.params.id;

  }

  ngOnInit(): void {
    if (this.idProveedor != null) {
      this.cargar(this.idProveedor);

    }


  }


  guardar(obj: any) {
    console.log(this.proved.get('cedula').value);
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

    if (this.idProveedor == null) {
      this.proveedores.nuevo(obj).subscribe(res => {

        this.router.navigate(['/menu/listarProveedor']);
        Swal.fire("Proveedores", "Registro guardado con exito", "success");


      }, error => alert("Error al insertar el registro"))


    } else {




      // return


      obj.idProveedor = this.idProveedor;
      obj.Cedula = this.proved.get('cedula')?.value;




      this.proveedores.editar(this.idProveedor, obj).subscribe(res => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Editado con exito',
          showConfirmButton: false,
          timer: 1500,



        })

        this.router.navigate(['/menu/listarProveedor']);

      }, error => console.log(error))
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
