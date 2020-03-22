import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   nombre : string = '';
   password :string = '';
  constructor(
    private router: Router,
    private  _socket :WebsocketService ,
    private _us :UsuarioService
    ) {
     
  } 

  ngOnInit() {
  }

  ingresar(){
    if(this.nombre.trim() == "" ||  this.password.trim() == "")return;
  this._us.loguinUsuario(this.nombre , this.password).subscribe(async (resp) =>{
    let  data = await resp;
    if(data.ok ==  true){
      Swal.fire( {icon :'success' , title : 'Bienvenido'});
      this.router.navigate(['/chat']);
    }else{
      Swal.fire( {icon : 'error' , text : 'credenciales incorrectas'});
    }
  })
  }
}
