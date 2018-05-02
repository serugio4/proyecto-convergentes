import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AlertController } from 'ionic-angular';
import { Usuario } from '../../interfaces/modelos';


@Component({
  selector: 'page-home',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  registro = RegistroPage;
  email:string;
  passwd:string;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
    public _fb:FirebaseProvider, public alertCtrl: AlertController ) {

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
    )
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

}
