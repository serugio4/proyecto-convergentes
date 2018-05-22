import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AlertController } from 'ionic-angular';
import { Usuario } from '../../interfaces/modelos';
import { ToastController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';



@Component({
  selector: 'page-home',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  registro = RegistroPage;
  email:string;
  passwd:string;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
    public _fb:FirebaseProvider, public alertCtrl: AlertController, public toastCtrl: ToastController,
      private popoverCtrl:PopoverController) {

  }

  iniciarSesion(){
    this._fb.login( this.email, this.passwd ).then(
      (resp)=>{
        this._fb.usuarioCollection.doc<Usuario>( resp.uid ).valueChanges()
          .subscribe(
            user =>{
              this._fb.usuario = user;
              console.log(user);
            }
          )
      }
    ).catch(
      err =>{
        console.log("Falle")
        let toast = this.toastCtrl.create({
          message: err,
          duration: 3000
        });
        toast.present();
      }
    );

  }

  actualizarDatos( usuarioCambios:Usuario ){
    this._fb.guardarDatos( usuarioCambios ).then(
      resp=>{
        let alert = this.alertCtrl.create({
          title: 'Confirmacion',
          subTitle: 'Se actualizaron tus datos exitosamente',
          buttons: ['OK']
        });
        alert.present();
      }
    )
  }

  presentLoading() {
  let loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 3000
  });
  loader.present();
  }

  presentPopover() {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present();
}

}
