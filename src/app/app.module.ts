import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
const config: SocketIoConfig = { url: environment.wsUrl , options: {} };
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule} from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component'
// import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './routes.module';
import { ListausComponent } from './components/listaus/listaus.component';
import {  HttpClientModule} from '@angular/common/http'
import { UsuarioService } from './services/usuario.service';
import { ChatService } from './services/chat.service';
import { WebsocketService } from './services/websocket.service';
import { RegisterComponent } from './pages/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HeaderComponent,
    LoginComponent,
    MensajesComponent,
    ListausComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    // RouterModule,
    HttpClientModule,
    AppRoutingModule,
  
  ],
  providers: [
    UsuarioService,
    ChatService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
