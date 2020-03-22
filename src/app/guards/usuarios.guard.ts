import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class UsuariosGuard implements CanActivate {
 constructor(
  private us :UsuarioService
 ){

 }
  canActivate() : boolean{
      return this.us.islogued();
  }
  
}
