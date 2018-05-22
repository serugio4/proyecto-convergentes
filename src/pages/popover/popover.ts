import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { TabsPage } from '../tabs/tabs'

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  rootPage:any = TabsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _af:FirebaseProvider) {
  }

  cerrarSesion(){
    console.log("Cambie")
    this._af.logout();
  }

}
