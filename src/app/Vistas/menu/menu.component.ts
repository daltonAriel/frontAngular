import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  sesion: any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.sesion = JSON.parse(sessionStorage.getItem('sesion'));

    console.log(this.sesion[0].nombres  );


  }

  salir() {



    sessionStorage.clear();
    this.router.navigate(['/nosotros'])
    location.reload();
  }



}
