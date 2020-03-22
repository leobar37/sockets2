import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  nombre : string = '';
   password :string = '';
  constructor(
    private router: Router,
    private  _socket :WebsocketService,
    private _us :UsuarioService
  ) { }

  ngOnInit() {
  }
  ingresar(){
    // this._socket.loguinWs(this.nombre);
    if(this.nombre.trim() == "" ||  this.password.trim() == "")return;
    this._us.crearUsuario(this.nombre , this.password).subscribe(async (data)=>{
      let rpta :boolean = await data;
      if(rpta){
        Swal.fire( {icon :'success' , title : 'Bienvenido'});
        this.router.navigate(['/chat']);
      }else{
        Swal.fire( {icon : 'error' , text : 'este usuario ya existe'});
      }
       
    })
  }
}
