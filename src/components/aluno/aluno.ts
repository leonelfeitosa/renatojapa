import { Component } from '@angular/core';

@Component({
  selector: 'aluno',
  templateUrl: 'aluno.html'
})
export class AlunoComponent {
  nome: string;
  cpf: string;
  idade: number;
  peso: Number;
  cintura: string;
  massaMagra: string;
  massaGorda: string;
  IMC: number;
  altura: number;
  dataInicio: string;
  perfil: string = "Aluno";
  msg: string;
  key: any;
  
  constructor() {
  }

}
