import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { conditionallyCreateMapObjectLiteral, getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { PresupuestosComponent } from '../presupuestos/presupuestos/presupuestos.component';
import { Presupuesto } from '../model/Presupuesto';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {

  constructor(private db: AngularFireDatabase) { }

  postPresupuesto(presupuesto: any) {

    let P = {
      proveedor: presupuesto.proveedor,
      fecha: presupuesto.fecha,
      concepto: presupuesto.concepto,
      base: presupuesto.base,
      tipo: presupuesto.tipo,
      iva: presupuesto.iva,
      total: presupuesto.total
    }

    /*
      this.db
      .database.ref()
      .child("presupuestos").child("otro").set(P)  
  
  }*/

    this.db.database.ref().child("presupuestos").push(P);

    //create y update
    //.child("jugadores").child("pepe").remove();  //remove
    //.push({'nombre':'carlos','dorsal':10});  //autocreate

    /*
    this.db.database.ref().child("jugadores").get().then((data)=>{
      console.log(data.key);
      console.log(data.val())
      const jugadores=data.val();
      for(let jugador in jugadores){
        console.log(jugadores[jugador])
      }
    })  //listar

    //this.db.list("/jugadores").remove();
    //this.db.list("/jugadores").push({'nombre':'carlos'})
    this.db.list("/jugadores/carlos").valueChanges().subscribe(data=>{
      console.log(data);
    })*/

  }

  async getPresupuesto(id: string): Promise<firebase.default.database.DataSnapshot> {
  
    return this.db.database.ref().child("presupuestos").child(id).get();
  }

  getPresupuestos(): any[] {
    let result: Presupuesto[] = [];
    this.db.database.ref().child("presupuestos").get().then((data) => {

      const presupuestos = data.val();
      for (let presupuesto in presupuestos) {
        result.push({ key: presupuesto, ...presupuestos[presupuesto] });
      }
    });
    return result;
  }

  updatePresupuesto(presupuesto: any) {

    let P = {
      proveedor: presupuesto.proveedor,
      fecha: presupuesto.fecha,
      concepto: presupuesto.concepto,
      base: presupuesto.base,
      tipo: presupuesto.tipo,
      iva: presupuesto.iva,
      total: presupuesto.total
    }

    this.db
      .database.ref()
      .child("presupuestos").child(presupuesto.key).set(P);
  }

  delPresupuesto(presupuesto:Presupuesto|any) {
    this.db.database.ref().child("presupuestos").child(presupuesto.key).remove();
  }

}
