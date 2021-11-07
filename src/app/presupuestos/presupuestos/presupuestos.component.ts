import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {

  charged:boolean=false;
  presupuestos: any[] = [];

  constructor(public presupuestosService: PresupuestosService,
    private afAuth:AngularFireAuth,
    private ngZone:NgZone,
    private router:Router) {
    this.presupuestos=this.presupuestosService.getPresupuestos();
  }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (!user) {
        this.router.navigate(['']);
      }
      else{
        this.charged=true;       
      }
    })
  }

  delPresupuesto(presupuesto:any){
    this.presupuestosService.delPresupuesto(presupuesto);
    this.presupuestos=this.presupuestosService.getPresupuestos();
  }

}
