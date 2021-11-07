import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-addprovee',
  templateUrl: './addprovee.component.html',
  styleUrls: ['./addprovee.component.css']
})
export class AddproveeComponent implements OnInit {

  proveedorForm: FormGroup | any;
  charged: boolean = false;
  provincias: string[] = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
    'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
    'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo',
    'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas',
    'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
    'Zamora', 'Zaragoza']

  proveedor: any = null;

  constructor(private proveedorService: ProveedoresService,
    private pf: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone) {

    this.proveedor = {
      nombre: '',
      cif: '',
      direccion: '',
      cp: '',
      localidad: '',
      provincia: '',
      telefono: null,
      email: '',
      contacto: ''
    }

  }
  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (!user) {
        this.router.navigate(['']);
        this.charged = true;
      }
      else {

        this.proveedorForm = this.pf.group({

          nombre: [this.proveedor.nombre, Validators.required],
          cif: [this.proveedor.cif, Validators.required],
          direccion: [this.proveedor.direccion, Validators.required],
          cp: [this.proveedor.cp, Validators.required],
          localidad: [this.proveedor.localidad, Validators.required],
          provincia: [this.proveedor.provincia, Validators.required],
          telefono: [this.proveedor.telefono, Validators.required],
          email: [this.proveedor.email, Validators.required],
          contacto: [this.proveedor.contacto, Validators.required]

        });

        this.charged = true;
      }
    })
  }

  onSubmit() {

    this.proveedor = this.saveProveedor();
    this.proveedorService.postProveedores(this.proveedor);
    this.proveedorForm.reset();
  }

  saveProveedor() {
    const saveProveedor = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      direccion: this.proveedorForm.get('direccion').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto: this.proveedorForm.get('contacto').value
    };
    return saveProveedor;
  }
}

