import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SesionGuard implements CanActivate {
  constructor(private router:Router)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

      if(sessionStorage.getItem('sesion')==null)
      { 
        this.router.navigate(['/nosotros']);
        return false;
   
      }else{
        return true;
      }
  }
  
}
