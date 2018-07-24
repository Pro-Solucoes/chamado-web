import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/security/login/login.component';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from './components/security/auth.guard';
import {NovoUsuarioComponent} from './components/novo-usuario/novo-usuario.component';
import {UsuarioListComponent} from './components/usuario-list/usuario-list.component';


export const ROUTES: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'usuario-novo', component: NovoUsuarioComponent, canActivate: [AuthGuard]},
  {path: 'usuario-list', component: UsuarioListComponent, canActivate: [AuthGuard]}

];

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
