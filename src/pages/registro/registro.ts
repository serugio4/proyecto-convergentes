import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../interfaces/modelos';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ToastController } from 'ionic-angular';

/**    
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  usuarioNuevo:Usuario ={
    id:"",
    nombre:"",
    apellido:"",
    cedula:"",
    prestada:null,
    fNacimiento:""
  }
  email:string;
  password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public _fb:FirebaseProvider, public toastCtrl: ToastController ) {
  }

  registrar(){
    this._fb.crearUsuario( this.email, this.password  ).then(
      resp => {
        this.usuarioNuevo.id = resp.uid
        this._fb.usuarioCollection.doc( resp.uid ).set( this.usuarioNuevo ).then(
          resp => {
            let toast = this.toastCtrl.create({
              message: 'Se creo exitosamente el usuario',
              duration: 3000
            });
            toast.present();
            }
        )
      }
    ).catch(
      err => {
        console.log("Falle")
        let toast = this.toastCtrl.create({
          message: err,
          duration: 3000
        });
        toast.present();
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

}
