import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginPage } from '../login/login';
import { MostraHistoricoPage } from '../mostra-historico/mostra-historico';
import { ServicoProvider } from '../../providers/servico/servico';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { ConstantesComponent } from '../../components/constantes/constantes';

@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html'
})
export class HistoricoPage {
  public alertController: AlertController;
  Constantes: ConstantesComponent = new ConstantesComponent;
  apiUrl: string;
  token: string;
  expires: string;
  socket: any;
  idUsu: string;
  notificacao: string;
  existe: boolean = true;
  public dadosAluno: any = {
    _id: "",
    nome: "",
    cpf: "",
    IMC: "",
    msg: "",
    idade: "",
    peso: "",
    massaMagra: "",
    massaGorda: "",
    altura: "",
    dataInicio: ""
  }
  evolucaoExiste: boolean = false;

  public data: Date;

  public listaTreinos: any = { treino: {}, treinos: [], itemExercicio: [] };

  public evolucaoLista: any = [];

  headers: HttpHeaders;

  foto: any = 'assets/imgs/logobrandao.png';

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    private alertCtrl: AlertController,
    private camera: Camera,
    private toastCtrl: ToastController, private servicoProvider: ServicoProvider) {
    this.apiUrl = this.Constantes.url;
    this.headers = new HttpHeaders();
    this.token = localStorage.getItem("tokenAppPM");
    this.expires = localStorage.getItem("expiresAppPM");
    this.headers = this.headers.append('Authorization', this.token);
    if (new Date(this.expires) < new Date()) {
      this.navCtrl.push(LoginPage);
    }
    this.idUsu = localStorage.getItem('idUsuaAppPM');

    this.buscaAlunoLocal();
    this.buscaTreinoLocal();
    this.buscaEvolucaoLocal();

    this.buscaAluno();
    this.buscaTreinos();
    this.buscaEvolucao();

    this.buscaFotoLocal();
  }

  buscaAluno() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'alunos/' + this.idUsu, { headers: this.headers }).subscribe(res => {
        this.dadosAluno = res;
        this.servicoProvider.remove("aluno");
        this.servicoProvider.save("aluno", this.dadosAluno);
      }, error => {
        console.log("error");
      });
    });
  }

  buscaAlunoLocal() {
    this.servicoProvider.getAluno().then(aluno => {
      this.dadosAluno = aluno;
      console.log();
    });
  }

  buscaTreinos() {
    this.existe = false;
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'treinos/' + this.idUsu, { headers: this.headers }).subscribe(res => {
        this.listaTreinos = res;
        if (this.listaTreinos.treinos.length > 0) {
          this.servicoProvider.remove("treino");
          this.servicoProvider.save("treino", this.listaTreinos);
          this.existe = true;
        } else {
          this.existe = false;
        }
      }, error => {
        console.log("error");
      });
    });
  }

  buscaTreinoLocal() {
    this.servicoProvider.getTreino().then(treino => {
      this.listaTreinos = treino;
      this.buscaTreinos();
    });
  }

  buscaEvolucao() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'evolucaos/mobile/evolucao/' + this.idUsu, { headers: this.headers }).subscribe(res => {
        this.evolucaoLista = res;
        if (this.evolucaoLista.length > 0) {
          this.servicoProvider.remove("evolucao");
          this.servicoProvider.save("evolucao", this.evolucaoLista);
          this.evolucaoExiste = true;
        } else {
          this.evolucaoExiste = false;
        }
      }, error => {
        console.log("error");
      });
    });
  }

  buscaEvolucaoLocal() {
    this.servicoProvider.getEvolucao().then(evolucao => {
      this.evolucaoLista = evolucao;
      if (this.evolucaoLista.length > 0) {
        this.evolucaoExiste = true;
      }
    });
  }

  buscaTreino(id, treino, nomeTreino) {
    this.navCtrl.push(MostraHistoricoPage, {
      id: id,
      treino: treino,
      nomeTreino: nomeTreino
    });
  }

  sair() {


    let alert = this.alertCtrl.create({
      title: 'Deseja sair do app?',
      buttons: [
        {
          text: 'Sim',
          role: 'sim',
          handler: () => {

            this.navCtrl.parent.parent.push(LoginPage, {sair:'1'});
              
          }
        },
        {
          text: 'Não',
          handler: () => {
          }
        }
      ]
    });
    alert.present();





 
  }

  notificacaoAlert() {
    let alert = this.alertCtrl.create({
      title: 'Notificação',
      subTitle: this.notificacao,
      buttons: ['Fechar']
    });
    alert.present();
  }

  buscaFotoLocal() {
    this.servicoProvider.getFoto().then(foto => {
      if (foto != null) {
        this.foto = foto;
      } else {
        this.foto = 'assets/imgs/logobrandao.png';
      }
    });
  }

  receive() {
    this.socket.on('notificacao', (notificacao, id) => {
      if (JSON.stringify(id) === JSON.stringify(this.idUsu)) {
        this.notificacao = notificacao;
        this.notificacaoAlert();
        this.buscaTreinos();
      }
    });
  }

  presentAlert() {

    let confirm = this.alertCtrl.create({
      title: 'Alterar foto do perfil',
      //message: 'Essa alteração é permanente!',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            //inicio2
            let confirma = this.alertCtrl.create({
              title: 'Essa alteração é permanente!',
              //    message: 'Essa alteração é permanente!',
              buttons: [
                {
                  text: 'Tirar Foto',
                  handler: () => {
                    let alert = this.alertCtrl.create({
                      title: 'A foto deve ser tirada na horizontal',
                      buttons: [
                        {
                          text: 'ok',
                          role: 'cancel',
                          handler: () => {
                            const options: CameraOptions = {
                              quality: 100,
                              destinationType: this.camera.DestinationType.DATA_URL,
                              encodingType: this.camera.EncodingType.JPEG,
                              mediaType: this.camera.MediaType.PICTURE
                            };

                            this.camera.getPicture(options).then((imageData) => {
                              let base64Image = 'data:image/jpeg;base64,' + imageData;

                              this.foto = base64Image;
                              this.servicoProvider.remove("foto");
                              this.servicoProvider.save("foto", this.foto);

                            }, (err) => {
                              this.toastCtrl.create({
                                message: 'Não foi possível tirar a foto',
                                duration: 2000,
                                position: 'top'
                              }).present();
                            });
                          }
                        },

                      ]
                    });
                    alert.present();

                  }
                },
                {
                  text: 'Galeria',
                  handler: () => {

                    const options: CameraOptions = {
                      quality: 100,
                      destinationType: this.camera.DestinationType.DATA_URL,
                      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                      mediaType: this.camera.MediaType.PICTURE,
                      saveToPhotoAlbum: false
                    }
                    this.camera.getPicture(options).then((ImageData) => {
                      let base64Image = 'data:image/jpeg;base64,' + ImageData;
                      this.foto = base64Image;
                      this.servicoProvider.remove("foto");
                      this.servicoProvider.save("foto", this.foto);

                    }, (err) => {
                      this.toastCtrl.create({
                        message: 'Não foi possível tirar a foto',
                        duration: 2000,
                        position: 'top'
                      }).present();
                    });



                  }
                },
                {
                  text: 'Remover',
                  handler: () => {
                    this.foto = 'assets/imgs/logobrandao.png';

                  }
                },
                //final 

              ]
            });

            confirma.present();
          }
        },
        {
          text: 'Não',
          handler: () => {

          }
        },

      ]
    });

    confirm.present();
  }




}
