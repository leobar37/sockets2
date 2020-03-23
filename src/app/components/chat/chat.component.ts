import { Component, OnInit } from '@angular/core';
import { ChatService, Imensaje } from '../../services/chat.service';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../classes/usuario';
import { ImensajeBa, IconversacionBa } from '../../classes/interfaces';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
 mensaje : string;
 destino : IUsuario; 
 mensajes : Imensaje[] = [];
 chatPri: IconversacionBa = {
    idConversacion : "",
    mensajes : [ {
       de : '',
       para :''
    }]
 };
  constructor(
   private  _chat:ChatService,
   private _us :UsuarioService
  ) { 
    this.observadores();
  }

  ngOnInit() {
    
  }
    enviarMensaje(){
      if(this.mensaje.trim().length == 0)return
     if(!this.destino){
      if(this.mensaje.trim() == "") return;
      let menEnviar:Imensaje = {
        de  : this._us.usuario.nombre,
        mensaje :this.mensaje
      } 
       this._chat.sendMessage(menEnviar);
     }else{
       let msj :ImensajeBa ={
         de : this._us.usuario.idBD,
         para : this.destino.nombre,
         date : new Date().getTime(),
         mensaje : this.mensaje
       }
       this._chat.enviarMensje(this.destino.idBD , msj)
       .subscribe( (data : { ok  : boolean , conversacion:string} )=>{
        this._chat.reclamarMensajes(data.conversacion).subscribe((data :any) =>{
          this.chatPri = data.chats;
          console.log(data);
          
   
        })
           
       })
     }
    }

    observadores(){
      this._chat.getMesages().subscribe( (msj : Imensaje ) =>{
        this.mensajes.push(msj); 
     });
     this._chat.tipoChatObse.asObservable().subscribe( (data) =>{       
      if(data)   
      this.destino = data;
     })
     this._chat.mensajePrivado().subscribe( (data: { mensaje : boolean, conversacion :string})  =>{
       if(data.mensaje){
         //reclamar mensajes
         this._chat.reclamarMensajes(data.conversacion).subscribe((data: any )  =>{
          this.chatPri = data.chats;
         
        })
       }
       
     })
    }
}
