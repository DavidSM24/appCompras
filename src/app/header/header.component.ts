import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logged=false;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private auth:AuthService) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.ngZone.run(() => {
          this.logged=true;
          this.router.navigate(['/proveedores']);
        })
      }
    })
  }

  logout(){
    this.auth.logout();
    this.logged=false;
  }

}
