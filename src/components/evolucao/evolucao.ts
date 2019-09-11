import { Component } from '@angular/core';

/**
 * Generated class for the EvolucaoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'evolucao',
  templateUrl: 'evolucao.html'
})
export class EvolucaoComponent {

  text: string;

  constructor() {
    console.log('Hello EvolucaoComponent Component');
    this.text = 'Hello World';
  }

}
