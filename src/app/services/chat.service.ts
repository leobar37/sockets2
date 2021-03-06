import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { IUsuario } from '../classes/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { Subject } from 'rxjs';
import { ImensajeBa } from '../classes/interfaces';

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
   sendMessage(mensaje: ImensajeBa , callback ?: Function){
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
  reclamarMensajes(idConversacion :string){
    let url  = environment.wsUrl  + '/mensaje/'+ idConversacion;
    return  this._http.get(url);
  }
  enviarMensje(idbd:string ,mensaje:ImensajeBa){
    let url  = environment.wsUrl  + '/mensaje/'+ idbd;
     return this._http.post(url , mensaje);
  }
  //reclamar conversacion por id
  reclamarConverxid(idDestino :string , idRemite :string){
   let url = environment.wsUrl + '/conversacion';
  return this._http.post(url,{ idDestino, idRemite});
  }
  //reclamar mensajes generales
  mensajesGenerale(){
     let url  = environment.wsUrl +'/general';
    return this._http.get(url);
  }
}
export interface Imensaje {
  de: string,
  mensaje:string
}