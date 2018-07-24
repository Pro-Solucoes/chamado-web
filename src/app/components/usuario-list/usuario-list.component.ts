import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared/shared.service';
import {DialogService} from '../../services/dialog/dialog.service';
import {Router} from '@angular/router';
import {UsuarioService} from '../../services/usuario/usuario.service';
import {ResponseApi} from '../../model/response-api';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  page = 0;
  count = 5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listUsuario = [];

  constructor(
   // private  dialogService: DialogService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }


  ngOnInit() {
    this.findAll(this.page, this.count);
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

  findAll(page: number, count: number) {
    this.usuarioService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
      this.listUsuario = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err => {
      this.showMenssagem({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  edit(id: string) {
    this.router.navigate(['/novo-usuario']);
  }
/*
  delete(id: string) {
    this.dialogService.confirm(`Voce quer deletar o usuario ?`).then((candelete: boolean) => {
      if (candelete) {
        this.message = {};
        this.usuarioService.delete(id).subscribe((responseApi: ResponseApi) => {
          this.showMenssagem({
            type: 'success',
            text: 'Record deletado'
          });
          this.findAll(this.page, this.count);
        }, err => {
          this.showMenssagem({
            type: 'error',
            text: err['error']['errors'][0]
          });
        });
      }
    });
  }
*/
  setNextPage(event: any) {
    event.preventDefault();
    if (this.page + 1 < this.pages.length) {
      this.page = this.page + 1;
      this.findAll(this.page, this.count);
    }
  }

  setPreviousPage(event: any) {
    event.preventDefault();
    if (this.page > 0) {
      this.page = this.page - 1;
      this.findAll(this.page, this.count);
    }
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.findAll(this.page, this.count);
  }

}
