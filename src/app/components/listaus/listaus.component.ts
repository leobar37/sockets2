import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { IUsuario, Usuario } from '../../classes/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-listaus',
  templateUrl: './listaus.component.html',
  styleUrls: ['./listaus.component.css']
})
export class ListausComponent implements OnInit {
  usuarios: IUsuario[] = [];
  constructor(
     private _chat: ChatService,
     private  _us :UsuarioService,
     private _wbs :WebsocketService
  ) {
      this.observadores();
   }
    
 async ngOnInit() {
    await this._wbs.loguinWs(this._us.usuario.idBD);
  }
  observadores(){
    this._chat.nuevoUsuario().subscribe( (data :any )=>{
      this.usuarios = data.users;
      let user :IUsuario ={
       nombre : 'chat General',
      } 
      this.usuarios = this.usuarios.filter(us =>{
         return us.idBD  != this._us.usuario.idBD;
      })        
      this.usuarios.unshift(user);
  });
  }
  enviarPrivado(idbd:string){
    let usuario = this.usuarios.find( usuario =>  usuario.idBD ==  idbd);   
    this._chat.tipoChatObse.next(usuario);
  }
}
