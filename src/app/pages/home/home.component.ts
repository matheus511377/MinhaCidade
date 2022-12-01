import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  
  displayStyle = "none";
  
  constructor( private appService: AppService,
    private _sanitizer: DomSanitizer) { 


      
    }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.appService.listarPosts().subscribe(x=>{
    this.posts = x;
    console.log(x);
  })
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

  curtir(post){
    this.appService.curtirPost(this.user.id, post.idPost,true).subscribe(x=>{
      
    });
  }

  // getImage(image: string):SafeResourceUrl{
  //    this._sanitizer.bypassSecurityTrustResourceUrl(image).next(x=>{

  //     });
  // }

}
