import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Ticket} from '../../model/ticket';
import {SharedService} from '../../services/shared/shared.service';
import {TicketService} from '../../services/ticket/ticket.service';

import {ActivatedRoute} from '@angular/router';
import {ResponseApi} from '../../model/response-api';


@Component({
  selector: 'app-novo-ticket',
  templateUrl: './novo-ticket.component.html',
  styleUrls: ['./novo-ticket.component.css']
})
export class NovoTicketComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  ticket = new Ticket('', 0, '', '', '', '', '', null, null, '', null);

  shared: SharedService;
  message: {};
  classCss: {};

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.findById(id);
    }
  }

  findById(id: string) {
    this.ticketService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.ticket = responseApi.data;

    }, err => {
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


  register() {
    this.message = {};
    this.ticketService.createOrUpdate(this.ticket).subscribe((responseApi: ResponseApi) => {
        this.ticket = new Ticket('', 0, '', '', '', '', '', null, null, '', null);
        let ticket: Ticket = responseApi.data;
        this.form.resetForm();
        this.showMenssagem({
          type: 'success',
          text: `Registered ${ticket.titulo} successfully`
        });
      },
      err => {
        this.showMenssagem({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
  }

  onFileChanger(event): void {

    if (event.target.file[0].size = 200000) {
      this.showMenssagem({
        type: 'error',
        text: 'Imagem maxima de 2 MB'
      });
    } else {
      this.ticket.imagem = '';
      var reader = new FileReader();
      reader.onloadend = (e: Event) => {
        this.ticket.imagem = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);

    }
  }

}
