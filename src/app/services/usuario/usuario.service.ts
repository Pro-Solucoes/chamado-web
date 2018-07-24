///<reference path="../../../../node_modules/@angular/core/src/di/metadata.d.ts"/>
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../../model/usuario';
import {CHAMADO_API} from '../chamado.api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {
  }

  login(usuario: Usuario) {
    return this.http.post(`${CHAMADO_API}/auth`, usuario);
  }

  createOrUpdate(usuario: Usuario) {
    if (usuario.id != null && usuario.id !== '') {
      return this.http.put(`${CHAMADO_API}/usuario`, usuario);
    } else {
      usuario.id = null;
      return this.http.post(`${CHAMADO_API}/usuario`, usuario);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${CHAMADO_API}/usuario/${page}/${count}`);
  }

  findById(id: string) {
    return this.http.get(`${CHAMADO_API}/usuario/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${CHAMADO_API}/usuario/${id}`);
  }
}
