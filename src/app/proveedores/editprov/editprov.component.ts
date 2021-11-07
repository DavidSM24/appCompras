import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Presupuesto } from 'src/app/model/Presupuesto';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-editprov',
  templateUrl: './editprov.component.html',
  styleUrls: ['./editprov.component.css']
})
export class EditprovComponent implements OnInit {

  key: string = "";

  charged:boolean=false;
  provincias: string[] = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
    'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
    'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo',
    'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas',
    'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
    'Zamora', 'Zaragoza']

  proveedorForm: FormGroup | any;
  proveedor: Presupuesto | any;

  constructor(private pf: FormBuilder,
    private proveedoresService: ProveedoresService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private ngZone: NgZone) {
    this.activatedRouter.params
      .subscribe(parametros => {
        this.key = parametros['key'];

      });
  }

  async ngOnInit() {

    let tmp = await this.proveedoresService.getProveedor(this.key);

    this.afAuth.user.subscribe(user => {
      if (user) {

        this.proveedor = tmp.val();

        console.log(this.proveedor.nombre);

        this.proveedor.key = this.key;
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

        this.charged=true;

      }

      else{
        this.router.navigate(['']);
        this.charged=true;
      }
    })
  }

  onSubmit() {
    this.proveedor = this.saveProveedor();
    this.proveedoresService.updateProveedor(this.proveedor);
    this.router.navigate(['/proveedores']);
  }
  saveProveedor() {
    const saveProveedor = {
      key: this.key,
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
