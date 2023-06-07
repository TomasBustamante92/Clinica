import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { DataService } from 'src/app/services/data.service';
declare var window: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  especialistas:Especialista[];
  formModal: any;
  componenteAbierto: boolean = false;

  // especialista elegido
  especialista:Especialista = new Especialista("","","",0,"",[""],"","",""); ;

  constructor(private usuarioService:UsuariosService, private spinner:SpinnerService, private data:DataService){}

  ngOnInit(): void {
    this.spinner.llamarSpinner();
    this.usuarioService.getEspecialistas$().subscribe(esta => {
      this.especialistas = this.usuarioService.especialistas;
      this.spinner.detenerSpinner();
    });
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('colorModal')
    );
    this.componenteAbierto = true;
    console.log(this.especialistas);
  }

  ngAfterViewInit() {
    if(this.usuarioService.getUsuario() != undefined){
      this.especialistas = this.usuarioService.especialistas;
    }
    if(this.especialistas != undefined){
      this.spinner.detenerSpinner();
    }
  }


  elegirEspecialista(especialista:Especialista){
    this.especialista.id = especialista.id;
    this.especialista.nombre = especialista.nombre;
    this.especialista.apellido = especialista.apellido;
    this.especialista.mail = especialista.mail;
    this.especialista.dni = especialista.dni;
    this.especialista.edad = especialista.edad;
    this.especialista.imagen = especialista.imagen;
    this.especialista.habilitado = especialista.habilitado;
    this.especialista.especialidades = especialista.especialidades;
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
