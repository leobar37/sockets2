import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UsuarioService } from './usuario.service';
import { IUsuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public conectado: boolean = false;
  constructor(
     private socket: Socket,
    //  private _us:UsuarioService
  ) {
     this.checkStatus();
    
  }

  checkStatus(){
    this.socket.on('connect' , async ()=>{
     if(localStorage.getItem('usuario')){
         let user:IUsuario =  JSON.parse(localStorage.getItem('usuario'));
         await this.loguinWs(user.idBD);
     }
      this.conectado = true;
    });
    this.socket.on('disconnect' , async ()=>{
     
      this.conectado = false;
    }); 
  }
  emit(evento: string, payload: any,callback?: Function){
     this.socket.emit(evento , payload ,  callback );
  }
  listen(evento : string){
    //retorna un observable de tipo generico para poder escuchar el evento en cualquier parte
        return this.socket.fromEvent(evento);
  }
  loguinWs( idbd:string){
   return new Promise( (resolve , reject)=>{
    this.socket.emit('configurar-usuario' , {idbd} , (resp)=> {
      resolve();
    });
   });
  } 
}
