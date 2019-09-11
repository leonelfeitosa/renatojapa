import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonMaskModule } from '@pluritech/ion-mask';
import { HttpClientModule } from '@angular/common/http'
import { HistoricoPage } from '../pages/historico/historico';
import { LoginPage } from '../pages/login/login';
import { MostraHistoricoPage } from '../pages/mostra-historico/mostra-historico';
import { DadosPage } from '../pages/login/dados';
import { Camera } from '@ionic-native/camera';
import { ServicoProvider } from '../providers/servico/servico';
import { EvolucaoPage } from '../pages/evolucao/evolucao';
import { NoticiaPage } from '../pages/noticia/noticia';
import { ApinoticiaProvider } from '../providers/apinoticia/apinoticia';

@NgModule({
  declarations:
  [
    TabsPage,
    MyApp,
    LoginPage,
    HistoricoPage,
    MostraHistoricoPage,
    DadosPage,
    EvolucaoPage,
    NoticiaPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Voltar'
     }),
    IonMaskModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TabsPage,
    MyApp,
    HistoricoPage,
    LoginPage,
    MostraHistoricoPage,
    DadosPage,
    EvolucaoPage,
    NoticiaPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    ServicoProvider,
    ApinoticiaProvider
  ]
})
export class AppModule {}
