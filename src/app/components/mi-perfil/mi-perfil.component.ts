import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

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

  constructor(private usuarioService:UsuariosService) {}

  ngOnInit(): void {
    this.usuarioService.getEstaLogueado$().subscribe(esta => {
      this.usuario = this.usuarioService.getUsuario();
    });
  }

  ngAfterViewInit() {
    this.usuario = this.usuarioService.getUsuario();
    this.completarCampos();
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
}
