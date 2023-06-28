import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { ImgHoverDirective } from './directivas/img-hover.directive';
import { FiltrarTurnosPipe } from './pipes/filtrar-turnos.pipe';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { MesStringPipe } from './pipes/mes-string.pipe';
import { DiaStringPipe } from './pipes/dia-string.pipe';
import { InhabilitarBotonDirective } from './directivas/inhabilitar-boton.directive';
import { HoverColorearDirective } from './directivas/hover-colorear.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ErrorComponent,
    HomeComponent,
    UsuariosComponent,
    MiPerfilComponent,
    SolicitarTurnoComponent,
    MisTurnosComponent,
    ImgHoverDirective,
    FiltrarTurnosPipe,
    EstadisticasComponent,
    CalendarioComponent,
    MesStringPipe,
    DiaStringPipe,
    InhabilitarBotonDirective,
    HoverColorearDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    BsDropdownModule,
    provideAuth(() => getAuth()),
    NgxCaptchaModule,
    ReactiveFormsModule,
  ],
  providers: [DataService, BsDropdownConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
