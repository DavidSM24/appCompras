import { Injectable, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { GoogleAuthProvider } from 'firebase/auth'; 
import { FacebookAuthProvider } from '@firebase/auth';
import { TwitterAuthProvider } from '@firebase/auth';
import { GithubAuthProvider } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  User:User|any=null;
  errorMessage = '';
  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.ngZone.run(() => {
          this.User=user;
        })
      }
      else{
        this.User=null;
      }
    })
  }

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  createUser(email:string, password:string):boolean {

    this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/proveedores']);
      return true;
    }).catch((response: { message: string; }) => {
      this.errorMessage = response.message;
      return false;
    });

    return false;
  }

  signIn(email:string, password:string):boolean {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/proveedores']);
        return true;
      })
      .catch(response => {
        this.errorMessage = response.message;
        return false;
      });

      return false;
  }

  async loginGoogle(){
    try{
      return this.afAuth.signInWithPopup(new GoogleAuthProvider())
    }
    catch(error){
      console.log(error);
    }

    return null;
  }

  async loginFacebook(){
    try{
      return this.afAuth.signInWithPopup(new FacebookAuthProvider())
    }
    catch(error){
      console.log(error);
    }

    return null;
  }

  async loginGit(){
    try{
      return this.afAuth.signInWithPopup(new GithubAuthProvider)
    }
    catch(error){
      console.log(error);
    }

    return null;
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['']);
  }

}
