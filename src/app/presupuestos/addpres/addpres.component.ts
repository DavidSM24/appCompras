import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpres',
  templateUrl: './addpres.component.html',
  styleUrls: ['./addpres.component.css']
})
export class AddpresComponent implements OnInit {

  charged:boolean=false;

  presupuestoForm: FormGroup | any;
  presupuesto: any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;

  constructor(private pf: FormBuilder, 
    private presupuestoService:PresupuestosService,
    private afAuth: AngularFireAuth,
    private router:Router,
    private ngZone:NgZone) {
    
      this.presupuestoForm = this.pf.group({
      proveedor: ['', Validators.required],
      fecha: ['', Validators.required],
      concepto: ['', [Validators.required, Validators.minLength(10)]],
      base: ['', Validators.required],
      tipo: ['', Validators.required],
      iva: [{value: '', disabled: true}, Validators.required],
      total: [{value: '', disabled: true}, Validators.required]
    });
  }

  ngOnInit() {
    
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.ngZone.run(() => {
          
          this.presupuestoForm = this.pf.group({
            proveedor: ['', Validators.required],
            fecha: ['', Validators.required],
            concepto: ['', [Validators.required, Validators.minLength(10)]],
            base: ['', Validators.required],
            tipo: ['', Validators.required],
            iva: [{value: '', disabled: true}, Validators.required],
            total: [{value: '', disabled: true}, Validators.required]
          });
          this.onChanges();

          this.charged=true;
        })
      } 
      else{
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
    this.presupuestoService.postPresupuesto(this.presupuesto);
    this.presupuestoForm.reset();
  }

  savePresupuesto() {
    const savePresupuesto = {
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
