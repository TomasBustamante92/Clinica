import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaString'
})
export class DiaStringPipe implements PipeTransform {

  transform(dia: number): string {
    switch(dia){
      case 1:
        return "Lunes";
      case 2:
        return "Martes";
      case 3:
        return "Miercoles";
      case 4:
        return "Jueves";
      case 5:
        return "Viernes";
      case 6:
        return "Sabado";
      case 0:
        return "Domingo";
    }
    return "";
  }
}
