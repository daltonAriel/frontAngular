import { ClientesService } from './../../Servicios/clientes.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required)
  })

  spinner: number = 0;


  constructor(private router: Router, private clientes: UsuariosService) { }

  ngOnInit(): void {

  }


  async logueo(cliente: any) {


    this.spinner=1;
    this.clientes.login(cliente.usuario, cliente.contrasena).subscribe(res => {
      if (res == "") {
        Swal.fire("Login", "Credenciales Incorrectas", "warning");
        this.spinner=0;

        return
      }
      else {

        this.spinner = 0;
        sessionStorage.setItem('sesion', JSON.stringify(res));
        this.router.navigate(['/menu']);
      }



    }, error =>{

      alert("Error al iniciar sesion");

      this.spinner = 1;
    })

  

  }

}