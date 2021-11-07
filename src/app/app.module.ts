import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { InicioComponent } from './inicio/inicio.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AddproveeComponent } from './proveedores/addprovee/addprovee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { PresupuestosService } from './servicios/presupuestos.service';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { PresupuestosComponent } from './presupuestos/presupuestos/presupuestos.component';
import { EditpresComponent } from './presupuestos/editpres/editpres.component';
import { EditprovComponent } from './proveedores/editprov/editprov.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'addprovee', component: AddproveeComponent },
  { path: 'editprov/:key', component: EditprovComponent },
  { path: 'addpres', component: AddpresComponent},
  { path: 'presupuestos', component: PresupuestosComponent },
  { path: 'editpres/:key', component: EditpresComponent },
  { path: '**', component: InicioComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    InicioComponent,
    HeaderComponent,
    AddproveeComponent,
    AddpresComponent,
    PresupuestosComponent,
    EditpresComponent,
    AddproveeComponent,
    EditprovComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  exports: [ProveedoresComponent],
  providers: [ProveedoresService, PresupuestosService,AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
