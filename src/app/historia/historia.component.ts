import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Paciente } from '../clases/paciente';
import { SpinnerService } from '../services/spinner.service';
import { DataService } from '../services/data.service';
import { HistoriaClinica } from '../clases/historia-clinica';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent implements OnInit{

  mail = "";
  paciente:Paciente = new Paciente("","",0,"","","","",[""]);
  historias:HistoriaClinica[] = [];

  constructor(private usuarioService:UsuariosService,private spinner:SpinnerService,private data:DataService){}

  ngOnInit(): void {
    this.spinner.llamarSpinner();
    this.mail = history.state.mail;
    this.usuarioService.getPacientes$().subscribe(pacientes => {
      this.cargarPacientes();
      this.spinner.detenerSpinner();
    });
    this.data.getHistoriaDB().subscribe(historias => {
      this.cargarPacientes();
      this.spinner.detenerSpinner();
    });
  } 

  ngAfterViewInit() {
    let pac = undefined;
    if(this.usuarioService.getUsuario() != undefined){
      pac = this.usuarioService.pacientes;
      this.cargarPacientes();
    }
    if(pac != undefined){
      this.spinner.detenerSpinner();
    }
  }

  cargarPacientes(){
    this.historias = [];
    this.usuarioService.pacientes.forEach(paciente => {
      if(this.mail == paciente.mail){
        this.paciente = paciente;
      }
    });
    this.data.historias.forEach(historias => {
      if(historias.paciente == this.paciente.mail){
        this.historias.push(historias);
      }
    });
  }
}

