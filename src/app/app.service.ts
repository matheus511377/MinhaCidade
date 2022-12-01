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

  buscarPorIdPost(id: string){
    return this.http.get(this.baseURL + '/posts/'+id,{ headers: this.httpHeaders })
  }

  curtirPost(idUsuario: string, idPost, curtida: boolean){
    return this.http.post(this.baseURL + '/reactions',{'userId': idUsuario,'postId':idPost, 'upvote': curtida},{ headers: this.httpHeaders })
  }


 
}