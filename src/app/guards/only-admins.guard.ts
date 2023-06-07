import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyAdminsGuard implements CanActivate {

  constructor(private usuarioService:UsuariosService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    if(this.usuarioService.tipoUsuario == "Admin"){
      return true;
    }
    this.router.navigate(['/*'], { queryParams: { returnUrl: state.url }});
    return false;
  }
  
}
