import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  
  charged:boolean=false;
  proveedores:any[]=[];

  constructor(private proveedoresService: ProveedoresService,
    private afAuth:AngularFireAuth,
    private ngZone:NgZone,
    private router:Router) { 
      this.proveedores=this.proveedoresService.getProveedores();
    }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (user) {
           
        this.ngZone.run(() => {
          
          this.proveedores=this.proveedoresService.getProveedores();
          this.charged=true;
        })
      }
      else{           
        this.router.navigate(['']);
        this.charged=true;
      }         
    })
    
  }

  delProveedor(proveedor:any){
    this.proveedoresService.delProveedor(proveedor);
    this.proveedores=this.proveedoresService.getProveedores();
  }

}
