import {Usuario} from './usuario';

export class Ticket {
  constructor(
    public id: string,
    public  numero: number,
    public titulo: string,
    public status: string,
    public prioridade: string,
    public imagem: string,
    public descricao:string,
    public usuario: Usuario,
    public usuarioAtribuido: Usuario,
    public data: string,
    public alteracao: Array<string>
  ) {
  }

  public equals(obj: Ticket): boolean {
    return this.numero === obj.numero;
  }
}
