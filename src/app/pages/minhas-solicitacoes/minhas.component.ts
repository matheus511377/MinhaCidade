import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-minhas',
  templateUrl: './minhas.component.html',
  styleUrls: ['./minhas.component.scss']
})
export class MinhasComponent implements OnInit {
  userImage: string = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  user;
  posts:JSON;
  postUnico;
  curtida = false;
  formComentario: FormGroup;
  postComentario;
 
  
  displayStyle = "none";
  comentario = "none";

  
  constructor( private appService: AppService,
    private _sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
   ) { 


      
    }

  reload(){
    this.appService.listarPostsByUser(this.user.id).subscribe(x=>{
      this.posts = x;
      console.log(x);
    })
  }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.formComentario = this.formBuilder.group({
      description: ['', [Validators.required]],
    });
   this.reload();
  };
  
  
  ​openModal(id:string){
    console.log("clicou");
    this.displayStyle = "block";
    this.appService.buscarPorIdPost(id).subscribe(x=>{
      this.postUnico = x;
    });

  }
  closePopup() {
    this.displayStyle = "none";
  }

  ​openComentarioModal(id:string){
    this.postComentario = id;
    this.comentario = "block";
   

  }
  closeComentarioPopup() {
    this.comentario = "none";
  }
  

  curtir(post){
    console.log(post);
    this.appService.curtirPost(this.user.id, post.id,true).subscribe(x=>{
      this.snackBar.open('Curtida', 'Curtida cadastrada com sucesso.', {
        duration: 3000
      });
    },error=>{
      this.snackBar.open('Curtida', error, {
        duration: 3000
      });
    });
  }
  postar(){
    if(this.formComentario.invalid) return;
    var descricao = this.formComentario.controls['description'].value;
    this.appService.comentar(descricao, this.user.id, this.postComentario).subscribe(x=>{
      this.snackBar.open('Comentario', 'Comentario cadastrado com sucesso.', {
        duration: 3000
      });
  
      this.reload();
      this.closeComentarioPopup();
    });
  };

  // getImage(image: string):SafeResourceUrl{
  //    this._sanitizer.bypassSecurityTrustResourceUrl(image).next(x=>{

  //     });
  // }

}
