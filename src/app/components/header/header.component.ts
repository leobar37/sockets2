import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nombre :string ="";
  constructor(
    private _socket: WebsocketService,
    private _chat : ChatService,
    private _us :UsuarioService
  ) { }

  ngOnInit() {
     this.nombre = this._us.usuario.nombre;
  }

}
