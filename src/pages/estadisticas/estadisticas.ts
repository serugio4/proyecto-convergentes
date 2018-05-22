import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Viaje } from '../../interfaces/modelos';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';


@Component({
  selector: 'page-about',
  templateUrl: 'estadisticas.html'
})
export class EstadisticasPage {

  cantidadViajes:number = null;
  viajesUsuario:Viaje[];

  constructor(public navCtrl: NavController, private _fb:FirebaseProvider,
       private popoverCtrl:PopoverController ) {
    if(this._fb.usuario){
      this._fb.usuarioCollection.doc( this._fb.usuario.id  ).collection<Viaje>('viajes')
        .valueChanges().subscribe( docs =>{
            this.cantidadViajes = docs.length;
            this.viajesUsuario = docs;
        } );
    }
  }

  presentPopover() {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present();
}

}
