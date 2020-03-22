import { Component, OnInit } from '@angular/core';
import { ChatService, Imensaje } from '../../services/chat.service';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../classes/usuario';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
 mensaje : string;
 destino : IUsuario; 
 mensajes : Imensaje[] = [];
  constructor(
   private  _chat:ChatService,
   private _us :UsuarioService
  ) { 
    this.observadores();

  }

  ngOnInit() {
    
  }
    enviarMensaje(){
     if(!this.destino){
      if(this.mensaje.trim() == "") return;
      let menEnviar:Imensaje = {
        de  : this._us.usuario.nombre,
        mensaje :this.mensaje
      } 
       this._chat.sendMessage(menEnviar);
     }else{
       
     }
    }

    observadores(){
      this._chat.getMesages().subscribe( (msj : Imensaje ) =>{
        this.mensajes.push(msj); 
     });
    //  this._chat.tipoChatObse.asObservable().subscribe( data =>{
    //   console.log(this.destino);
       
    //   if(data)   
    //   this.destino = data;
    //  })
    }
}
