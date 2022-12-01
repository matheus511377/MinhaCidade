import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './cadastrarlogin.component.html',
  styleUrls: ['./cadastrarlogin.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit {
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
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      phone : ['', [Validators.required]],
      address: ['', [Validators.required]],

    });
  }

  cadastrar(){
    if(this.formLogin.invalid) return;
    var usuario = this.formLogin.getRawValue()
    var name = this.formLogin.controls['name'].value;
    var email = this.formLogin.controls['email'].value;
    var password = this.formLogin.controls['password'].value;
    var birthdate = this.formLogin.controls['birthdate'].value;
    var phone = this.formLogin.controls['phone'].value;
    var address = this.formLogin.controls['address'].value;
    
    this.appService.cadastrarUsuario(name,email,password,phone,birthdate,address).subscribe(x=>{
      this.snackBar.open('Usuário', 'Usuário cadastrado com sucesso.', {
        duration: 3000
      });
      this.router.navigate(['login']);

    }, err=>{
      this.snackBar.open('Falha na autenticação', 'Usuário ou senha incorretos.', {
        duration: 3000
      });
    });
  }
}
