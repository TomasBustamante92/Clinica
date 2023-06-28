import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  // DIAS
  now:Date = new Date();
  dia:string = this.now.getDate().toString();
  mes:number = (this.now.getMonth() +1);
  anio:string = this.now.getFullYear().toString();
  hora:number = this.now.getHours();
  restarDia = false;
  sumarDia = true;
  mostrarCalendario:string[][] = [];
  diaElegido:Date;

  @Output() diaEmitter:EventEmitter<Date> = new EventEmitter();

  ngOnInit(): void {
    this.cargarCalendario(this.mes);
  }

  cargarCalendario(mes:number){
    this.mostrarCalendario = [];
    let fechaAux = new Date();
    let fechaNumero = 1;
    fechaAux.setMonth(mes-1);
    fechaAux.setDate(fechaNumero);
    for(let i=0 ; i<5 ; i++){
      let semana = [];
      for(let j=0 ; j<7 ; j++){
        if(i==0 && fechaAux.getDay() <= j){
          fechaAux.setDate(fechaNumero);
          semana.push(fechaAux.getDate());
          fechaNumero++;
        }
        else if(i==0){
          semana.push(" ");
        }
        else if(i!=0){
          fechaAux.setDate(fechaNumero);
          if(i==4 && fechaAux.getDate() < 20){
            break;
          }
          semana.push(fechaAux.getDate());
          fechaNumero++;
        }
      }
      this.mostrarCalendario.push(semana);
    }
  }

  elegirDia(dia:string){
    this.diaElegido = this.now;
    this.diaElegido.setMonth(this.mes-1);
    this.diaElegido.setDate(Number(dia));
    this.diaEmitter.emit(this.diaElegido);
  }


  // hacer el pop up
  // hacer la directiva pa colorear seleccionado
  // hover mouse pointer

  cambiarMes(cuando:string){
    if(cuando == "antes"){
      this.mes--;
    }
    else{
      this.mes++;
    }
    this.cargarCalendario(this.mes);
  }  

}


