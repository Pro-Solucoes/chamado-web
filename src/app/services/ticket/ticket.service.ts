import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CHAMADO_API} from '../chamado.api';
import {Ticket} from '../../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {


  constructor(private http: HttpClient) {
  }

  createOrUpdate(ticket: Ticket) {
    if (ticket.id != null && ticket.id !== '') {
      return this.http.put(`${CHAMADO_API}/ticket`, ticket);

    } else {
      ticket.id = null;
      ticket.status = 'Novo';
      return this.http.post(`${CHAMADO_API}/ticket`, ticket);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${CHAMADO_API}/ticket/${page}/${count}`);
  }

  findById(id: string) {
    return this.http.get(`${CHAMADO_API}/ticket/${id}`);
  }

  elete(id: string) {
    return this.http.delete(`${CHAMADO_API}/ticket/${id}`);
  }

  findByParams(page: number, count: number, atribuido: boolean, ticket: Ticket) {

    ticket.numero = ticket.numero == null ? 0 : ticket.numero;
    ticket.titulo = ticket.titulo === '' ? 'uninformed' : ticket.titulo;
    ticket.status = ticket.status === '' ? 'uninformed' : ticket.status;
    ticket.prioridade = ticket.prioridade === '' ? 'uninformed' : ticket.prioridade;

    return this.http.get(
      `${CHAMADO_API}/ticket/${page}/${count}/${ticket.numero}/${ticket.titulo}/${ticket.status}/${ticket.prioridade}/${atribuido}/`);

  }

  alterarStatus(status: string, ticket: Ticket) {
    return this.http.put(`${CHAMADO_API}/ticket;${ticket.id}/${status}`, ticket);
  }

  resumo() {
    return this.http.get(`${CHAMADO_API}/ticket/resumo`);
  }
}
