import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { Turno } from 'src/app/clases/turno';
import { DataService } from 'src/app/services/data.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit{
  
  // DIAS
  hoy:Date = new Date();
  now:Date = new Date();
  dia:string = this.now.getDate().toString();
  mesNumero:number = this.now.getMonth();
  mes:string = this.mesNumeroToString(this.mesNumero);
  anio:string = this.now.getFullYear().toString();
  hora:number = this.now.getHours();
  diaString:string = this.diaSemanaString(this.now.getDay());
  restarDia = false;
  sumarDia = true;

  // HORARIOS
  horarios:string[] = ["8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
    "16:00","16:30","17:00","17:30","18:00","18:30"];
  horariosDisponibles:string[] = [];

  // DOM
  etapa = "especialidad";

  // MOSTRAR SOLO HORARIOS DISPONIBLEEEEEEEEES
  // Especialidades
  especialidades:string[] = [];
  especialidadElegida = "";
  especialistasTodos:Especialista[] = [];
  especialistas:Especialista[] = [];
  especialistaElegido:Especialista;
  especialistaElegidoStr = "";
  diaElegido = "";
  horarioElegido = "";

  constructor(private data:DataService, private spinner:SpinnerService, private usuarioService:UsuariosService, private router: Router){}
  
  ngOnInit(): void {
    this.spinner.llamarSpinner();
    this.data.getEspecialidades().subscribe(esp => {
      this.spinner.detenerSpinner();
      this.especialidades = [];
      esp.forEach(e => {
        this.especialidades.push(e.nombre);
      });
      this.ordernarListaEspecialidades();
      this.especialistasTodos = [];
      this.usuarioService.especialistas.forEach(esp => {
        this.especialistasTodos.push(esp);
      });
    });
  }

  elegirEspecialidad(esp:string){
    this.especialidadElegida = esp;
    this.especialistasTodos.forEach((especialista) => {
      especialista.especialidades.forEach(especialidad => {
        if(especialidad == esp){
          this.especialistas.push(especialista);
        }
      });
    });
    this.volver("especialista");
  }

  cargarEspecialistas(){

  }

  elegirHorario(horario:string){
    this.horarioElegido = horario;
    this.diaElegido = horario + " Hrs. " + this.diaString + " " + this.dia + " de " + this.mes;
    this.volver("confirmar");
  }

  confirmar(){
    this.data.cargarTurnosBD(new Turno("",this.usuarioService.getUsuario().mail, this.especialistaElegido.mail,this.especialidadElegida,
    this.dia,this.mes,this.anio,this.horarioElegido,"pendiente","","",""));
    this.volver("fin");
  }

  elegirEspecialista(nombre:string, apellido:string){
    let indice = -1;
    this.especialistas.forEach((esp, index) => {
      if(esp.nombre == nombre && esp.apellido == apellido){
        indice = index;
      }
    });
    this.especialistaElegido = this.especialistas[indice];
    this.especialistaElegidoStr = this.especialistaElegido.nombre + " " + this.especialistaElegido.apellido;

    // VER LOS HORARIOS EN RELACION AL ESPECIALISTA
    this.horariosDisponibles = this.horarios
    this.volver('horario');
  }

  volver(lugar:string){
    if(lugar == "home"){
      this.router.navigateByUrl("");
    }
    else if(lugar == "especialidad"){
      this.etapa = "especialidad";
    }
    else if(lugar == "especialista"){
      this.etapa = "especialista";
    }
    else if(lugar == "horario"){
      this.etapa = "horario";
    }
    else if(lugar == "confirmar"){
      this.etapa = "confirmar";
    }
    else if (lugar == "fin"){
      this.etapa = "fin";
    }
    else{
      this.router.navigateByUrl("MisTurnos");
    }
  }

  ordernarListaEspecialidades(){
    this.especialidades.sort((one, two) => (one < two ? -1 : 1));
  }

  cambiarDia(cuando:string){
    let sePuede = false;
    if(cuando == "antes"){
      if(this.limitarFecha("restar")){
        sePuede = true;
        this.now.setDate(this.now.getDate() - 1);
        if(this.now.getDay() == 0){
          this.now.setDate(this.now.getDate() - 1);
        }
      }
    }
    else{
      if(this.limitarFecha("sumar")){
        sePuede = true;
        this.now.setDate(this.now.getDate() + 1);
        if(this.now.getDay() == 0){
          this.now.setDate(this.now.getDate() + 1);
        }
      }
    }
    if(sePuede){
      this.dia = this.now.getDate().toString();
      this.mesNumero = this.now.getMonth();
      this.mes = this.mesNumeroToString(this.mesNumero);
      this.diaString = this.diaSemanaString(this.now.getDay());
      this.anio = this.now.getFullYear().toString();
      this.getHorariosDisponibles();
    }
  }

  cargarEspecialidades(){

  }

  limitarFecha(sumarOrestar:string){
    if(sumarOrestar == "restar" && (this.hoy.getDate() == this.now.getDate())){
      this.restarDia = false;
      this.sumarDia = true;
      return false;
    }
    else if(sumarOrestar == "sumar" && (this.hoy.getDate() + 15 == this.now.getDate())){
      this.restarDia = true;
      this.sumarDia = false;
      return false;
    }
    this.restarDia = true;
    this.sumarDia = true;
    return true;
  }

  getHorariosDisponibles(){
    if(this.diaString == "Sabado"){
      this.horariosDisponibles = this.horarios.slice(0,12);
    }
    else{
      this.horariosDisponibles = this.horarios;
    }
  }

  diaSemanaString(numero:number){
    let dia = "";
    switch(numero){
      case 1:
        dia = "Lunes";
        break;
      case 2:
        dia = "Martes";
        break;
      case 3:
        dia = "Miercoles";
        break;
      case 4:
        dia = "Jueves";
        break;
      case 5:
        dia = "Viernes";
        break;
      case 6:
        dia = "Sabado";
        break;
      case 0:
        dia = "Domingo";
        break;
    }
    return dia;
  }

  mesNumeroToString(numero:number){
    numero++;
    let mes = "";
    switch(numero){
      case 1:
        mes = "Enero";
        break;
      case 2:
        mes = "Febrero";
        break;
      case 3:
        mes = "Marzo";
        break;
      case 4:
        mes = "Abril";
        break;
      case 5:
        mes = "Mayo";
        break;
      case 6:
        mes = "Junio";
        break;
      case 7:
        mes = "Julio";
        break;
      case 8:
        mes = "Agosto";
        break;
      case 9:
        mes = "Septiembre";
        break;
      case 10:
        mes = "Octubre";
        break;
      case 11:
        mes = "Noviembre";
        break;
      case 12:
        mes = "Diciembre";
        break;
    }
    return mes;
  }
}
