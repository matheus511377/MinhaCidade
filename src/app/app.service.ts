import { Injectable } from '@angular/core';
 
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { IUsuario } from './interfaces/IUsuario';
 

 
@Injectable()
export class AppService {
 
  baseURL: string = "https://azure-back.azurewebsites.net";
  httpHeaders: HttpHeaders = new HttpHeaders();
 
  constructor(private http: HttpClient) {
    this.httpHeaders.append('Access-Control-Allow-Origin', '*');
    this.httpHeaders.append('Access-Control-Allow-Methods', 'PUT');
    this.httpHeaders.append('Access-Control-Allow-Headers', '*');
    this.httpHeaders.append('Content-Type', 'application/json');
  }


 
  login(usuario: IUsuario): Observable<any> {
    return this.http.post(this.baseURL + '/login',{'email': usuario.email,'password':usuario.senha},{ headers: this.httpHeaders })
  }
  cadastrarUsuario(nome: string, email: string, senha: string, telefone: string, data: Date, endereco: string): Observable<any> {
    return this.http.post(this.baseURL + '/users',{'name': nome,'email':email, 'password': senha, 'birthdate': data, 'phone': telefone, 'address':endereco},{ headers: this.httpHeaders })
  }

  listarPosts(): Observable<any>{
    return this.http.get(this.baseURL + '/posts',{ headers: this.httpHeaders })
  }
  listarPostsByUser(userId): Observable<any>{
    return this.http.get(this.baseURL + '/users/' + userId + '/posts',{ headers: this.httpHeaders })
  }

  buscarPorIdPost(id: string){
    return this.http.get(this.baseURL + '/posts/'+id,{ headers: this.httpHeaders })
  }

  curtirPost(idUsuario: string, idPost, curtida: boolean){
    console.log({'userId': idUsuario,'postId':idPost, 'upvote': curtida});
    return this.http.post(this.baseURL + '/reactions',{'userId': idUsuario,'postId':idPost, 'upvote': curtida},{ headers: this.httpHeaders })
  }

  solicitarMudanca(idUsuario, titulo,categoria, endereco, descricao,imagem){
    return this.http.post(this.baseURL + '/posts',{'userId': idUsuario,'title':titulo, 'category': categoria,'address':endereco, 'description':descricao, 'image':imagem},{ headers: this.httpHeaders })
  }

  comentar(descricao, idUsuario, idPost){
    return this.http.post(this.baseURL + '/comments',{'description': descricao,'postId':idPost, 'userId': idUsuario},{ headers: this.httpHeaders })
  }
//admin
  iniciar(descricao, image, idPost){
    return this.http.post(this.baseURL + '/projects',{'description': descricao,'postId':idPost, 'image': image},{ headers: this.httpHeaders })
  }
  atualizar(descricao, image, idPost, idProjeto){
    return this.http.put(this.baseURL + '/projects/' +idProjeto ,{'status': 'pending', 'description': descricao,'postId':idPost, 'image': image},{ headers: this.httpHeaders })
  }
  finalizar(descricao, image, idPost, idProjeto){
    return this.http.put(this.baseURL + '/projects/'+ idProjeto ,{'status': 'completed', 'description': descricao,'postId':idPost, 'image': image},{ headers: this.httpHeaders })
  }

 
}