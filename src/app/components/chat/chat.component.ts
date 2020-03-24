import { Component, OnInit } from '@angular/core';
import { ChatService, Imensaje } from '../../services/chat.service';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../classes/usuario';
import { ImensajeBa, IconversacionBa } from '../../classes/interfaces';
import Swal from 'sweetalert2';
import alert  from 'alertifyjs';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
 mensaje : string="";
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
   private _us :UsuarioService,
   private  router:Router
  ) { 
    this.destino  = {
       nombre :'chat General'
    }
    this.observadores();
   let susGenerales : Subscription =this._chat.mensajesGenerale().subscribe( (data :any)=>{
      this.chatPri.mensajes = data.general;
      setTimeout( ()=>{
        let elemento = document.getElementById('lista');
        elemento.scrollTop = elemento.scrollHeight;
       } , 100)
      susGenerales.unsubscribe;
  })
  }

  ngOnInit() {
    
  }
    enviarMensaje(){  
      if(this.mensaje.trim().length == 0)return
      let elemento : any =  document.getElementById('input');
      elemento.value ='';
     if(this.destino.nombre == 'chat General'){
      if(this.mensaje.trim() == "") return;
      let menEnviar:ImensajeBa = {
        // de : this._us.usuario.idBD,
        para : this._us.usuario.nombre,
        date : new Date().getTime(),
        mensaje : this.mensaje
      } 
       this._chat.sendMessage(menEnviar);
       setTimeout( ()=>{
        let elemento = document.getElementById('lista');
        elemento.scrollTop = elemento.scrollHeight;
       } , 100)
     }else{
       let msj :ImensajeBa ={
         de : this._us.usuario.idBD,
         para : this._us.usuario.nombre,
         date : new Date().getTime(),
         mensaje : this.mensaje
       }
       this._chat.enviarMensje(this.destino.idBD , msj)
       .subscribe( (data : { ok  : boolean , conversacion:string} )=>{
        this._chat.reclamarMensajes(data.conversacion).subscribe((data :any) =>{
          this.chatPri = data.chats;
           setTimeout( ()=>{
            let elemento = document.getElementById('lista');
            elemento.scrollTop = elemento.scrollHeight;
           } , 100)
        })
           
       })
     }
    }
    mismoUsuario(de:String) : boolean{

      
     return this._us.usuario.nombre == de;
    }
    observadores(){
      this._chat.getMesages().subscribe( (msj : ImensajeBa ) =>{
         this.chatPri.mensajes.push(msj);
     });
     this._chat.tipoChatObse.asObservable().subscribe( (data) =>{       
      if(!data)return;   
      this.destino = data;

      if(this.destino.nombre == 'chat General'){
        console.log('aqui entro');
        
        this._chat.mensajesGenerale().subscribe( (data :any)=>{
            this.chatPri.mensajes = data.general;
        })
      }else{
        this._chat.reclamarConverxid(this.destino.idBD , this._us.usuario.idBD).subscribe( (data:any ) =>{
          if(data.ok){
          this.chatPri = data.conversacion;
          }else{
            this.chatPri  = {
              idConversacion : "",
              mensajes : [ {
                 de : '',
                 para :''
              }]
           };
          }
          setTimeout( ()=>{
            let elemento = document.getElementById('lista');
            elemento.scrollTop = elemento.scrollHeight;
           } , 100)
        }); 
      }
  
      
     })
     this._chat.mensajePrivado().subscribe( (data: { mensaje : boolean, conversacion :string, nombre:string})  =>{
       if(data.mensaje){
         //reclamar mensajes
         if(this.chatPri.idConversacion != data.conversacion){
          Swal.fire({
            position: 'top-end',
            // icon: 'success',
            title: 'mensaje de : '+data.nombre,
            showConfirmButton: true,
            timer: 1000
          })
         }else{
          this._chat.reclamarMensajes(data.conversacion).subscribe((data: any )  =>{
          this.chatPri = data.chats;
          setTimeout( ()=>{
            let elemento = document.getElementById('lista');
            elemento.scrollTop = elemento.scrollHeight;
           } , 100)
        })
         }
  
       }
       
     })
    }
    salir(){
      localStorage.removeItem('usuario');
       this.router.navigate(['/login']);
    }
}
