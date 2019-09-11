import { Component } from '@angular/core';

/**
 * Generated class for the TreinoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'treino',
  templateUrl: 'treino.html'
})
export class TreinoComponent {

  text: string;

  constructor() {
    console.log('Hello TreinoComponent Component');
    this.text = 'Hello World';
  }

}
