import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { OnlyAdminsGuard } from './guards/only-admins.guard';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "Login", component: LoginComponent},
  {path: "Usuarios", component: UsuariosComponent, canActivate: [OnlyAdminsGuard]},
  {path: "Registro", component: RegistroComponent},
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