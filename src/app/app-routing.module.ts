import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { OnlyAdminsGuard } from './guards/only-admins.guard';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';

const routes: Routes = [
  {path: "", component: HomeComponent,  data: { animation: 'fade' }},
  {path: "Login", component: LoginComponent, data: { animation: 'isRight' }},
  {path: "Usuarios", component: UsuariosComponent, canActivate: [OnlyAdminsGuard]},
  {path: "Registro", component: RegistroComponent},
  {path: "MiPerfil", component: MiPerfilComponent, data: { animation: 'isLeft' }},
  {path: "SolicitarTurno", component: SolicitarTurnoComponent},
  {path: "MisTurnos", component: MisTurnosComponent},
  {path: "Estadisticas", component: EstadisticasComponent},
  {path: 'Historia', loadChildren: () => import('./historia/historia.module').then(m => m.HistoriaModule)},
  {path: 'Pacientes', loadChildren: () => import('./components/pacientes-del-especialista/pacientes-del-especialista.module').then(m => m.PacientesDelEspecialistaModule)},
  {path: "**", component: ErrorComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }