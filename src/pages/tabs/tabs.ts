import { Component } from '@angular/core';
import { HistoricoPage } from '../historico/historico';
import { EvolucaoPage } from '../evolucao/evolucao';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HistoricoPage;
  tab2Root = EvolucaoPage;


  constructor() {
    
  }
}
