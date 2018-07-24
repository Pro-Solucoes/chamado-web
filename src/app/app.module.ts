import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {MenuComponent} from './components/menu/menu.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/security/login/login.component';
import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {SharedService} from './services/shared/shared.service';
import {UsuarioService} from './services/usuario/usuario.service';
import {AuthInterceptor} from './components/security/auth.interceptor';
import {AuthGuard} from './components/security/auth.guard';
import { NovoUsuarioComponent } from './components/novo-usuario/novo-usuario.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { NovoTicketComponent } from './components/novo-ticket/novo-ticket.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NovoUsuarioComponent,
    UsuarioListComponent,
    NovoTicketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes
  ],
  providers: [UsuarioService, SharedService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
