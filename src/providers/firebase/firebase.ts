import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario, Parqueadero, Bicicleta } from '../../interfaces/modelos';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

    usuarioCollection:AngularFirestoreCollection<Usuario>;
    parqueaderosCollection:AngularFirestoreCollection<Parqueadero>;
    usuario:Usuario;

    constructor( public fauth:AngularFireAuth, private db:AngularFirestore ) {
      this.db.firestore.settings( { timestampsInSnapshots: true } );
      this.usuarioCollection = this.db.collection('usuarios')
      this.parqueaderosCollection = this.db.collection('parqueaderos')
    }

    crearUsuario(email:string, password:string):Promise<any>{
      return this.fauth.auth.createUserWithEmailAndPassword(email, password)
    }

    login( email:string, password:string ):Promise<any> {
      return this.fauth.auth.signInWithEmailAndPassword(email, password)
    }

    logout():void{
      this.fauth.auth.signOut().then(
        resp => {
          localStorage.removeItem('usuario');
        }
      );
    }

    guardarDatos( usuario:Usuario ):Promise<any>{
      return this.usuarioCollection.doc( usuario.id ).update( usuario );
    }

/*    crearParqueadero( parqueadero:Parqueadero ):Promise<any>{
      return this.parqueaderosCollection.add( parqueadero )
    }

    eliminarParqueadero( parqueadero:Parqueadero ):Promise<any> {
      return this.parqueaderosCollection.doc( parqueadero.id ).delete()
    }

    actualizarParqueadero( parqueadero:Parqueadero ):Promise<any>{
      return this.parqueaderosCollection.doc( parqueadero.id ).update( parqueadero );
    }

    tomarPrestadaBicicleta( idBicicleta:string, parqueadero:Parqueadero ): Promise<any>{
      let viajes:Viaje = {
        parqueaderoOrigen:parqueadero.nombre,
        horaPrestamo: new Date()
      }
      return this.bicicletasCollection.doc( idBicicleta ).collection('viajes')
                  .add( viajes ).then(
                    (resp) =>{
                      this.bicicletasCollection.doc( idBicicleta ).update( { 'prestada':resp.id } );
                    }
                  );
    }

   regresarBicicleta( viaje:Viaje ){
      this.bicicletasCollection.doc<Bicicleta>( viaje.idBicicleta )
        .valueChanges()
            .subscribe( resp =>{
              let bicicleta:Bicicleta =  resp;
              this.bicicletasCollection.doc( viaje.idBicicleta ).collection('viajes')
                .doc<Viaje>(bicicleta.prestada).update( viaje );
            })
    }*/



  }
