import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { IUsuario } from '../../interfaces/IUsuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private snackBar: MatSnackBar,
              private appService: AppService,
              private router: Router) { }

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm(){
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  cadastrar(){
    this.router.navigate(['cadastrarUsuario']);
  }

  logar(){
    if(this.formLogin.invalid) return;
    var usuario = this.formLogin.getRawValue() as IUsuario;
  
      this.appService.login(usuario).subscribe(x=>{
        localStorage.setItem('token',x.token); 
        localStorage.setItem('user',JSON.stringify(x.user)); 
        if(x.user.role.id ==2){
          this.router.navigate(['admin']);
        }
        else{
          this.router.navigate(['']);
        }
        
      }, err=>{
        this.snackBar.open('Falha na autenticação', 'Usuário ou senha incorretos.', {
          duration: 3000
        });
      })
  }
}
