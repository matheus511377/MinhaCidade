import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  userImage: SafeResourceUrl;
  constructor(private usuarioService: UsuarioService,
    private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.userImage = this._sanitizer.bypassSecurityTrustResourceUrl(user.profileImage);
  }

  deslogar(){
    this.usuarioService.deslogar();
  }

}
