import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../model/usuario';
import {UsuarioService} from '../../../services/usuario/usuario.service';
import {Router} from '@angular/router';
import {SharedService} from '../../../services/shared/shared.service';
import {CurrentUsuarioModel} from '../../../model/currentUsuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario = new Usuario('', '', '', '');
  shared: SharedService;
  message: string;

  constructor(
    private  usuarioService: UsuarioService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }

  login() {
    this.message = '';
    this.usuarioService.login(this.usuario).subscribe((usuarioAuthenticarion: CurrentUsuarioModel) => {
      this.shared.token = usuarioAuthenticarion.tocken;
      this.shared.usuario = usuarioAuthenticarion.usuario;
      this.shared.usuario.perfil = this.shared.usuario.perfil.substring(5);
      this.shared.showTemplate.emit(true);
      this.router.navigate(['/']);
    }, err => {
      this.shared.token = null;
      this.shared.usuario = null;
      this.shared.showTemplate.emit(false);
      this.message = 'Erro';
    });
  }

  cancelLogin() {
    this.message = '';
    this.usuario = new Usuario('', '', '', '');
    window.location.href = '/login';
    window.location.reload();
  }

  getFromGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-sucess': !isInvalid && isDirty

    };
  }

}
