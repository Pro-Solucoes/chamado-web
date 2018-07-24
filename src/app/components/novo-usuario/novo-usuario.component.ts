import {Component, OnInit, ViewChild} from '@angular/core';
import {Usuario} from '../../model/usuario';
import {SharedService} from '../../services/shared/shared.service';
import {ActivatedRoute} from '@angular/router';
import {UsuarioService} from '../../services/usuario/usuario.service';
import {NgForm} from '@angular/forms';
import {ResponseApi} from '../../model/response-api';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {


  @ViewChild('form')
  form: NgForm;

  usuario = new Usuario('', '', '', '');
  shared: SharedService;
  message: {};
  classCss: {};


  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    if (id !== undefined) {
      this.findById(id);
    }

  }

  findById(id: string) {
    this.usuarioService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.usuario = responseApi.data;
      this.usuario.senha = '';
    }, err => {
      this.showMenssagem({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });

  }

  register() {
    this.message = {};
    this.usuarioService.createOrUpdate(this.usuario).subscribe((responseApi: ResponseApi) => {
      console.log('1');
        this.usuario = new Usuario(null, '', '', '');
        console.log('2');
        const usuarioRet: Usuario = responseApi.data;
        console.log('3');
        this.form.resetForm();
        console.log('4');
        this.showMenssagem({
          type: 'success',
          text: `Registered ${usuarioRet.email} successfully`
        });
      },
      err => {
        this.showMenssagem({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
  }

  private showMenssagem(message: { type: string, text: string }): void {
    this.message = message;
    this.buidClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buidClasses(type: string): void {
    this.classCss = {
      'alert': true
    };
    this.classCss['alert-' + type] = true;
  }

  getFromGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty

    };
  }

}
