import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable';
import { Parqueadero } from '../../interfaces/modelos'
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';


@Component({
  selector: 'page-contact',
  templateUrl: 'mapa.html'
})
export class MapaPage {

  lat: number = 4.6255594;
  lng: number = -74.1387344;
  zoom:number = 12;
  parqueaderos:Observable<Parqueadero[]>

  constructor(public navCtrl: NavController, public _fb:FirebaseProvider,
      private popoverCtrl:PopoverController) {
    this.parqueaderos = _fb.parqueaderosCollection.valueChanges();
  }

  presentPopover() {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present();
}

}
