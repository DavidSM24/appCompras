import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  charged:boolean=false;
  errorMessage = '';

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private auth:AuthService) { }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.ngZone.run(() => {
          this.router.navigate(['/proveedores']);
          this.charged=true;
        })
      }
      else{

        this.charged=true;
      }         
    })
  }

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  signIn(){
    
    this.errorMessage='';

    let result:boolean=this.auth.signIn(this.loginForm.value.email,this.loginForm.value.password)
    if(!result){
      this.errorMessage='Usuario o contraseña incorrecto.'
    }
  }
  createUser(){
    
    this.errorMessage='';
    
    let result:boolean=this.auth.createUser(this.loginForm.value.email,this.loginForm.value.password)
    if(!result){
      
      if(this.loginForm.value.email.match("")|this.loginForm.value.password.match("")){
        console.log("entro?")
        this.errorMessage='Rellene todos los campos.'
      }
      else if(!this.loginForm.value.email.match("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
      + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")){
        this.errorMessage='Correo electrónico incorrecto.';
      }
      else{
        this.errorMessage="Este usuario ya está registrado, prueba con otro."
      }
      
     
    }
  }

  async googleLogin(){
    
    this.errorMessage='';
    
    try{
      this.auth.loginGoogle();
    }
    catch(error){
      console.log(error);
      this.errorMessage='No se ha podido acceder con su usario. Ya existe un usuario con ese correo y diferentes credenciales.';
    }
    
  }

  async FacebookLogin(){
    
    this.errorMessage='';
    
    try{
      this.auth.loginFacebook();
    }
    catch(error){
      console.log(error);
      this.errorMessage='No se ha podido acceder con su usario. Ya existe un usuario con ese correo y diferentes credenciales.';
    }
    
  }

  async GitLogin(){
    
    this.errorMessage='';
    
    try{
      this.auth.loginGit();
    }
    catch(error){
      console.log(error);
      this.errorMessage='No se ha podido acceder con su usario. Ya existe un usuario con ese correo y diferentes credenciales.';
    }
    
  }

}
