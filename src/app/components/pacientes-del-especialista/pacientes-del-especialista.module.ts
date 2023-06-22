import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesDelEspecialistaRoutingModule } from './pacientes-del-especialista-routing.module';
import { PacientesDelEspecialistaComponent } from './pacientes-del-especialista.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PacientesDelEspecialistaComponent
  ],
  imports: [
    CommonModule,
    PacientesDelEspecialistaRoutingModule,
    FormsModule
  ]
})
export class PacientesDelEspecialistaModule { }
