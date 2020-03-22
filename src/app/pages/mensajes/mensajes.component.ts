import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  constructor(
    private _chat: ChatService
  ) { }

  ngOnInit() {
     this._chat.mensajePrivado().subscribe(data =>{
      console.log('notificacion');
      
      if(data){
         this._chat.reclamarMensajes().subscribe(data =>{
             console.log(data);
         })
       }
         
     })  
  } 
 
}
