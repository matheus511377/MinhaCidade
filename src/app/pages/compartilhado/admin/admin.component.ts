import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userImage: SafeResourceUrl;
  formLogin: FormGroup;
  cadastrar = "none";
  image:string|ArrayBuffer;
  user = JSON.parse(localStorage.getItem('user'));

  constructor(private usuarioService: UsuarioService,
    private _sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    
    this.userImage = this._sanitizer.bypassSecurityTrustResourceUrl(this.user.profileImage);
    this.formLogin = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      address: ['', [Validators.required]],
      category: ['', [Validators.required]],
      image: ['', [Validators.required]],

    });
  }
  solicitar(){
    if(this.formLogin.invalid) return;
    var title = this.formLogin.controls['title'].value;
    var description = this.formLogin.controls['description'].value;
    var address = this.formLogin.controls['address'].value;
    var category = this.formLogin.controls['category'].value;    

    this.appService.solicitarMudanca(this.user.id,title,category,address,description,this.image).subscribe(x=>{
      this.snackBar.open('Mudança', 'solicitação cadastrada com sucesso.', {
        duration: 3000
      });
  
      this.router.navigate(['']);
      this.closeSolicitarMudanca();
    })

  }

  deslogar(){
    this.usuarioService.deslogar();
  }

  solicitarMudanca(){

    this.cadastrar = "block";

  }
  closeSolicitarMudanca() {
    this.cadastrar = "none";
  }


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result;
    };
    
  }

  minhasSolicitacoes(){
    this.router.navigate(['minhasSolicitacoes']);
  }

  home(){
    this.router.navigate(['']);
  }
  

}


