import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { DataService } from 'src/app/services/data.service';
import { Paciente } from 'src/app/clases/paciente';
import * as XLSX from 'xlsx';
import { Turno } from 'src/app/clases/turno';
import { Subject } from 'rxjs';
declare var window: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  especialistas:Especialista[];
  pacientes:Paciente[];
  formModal: any;
  usuarioVisible = '';
  turnos = [];
  // turnosFiltrados = [];

  // especialista elegido
  especialista:Especialista = new Especialista("","","",0,"",[""],"","","");
  paciente:Paciente = new Paciente("","",0,"","","","",[""]);
  constructor(private usuarioService:UsuariosService, private spinner:SpinnerService, private data:DataService){}

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('registroModal')
    );
    this.spinner.llamarSpinner();
    this.usuarioService.getEspecialistas$().subscribe(esta => {
      this.especialistas = this.usuarioService.especialistas;
      this.spinner.detenerSpinner();
    });
    this.usuarioService.getPacientes$().subscribe(pac => {
      this.pacientes = this.usuarioService.pacientes;
      this.spinner.detenerSpinner();
    });
    this.data.getTurnosDB().subscribe(turnos => {
      this.turnos = turnos;
    });
  }

  ngAfterViewInit() {
    if(this.usuarioService.getUsuario() != undefined){
      this.especialistas = this.usuarioService.especialistas;
      this.pacientes = this.usuarioService.pacientes;
    }
    if(this.especialistas != undefined){
      this.spinner.detenerSpinner();
    }
  }


  async elegirEspecialista(especialista:Especialista){
    this.especialista = especialista;
    this.usuarioVisible = "especialista";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(1000);
    this.exportExcelPorUsuario();
  }

  async elegirPaciente(paciente:Paciente){
    this.paciente = paciente;
    this.usuarioVisible = "paciente";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(1000);
    this.exportExcelPorUsuario();
  }

  seleccionarEspecialidad(habilitado:boolean){    
    this.especialista.habilitado = habilitado;
    this.data.updateEspecialista(this.especialista);
  }

  exportExcel(){
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ExcelSheet.xlsx');
  }

  exportExcelPorUsuario(){
    let element = document.getElementById('tableTurnos');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ExcelSheet.xlsx');
  }

  abrirModulo(){
    this.formModal.show();
  }

  cerrarModulo(){
    this.formModal.hide();
  }
}
