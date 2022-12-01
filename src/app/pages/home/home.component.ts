import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userImage: string = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  user;
  posts:JSON;
  postUnico;
  curtida = false;
  formComentario: FormGroup;
  formIniciar: FormGroup;
  postComentario;
  postIniciar;
  postAtualizar;
  postFinalizar;
  isAdmin = false;
  image:string|ArrayBuffer;
  open = "none";
  displayStyle = "none";
  comentario = "none";
  iniciarPost = "none";
  borda = "red";
  
  constructor( private appService: AppService,
    private _sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
   ) { 


      
    }

  reload(){
    this.appService.listarPosts().subscribe(x=>{
      this.posts = x;
      console.log(x);
    })
  }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user.role.id == 2){
      this.isAdmin =  true;
    }
    else{
      this.isAdmin = false;
    }

    this.formComentario = this.formBuilder.group({
      description: ['', [Validators.required]],
    });
    this.formIniciar = this.formBuilder.group({
      descriptionIniciar: ['', [Validators.required]],
      imageIniciar: ['', [Validators.required]],
    });


   this.reload();
  };
  
  
  ​openModal(id:string){
    console.log("clicou");
    this.displayStyle = "block";
    this.open = "block";
    this.appService.buscarPorIdPost(id).subscribe(x=>{
      this.postUnico = x;
    });

  }
  closePopup() {
    this.displayStyle = "none";
    this.open = "none";
  }

  ​openComentarioModal(id:string){
    this.postComentario = id;
    this.comentario = "block";
    this.open = "block";
   

  }
  closeComentarioPopup() {
    this.comentario = "none";
    this.open = "none";
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


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result;
    };
    
  }
  iniciar(post){
    console.log("iniciar");
    this.iniciarPost = "block";
    this.postIniciar = post;
    this.open = "block";
   // this.comentario = "block";
  }
  closeIniciar(){
    this.iniciarPost = "none";
    this.open = "none";
    //this.comentario = "none";
  }
  salvar(){
    if(this.formIniciar.invalid) return;
    var descricao = this.formIniciar.controls['descriptionIniciar'].value;
    if (this.postIniciar.project!=null){
      console.log("opa");
      this.appService.atualizar(descricao, this.image, this.postIniciar.id,  this.postIniciar.project.id).subscribe(x=>{
        this.closeIniciar();
      });
    }
    else{
      this.appService.iniciar(descricao, this.image, this.postIniciar.id).subscribe(x=>{
        this.closeIniciar();
      });
    }
  
  }
  atualizar(post){
    this.formIniciar.controls['descriptionIniciar'].setValue(post.project.description);
    this.iniciarPost = "block";
    this.postIniciar = post;
    this.open = "block";

  }
  finalizar(post){
    this.appService.finalizar(post.project.description, post.project.image, post.id, post.project.id).subscribe(x=>{
      this.snackBar.open('Finalizado', 'Projeto finalizado', {
        duration: 3000
      });
      this.reload();
    });
  }

  pendente(){

  }
  fazendo(){

  }
  finalizado(){
    
  }
  

}
