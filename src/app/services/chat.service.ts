import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { IUsuario } from '../classes/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { Subject } from 'rxjs';
// import { Imensaje } from '../classes/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public tipoChatObse   = new   Subject<any>();
  constructor(
    private _socket : WebsocketService,
    private _http :HttpClient,
    private _us : UsuarioService
  ) {
     
  }
   sendMessage(mensaje: Imensaje1 , callback ?: Function){
      this._socket.emit('mensaje' ,mensaje  , callback); 
    }
   getMesages(){
    return  this._socket.listen('mensaje-nuevo');
   }
   nuevoUsuario(){
    return this._socket.listen('nuevo-usuario');
   }
   mensajePrivado(){
    return this._socket.listen('mensaje-privado');
   }
   
  /*=====  peticiones htttp  ======*/
  reclamarMensajes(){
    let url  = environment.wsUrl  + '/mensaje/'+ this._us.usuario.idBD;
    return  this._http.get(url);
  }
  enviarMensje(idbd:string ,mensaje:Imensaje){
    let url  = environment.wsUrl  + '/mensaje/'+ this._us.usuario.idBD;
     return this._http.post(url , mensaje);
  }
}
export interface Imensaje1 {
  de: string,
  mensaje:string
}