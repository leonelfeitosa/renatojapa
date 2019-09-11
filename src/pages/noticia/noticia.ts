import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApinoticiaProvider } from '../../providers/apinoticia/apinoticia';


/**
 * Generated class for the NoticiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-noticia',
  templateUrl: 'noticia.html',
  providers: [
    ApinoticiaProvider
  ]
})


export class NoticiaPage {

  data: any = { articles: [] };

  public objeto_noticia={
    titulo:"leonel",
  }

  //public lista_noticia = new Array<object>();

  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private apinoticiaProvider: ApinoticiaProvider) {
  }
  


  ionViewDidLoad() {
    this.apinoticiaProvider.getLatestNoticia().subscribe(
     data=>{
      this.data = data;
     }, error => {
       console.log(error);
     }
     
    )
  }

}
