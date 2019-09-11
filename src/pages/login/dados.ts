import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class DadosPage {
  token: string;
  expires: string;
  user: string;
  constructor(public modalCtrl: ModalController,
    ){}

  }

  