import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesDelEspecialistaComponent } from './pacientes-del-especialista.component';

const routes: Routes = [{ path: '', component: PacientesDelEspecialistaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesDelEspecialistaRoutingModule { }
