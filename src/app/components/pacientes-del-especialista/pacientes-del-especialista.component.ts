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

  getFechas(paciente:string){
    let turnosAux = [];
    this.turnos.forEach(t => {
      if(t.paciente == paciente && t.fecha != ""){
        turnosAux.push(t.fecha);
      }
    });
    turnosAux = this.ordenarFechas([...turnosAux]);
    
    return turnosAux;
  }

  ordenarFechas(turnosAux:string[]){
    return turnosAux.sort((n1,n2) => {
      if(n1 == n2){
        return 0;
      }
      let n1Split = n1.split("/");
      let n2Split = n2.split("/");
      if(n1Split[2] > n2Split[2]){
        return -1;
      }
      else if(n1Split[2] == n2Split[2] && n1Split[1] > n2Split[1]){
        return -1;
      }
      else if(n1Split[2] == n2Split[2] && n1Split[1] == n2Split[1] && n1Split[0] > n2Split[0]){
        return -1;
      }
      return 1;
    });
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
