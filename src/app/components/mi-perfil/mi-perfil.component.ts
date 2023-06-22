import { Component, OnInit } from '@angular/core';
import { HorarioEspecialista } from 'src/app/clases/horario-especialista';
import { DataService } from 'src/app/services/data.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PdfMakeWrapper, Img, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
declare var window: any;

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit{

  // USUARIO 
  usuario:any;
  mail = "";
  nombreCompleto = "";
  edad:number;
  dni:string;
  imagenes:string[] = ["",""];
  tipo:string;
  obraSocial:string;
  especialidades:string[];
  formModal: any;

  diasDisponibles = [{dia:"Lunes", ini: "", fin: ""},{dia:"Martes", ini: "", fin: ""},{dia:"Miercoles", ini: "", fin: ""},
    {dia:"Jueves", ini: "", fin: ""},{dia:"Viernes", ini: "", fin: ""},{dia:"Sabado", ini: "", fin: ""}];
  horariosDisponibles = ["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
  horariosEspecialista:HorarioEspecialista;

  constructor(private usuarioService:UsuariosService,private data:DataService) {}

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('MiModal')
    );
    this.usuarioService.getEstaLogueado$().subscribe(esta => {
      this.usuario = this.usuarioService.getUsuario();
    });
    this.data.getHorarioEspecialistas().subscribe(horario => {
      horario.forEach(hor => {
        if(this.usuario.mail == hor.mail){
          this.horariosEspecialista = hor;
          this.cargarHorarios(hor);
        }
      });
    });
  }

  ngAfterViewInit() {
    this.usuario = this.usuarioService.getUsuario();
    this.completarCampos();
  }

  cargarHorarios(horario:HorarioEspecialista){
    this.diasDisponibles[0].ini = horario.lunInicio;
    this.diasDisponibles[0].fin = horario.lunFin;
    this.diasDisponibles[1].ini = horario.marInicio;
    this.diasDisponibles[1].fin = horario.marFin;
    this.diasDisponibles[2].ini = horario.mierInicio;
    this.diasDisponibles[2].fin = horario.mierFin;
    this.diasDisponibles[3].ini = horario.jueInicio;
    this.diasDisponibles[3].fin = horario.jueFin;
    this.diasDisponibles[4].ini = horario.vierInicio;
    this.diasDisponibles[4].fin = horario.vierFin;
    this.diasDisponibles[5].ini = horario.sabInicio;
    this.diasDisponibles[5].fin = horario.sabFin;
  }

  async imprimirPdf(){
    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper();
    const logo = await (new Img('https://cdn-icons-png.flaticon.com/512/197/197881.png').absolutePosition(30,20).fit([40,40]).build());

    pdf.add([logo, new Txt('Clinica Bustamante').color('gray').absolutePosition(73,35).fontSize(15).italics().end]);
    pdf.add('\n');
    pdf.add(new Txt('Historial Clínico').decoration('underline').alignment('center').fontSize(20).bold().end);
    pdf.add(new Txt(['\n\n',new Txt('Paciente: ').bold().end,' '+this.usuario.nombre + " " + this.usuario.apellido]).end);
    let hoy = new Date();
    pdf.add(new Txt(['',new Txt('Fecha: ').bold().end,' ',hoy.getDate().toString(),'/',(hoy.getMonth()+1).toString(),'/',hoy.getFullYear().toString()]).end);
    
    pdf.add("\n\n");

    this.data.historias.forEach(historia => {
      if(historia.paciente == this.usuario.mail){
        pdf.add("Altura: " + historia.altura);
        pdf.add("Peso: " + historia.peso);
        pdf.add("Temperatura: " + historia.temperatura);
        pdf.add("Presion: " + historia.presion);
        historia.dinamicos.forEach(dinamico => {
          pdf.add(dinamico.clave + ": " + dinamico.valor);
        });
        pdf.add("\n");
      }
    });
    // pdf.create().download("archivoRePiola");
    pdf.create().open();
  }

  cambiarHorario(dia:string,tipo:string,horario:string){
    if(tipo == "inicio"){
      switch(dia){
        case "Lunes":
          this.diasDisponibles[0].ini = horario;
          break;
        case "Martes":
          this.diasDisponibles[1].ini = horario;
          break;
        case "Miercoles":
          this.diasDisponibles[2].ini = horario;
          break;
        case "Jueves":
          this.diasDisponibles[3].ini = horario;
          break;
        case "Viernes":
          this.diasDisponibles[4].ini = horario;
          break;
        case "Sabado":
          this.diasDisponibles[5].ini = horario;
          break;
      }
    }
    else{
      switch(dia){
        case "Lunes":
          this.diasDisponibles[0].fin = horario;
          break;
        case "Martes":
          this.diasDisponibles[1].fin = horario;
          break;
        case "Miercoles":
          this.diasDisponibles[2].fin = horario;
          break;
        case "Jueves":
          this.diasDisponibles[3].fin = horario;
          break;
        case "Viernes":
          this.diasDisponibles[4].fin = horario;
          break;
        case "Sabado":
          this.diasDisponibles[5].fin = horario;
          break;
      }
    }
  }

  completarCampos(){
    this.mail = this.usuario.mail;
    this.nombreCompleto = this.usuario.nombre + " " + this.usuario.apellido;
    this.edad = this.usuario.edad;
    this.dni = this.usuario.dni;
    this.tipo = this.usuario.tipo;
    if(this.tipo == 'Paciente'){
      this.imagenes[0] = this.usuario.imagenes[0];
      this.imagenes[1] = this.usuario.imagenes[1];
      this.obraSocial = this.usuario.obraSocial;
    }
    else if(this.tipo == 'Especialista'){
      this.especialidades = this.usuario.especialidades;
      this.imagenes[0] = this.usuario.imagen;
    }
    else{
      this.imagenes[0] = this.usuario.imagen;
    }
  }

  abrirMisHorarios(){
    this.formModal.show();

  }

  actualizarHorarioEspecialista(){
    this.horariosEspecialista.lunInicio = this.diasDisponibles[0].ini;
    this.horariosEspecialista.lunFin = this.diasDisponibles[0].fin;
    this.horariosEspecialista.marInicio = this.diasDisponibles[1].ini;
    this.horariosEspecialista.marFin = this.diasDisponibles[1].fin;
    this.horariosEspecialista.mierInicio = this.diasDisponibles[2].ini;
    this.horariosEspecialista.mierFin = this.diasDisponibles[2].fin;
    this.horariosEspecialista.jueInicio = this.diasDisponibles[3].ini;
    this.horariosEspecialista.jueFin = this.diasDisponibles[3].fin;
    this.horariosEspecialista.vierInicio = this.diasDisponibles[4].ini;
    this.horariosEspecialista.vierFin = this.diasDisponibles[4].fin;
    this.horariosEspecialista.sabInicio = this.diasDisponibles[5].ini;
    this.horariosEspecialista.sabFin = this.diasDisponibles[5].fin;
  }

  cerrarModulo(){
    this.actualizarHorarioEspecialista();
    this.data.updateHorarioEspecialistas(this.horariosEspecialista);
    this.formModal.hide();
  }
}
