import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { DataService } from 'src/app/services/data.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-pacientes-del-especialista',
  templateUrl: './pacientes-del-especialista.component.html',
  styleUrls: ['./pacientes-del-especialista.component.css']
})
export class PacientesDelEspecialistaComponent implements OnInit{

  turnos:Turno[];
  pacientesTodos:Paciente[];
  pacientes:Paciente[] = [];
  paciente:Paciente = new Paciente("","",0,"","","","",[""]);
  especialistaLogueado:Especialista;

  constructor(private usuarioService:UsuariosService, private spinner:SpinnerService, private data:DataService){}

  ngOnInit(): void {
    this.spinner.llamarSpinner();
    this.usuarioService.getPacientes$().subscribe(pac => {
      this.pacientesTodos = this.usuarioService.pacientes;
      this.spinner.detenerSpinner();
    });
    this.data.getTurnosDB().subscribe(turnos => {
      this.turnos = turnos;
      this.cargarPacientes();
      this.spinner.detenerSpinner();
    });
    this.especialistaLogueado = this.usuarioService.getUsuario();
  }

  ngAfterViewInit() {
    if(this.usuarioService.getUsuario() != undefined){
      this.pacientesTodos = this.usuarioService.pacientes;
    }
    if(this.pacientesTodos != undefined){
      this.spinner.detenerSpinner();
    }
  }

  cargarPacientes(){
    this.turnos.forEach(turno => {
      this.pacientesTodos.forEach(paciente => {
        if(turno.especialista == this.especialistaLogueado.mail && paciente.mail == turno.paciente && turno.estado == "finalizado"){
          if(!this.yaSeAgregoPaciente(paciente.mail)){
            this.pacientes.push(paciente);
          }
        }
      });
    });
  }

  yaSeAgregoPaciente(mail:string){
    let retorno = false;
    this.pacientes.forEach(paciente => {
      if(paciente.mail == mail){
        retorno = true;
      }
    });
    return retorno;
  }

  elegirPaciente(paciente:Paciente){
    this.paciente = paciente;
  }
}
