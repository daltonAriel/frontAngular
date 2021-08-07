import { ClientesService } from './../../../Servicios/clientes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  idCliente:any;
  igual:any;

  empleados = new FormGroup({


    cedula: new FormControl('',[Validators.required]),
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    usuario: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required),
    

  })

  constructor(private clientes:ClientesService,private router:Router, private ra:ActivatedRoute) { 

    this.idCliente = this.ra.snapshot.params.id;

  }

  ngOnInit(): void {
    if(this.idCliente!=null)
    {
      this.cargar(this.idCliente);

    }


  }

  guardar(obj:any)
  {
       
    if(this.idCliente==null)
    {


      if(this.empleados.invalid)
      {

        Swal.fire("Usuarios","Todos los campos son requeridos","warning");
        return

      }


  
        

      this.clientes.cedula(this.empleados.get('cedula').value).subscribe(res=>{
         

        if (res==null)
        {
          Swal.fire("Usuarios","Cedula Incorrecta","warning");
          return
        }
    
        if (res==true)
        {
          Swal.fire("Usuarios","Esta cedula ya se encuentra registrada","warning");
          return
        }

        if (res==false)
        {


            this.clientes.nuevo(obj).subscribe(res=>{

        this.router.navigate(['/menu/listarCliente']);
        Swal.fire("Usuarios","Registro guardado con exito","success");
  
  
      },error=>alert("Error al insertar el registro"))
          
        }






      }, error=>{

        alert("error..."+error);
      });



    


    }else
    {
    

      // return 
      
   
      obj.idClientes=this.idCliente;
      obj.Cedula = this.empleados.get('cedula')?.value;


      if(this.empleados)
      {

        Swal.fire("Usuarios","Todos los campos son requeridos","warning");
        return

      }
   
   

      this.clientes.editar(this.idCliente, obj).subscribe(res => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Editado con exito',
          showConfirmButton: false,
          timer: 1500,



        })

        this.router.navigate(['/menu/listarUsuario']);

      }, error => console.log(error))
    }
 
    

  }



  cargar(id: number) {

    this.clientes.cargar(id).subscribe(res => {


      this.empleados.patchValue(Object.assign({}, res));

      this.igual = this.empleados.get('usuario')?.value;

      this.empleados.controls['cedula'].disable();

    });



  }

}
