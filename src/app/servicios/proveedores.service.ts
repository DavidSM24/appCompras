import { Injectable } from '@angular/core';
import { Proveedor } from '../model/Proveedor';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private db: AngularFireDatabase) { }

  postProveedores(proveedor:Proveedor|any){
    let P = {
      nombre:proveedor.nombre,
      cif: proveedor.cif,
      direccion: proveedor.direccion,
      cp: proveedor.cp,
      localidad: proveedor.localidad,
      provincia: proveedor.provincia,
      telefono: proveedor.telefono,
      email: proveedor.email,
      contacto: proveedor.contacto
    }

    this.db.database.ref().child("proveedores").push(P);
  }

  async getProveedor(id: string): Promise<firebase.default.database.DataSnapshot> {
  
    return this.db.database.ref().child("proveedores").child(id).get();
  }

  getProveedores(): any[] {
    let result: Proveedor[] = [];
    this.db.database.ref().child("proveedores").get().then((data) => {

      const proveedores = data.val();
      for (let proveedor in proveedores) {
        result.push({ key: proveedor, ...proveedores[proveedor] });
      }
    });
    return result;
  }

  updateProveedor(proveedor: any) {

    let P = {
      nombre:proveedor.nombre,
      cif: proveedor.cif,
      direccion: proveedor.direccion,
      cp: proveedor.cp,
      localidad: proveedor.localidad,
      provincia: proveedor.provincia,
      telefono: proveedor.telefono,
      email: proveedor.email,
      contacto: proveedor.contacto
    }

    this.db
      .database.ref()
      .child("proveedores").child(proveedor.key).set(P);
  }

  delProveedor(proveedor:Proveedor|any) {
    this.db.database.ref().child("proveedores").child(proveedor.key).remove();
  }
}
