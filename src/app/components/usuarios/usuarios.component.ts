import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { DataService } from 'src/app/services/data.service';
import { Paciente } from 'src/app/clases/paciente';
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


  elegirEspecialista(especialista:Especialista){
    this.especialista = especialista;
    this.usuarioVisible = "especialista";
  }

  elegirPaciente(paciente:Paciente){
    this.paciente = paciente;
    this.usuarioVisible = "paciente";
  }

  seleccionarEspecialidad(habilitado:boolean){    
    this.especialista.habilitado = habilitado;
    this.data.updateEspecialista(this.especialista);
  }

  abrirModulo(){
    this.formModal.show();
  }

  cerrarModulo(){
    this.formModal.hide();
  }
}
