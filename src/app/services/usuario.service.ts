import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { Usuario, IUsuario } from '../classes/usuario';
import { ChatService } from './chat.service';
import { WebsocketService } from './websocket.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 usuario : IUsuario;
  constructor(
    private http:HttpClient,
    public  _wbs:WebsocketService
    ) {
      if(localStorage.getItem('usuario')){
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
      }
    }
    islogued(){
      let us = localStorage.getItem('usuario');
      if(us){
        return true;
      }else{
        return false;
      }

     }
    crearUsuario(nombre: string , password ?:string){
      let url = environment.wsUrl + '/register';
      return this.http.post(url , { nombre, password })
      .pipe(map(async (data : any)  =>{ 
       console.log(data);
        let us =  data.rpta;
        if(data.rpta != false){
          this.usuario = us;
          await this._wbs.loguinWs(this.usuario.idBD);
          localStorage.setItem('usuario', JSON.stringify(this.usuario));          
          return true; 
        }else{
           return false;
          }
          
        }))
   }
   loguinUsuario(nombre: string , password:string){
     let url = environment.wsUrl + '/login';
     return this.http.post(url, {name : nombre , password})
     .pipe( map(async (data :any ) =>{
      if(data.ok ==  true){
       let us = data.user;
        this.usuario = us;
        localStorage.setItem('usuario', JSON.stringify(this.usuario));   
       }
      return data;
     }));
  }
} 
