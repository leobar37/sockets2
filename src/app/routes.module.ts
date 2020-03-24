import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { UsuariosGuard } from './guards/usuarios.guard';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
{path : 'login' , component : LoginComponent  },
{path : 'register' , component :RegisterComponent},
  {path : 'chat' , component : MensajesComponent , canActivate:[UsuariosGuard]} ,
  {path : '**' , pathMatch :'full'  , redirectTo:'login'} 

];
@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }