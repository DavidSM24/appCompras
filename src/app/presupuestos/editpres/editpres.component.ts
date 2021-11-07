import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Presupuesto } from 'src/app/model/Presupuesto';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-editpres',
  templateUrl: './editpres.component.html',
  styleUrls: ['./editpres.component.css']
})
export class EditpresComponent implements OnInit {

  charged:boolean=false;

  presupuestoForm: FormGroup | any;
  presupuesto: Presupuesto | any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;
  key: string = "";

  constructor(private pf: FormBuilder,
    private presupuestoService: PresupuestosService,
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

    let tmp = await this.presupuestoService.getPresupuesto(this.key);

    this.afAuth.user.subscribe(user => {
      if (user) {
        this.ngZone.run(() => {

          this.presupuesto = tmp.val();
          this.presupuesto.key = this.key;

          console.log(this.presupuesto);


          this.presupuestoForm = this.pf.group({
            proveedor: [this.presupuesto.proveedor, Validators.required],
            fecha: [this.presupuesto.fecha, Validators.required],
            concepto: [this.presupuesto.concepto, [Validators.required, Validators.minLength(10)]],
            base: [this.presupuesto.base, Validators.required],
            tipo: [this.presupuesto.tipo, Validators.required],
            iva: [{ value: this.presupuesto.iva, disabled: true }, Validators.required],
            total: [{ value: this.presupuesto.total, disabled: true }, Validators.required],
          });

          this.onChanges();

          this.charged=true;
        })
      }
      else {
        this.router.navigate(['']);
        this.charged=true;
      }
    })
  }

  onChanges() {
    this.presupuestoForm.valueChanges.subscribe((valor: { base: any; tipo: any; }) => {
      this.base = valor.base;
      this.tipo = valor.tipo;
      this.presupuestoForm.value.iva = this.base * this.tipo;
      this.presupuestoForm.value.total = this.base + (this.base * this.tipo);
    });
  }

  onSubmit() {
    this.presupuesto = this.savePresupuesto();
    this.presupuestoService.updatePresupuesto(this.presupuesto);
    this.router.navigate(['/presupuestos']);
  }
  savePresupuesto() {
    const savePresupuesto = {
      key: this.key,
      proveedor: this.presupuestoForm.get('proveedor').value,
      fecha: this.presupuestoForm.get('fecha').value,
      concepto: this.presupuestoForm.get('concepto').value,
      base: this.presupuestoForm.get('base').value,
      tipo: this.presupuestoForm.get('tipo').value,
      iva: this.presupuestoForm.get('iva').value,
      total: this.presupuestoForm.get('total').value
    };
    return savePresupuesto;
  }

}
