import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoAdminGuard implements CanActivate{
    constructor(
      private usuarioService: UsuarioService,
      private router: Router) { }

    canActivate(){

      var user = JSON.parse(localStorage.getItem('user'));

      if (user.role.id ==2) {
        return true;
      }

      this.router.navigate(['login']);
      return false;
    }
}
