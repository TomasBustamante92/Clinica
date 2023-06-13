import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { DataService } from 'src/app/services/data.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var window: any;

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit{

  usuario:any;
  turnos:Turno[] = [];
  turnosFiltrados:Turno[] = [];
  turnosFiltrados$:Subject<Turno[]>;
  turnoElegido:Turno;
  fechaAux:string;
  especialistaNombreCompleto = "";
  especialista:Especialista;
  especialidad:string;
  estado:string = "";  
  comentario = "";

  // Filtro
  especialistas:Especialista[] = [];
  especialidades:Especialidad[] = [];
  pacientes:Paciente[] = [];

  // Popup
  formModal: any;
  popUpRazon = "";
  mensajeError = "";
  estrellas:number = 0;

  constructor(private usuarioService:UsuariosService, private data:DataService , private spinner:SpinnerService){}

  ngOnInit(): void {
    this.turnosFiltrados$ = new Subject();
    this.spinner.llamarSpinner();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('cancelarTurno')
    );
    this.data.getEspecialidades().subscribe(esp => {
      this.especialidades = esp;
    });
    this.data.getTurnosDB().subscribe(turnos => {
      this.especialistas = this.usuarioService.especialistas;
      this.pacientes = this.usuarioService.pacientes;
      this.turnos = [];
      turnos.forEach(turno => {
        this.usuario = this.usuarioService.getUsuario();
        if(this.usuario.tipo == "Paciente" && turno.paciente == this.usuario.mail){
          this.turnos.push(turno);
        }
        else if(this.usuario.tipo == "Especialista" && turno.especialista == this.usuario.mail){
          this.turnos.push(turno);
        }
      });
      this.ordernarListaTurnos();
      this.spinner.detenerSpinner();
      this.turnosFiltrados = this.turnos;
      this.turnosFiltrados$.next(this.turnos);
    });
    this.turnosFiltrados$.subscribe(turnos => {
      this.turnosFiltrados = turnos;
    });
  }

  verTurno(especialista:string){
    this.turnos.forEach(turno => {
      if(turno.especialista == especialista){
        this.turnoElegido = turno;
        this.fechaAux = turno.hora + "Hs " + turno.dia + " " + turno.mes + " " + turno.anio;
        this.especialidad = turno.especialidad;
        this.buscarEspecialista(turno.especialista);
        this.estado = turno.estado;
        this.comentario = turno.comentario;
      }
    });
  }

  calificar(estrellas:number){
    this.estrellas = estrellas;
  }

  filtarTurnos(filtro:string, tipo:string){
    this.turnosFiltrados = [];
    this.turnos.forEach(turno => {
      if(filtro == 'sinFiltro'){
        this.turnosFiltrados.push(turno);
      }
      else if(tipo == "especialidades" && turno.especialidad == filtro){
        this.turnosFiltrados.push(turno);
      }
      else if(tipo == "especialistas" && turno.especialista == filtro){
        this.turnosFiltrados.push(turno);
      }
      else if(tipo == "pacientes" && turno.paciente == filtro){
        this.turnosFiltrados.push(turno);
      }
    });
    this.turnosFiltrados$.next(this.turnosFiltrados);
  }

  abrirPopUp(razon:string){
    this.popUpRazon = razon;
    this.formModal.show();
  }

  cerrarPopUp(){
    this.formModal.hide();
  }

  buscarEspecialista(mail:string){
    this.usuarioService.especialistas.forEach(esp => {
      if(esp.mail == mail){
        this.especialista = esp;
        this.especialistaNombreCompleto = esp.nombre + " " + esp.apellido;
      }
    });
  }

  ordernarListaTurnos(){
    this.turnos.sort((one, two) => {
      if(one.anio < two.anio){
        return 1;
      }
      else if(one.anio == two.anio && this.mesToNumber(one.mes) < this.mesToNumber(two.mes)){
        return 1;
      }
      else if(one.anio == two.anio && one.mes == two.mes && one.dia < two.dia){
        return 1;
      }
      return -1;
    });
  }

  cancelarTurno(){
    if(this.comentario == ""){
      this.mensajeError = "Complete el comentario";
    }
    else{
      this.turnoElegido.estado = "cancelado";
      this.turnoElegido.comentario = this.comentario;
      this.data.updateTurnos(this.turnoElegido);
      this.cerrarPopUp();
    }
  }

  calificarTurno(){
    console.log(this.comentario)
    if(this.comentario == ""){
      this.mensajeError = "Complete el comentario";
    }
    else{
      this.turnoElegido.comentario = this.comentario;
      this.data.updateTurnos(this.turnoElegido);
      this.cerrarPopUp();
    }
  }

  resetearMensajeError(){
    this.mensajeError = "";
  }

  mesToNumber(mes:string){
    let numero = -1;
    switch(mes){
      case "Enero":
        numero = 1;
        break;
      case "Febrero":
        numero = 2;
        break;
      case "Marzo":
        numero = 3;
        break;
      case "Abril":
        numero = 4;
        break;
      case "Mayo":
        numero = 5;
        break;
      case "Junio":
        numero = 6;
        break;
      case "Julio":
        numero = 7;
        break;
      case "Agosto":
        numero = 8;
        break;
      case "Septiembre":
        numero = 9;
        break;
      case "Octubre":
        numero = 10;
        break;
      case "Noviembre":
        numero = 11;
        break;
      case "Diciembre":
        numero = 12;
        break;
    }
  }
}
