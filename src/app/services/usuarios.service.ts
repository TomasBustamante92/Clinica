import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { Paciente } from '../clases/paciente';
import { Especialista } from '../clases/especialista';
import { Admin } from '../clases/admin';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarioLogueado = false;
  estaLogueado$ : Subject<boolean>;
  tipoUsuario = "";
  pacientes:Paciente[];
  especialistas$ : Subject<Especialista[]>;
  especialistas:Especialista[];
  admins:Admin[];

  constructor(private httpClient:HttpClient, private data:DataService) {
    this.estaLogueado$ = new Subject();
    this.estaLogueado$.next(false);
    this.especialistas$ = new Subject();

    this.data.getPacientesDB().subscribe(pacientes => {
      this.pacientes = pacientes;
    });
    this.data.getEspecialistasDB().subscribe(especialistas => {
      this.especialistas = especialistas;
      this.especialistas$.next(especialistas);
    });
    this.data.getAdminDB().subscribe(admins => {
      this.admins = admins;
    });
  }

  setEstaLogueado$(value:boolean){
    this.estaLogueado$.next(value);
    this.usuarioLogueado = value;
  }

  getEstaLogueado$(): Observable<boolean> {
    return this.estaLogueado$;
  }

  setEspecialistas$(value:Especialista[]){
    this.especialistas$.next(value);
  }

  getEspecialistas$(): Observable<Especialista[]> {
    return this.especialistas$;
  }

  registrarUsuario(tipoUsuario:string, usuario:any){    
    if(tipoUsuario == "Paciente"){
      this.data.cargarPacienteBD(usuario);
    }
    else if(tipoUsuario == "Especialista"){
      this.data.cargarEspecialistaBD(usuario);
    }
    else{
      this.data.cargarAdminBD(usuario);
    }
  }
  
  buscarUsuarioPorMailPassword(mail:string, password:string){
    let usuario = null;    
    this.pacientes.forEach(paciente => {
      if(paciente.mail == mail && paciente.password == password){
        usuario = paciente as Paciente;
      }
    });
    this.especialistas.forEach(especialista => {
      if(especialista.mail == mail && especialista.password == password){
        usuario = especialista as Especialista;
      }
    });
    this.admins.forEach(admin => {
      if(admin.mail == mail && admin.password == password){
        usuario = admin as Admin;
      }
    });
    return usuario;
  }

  estaPacienteEnBaseDeDatos(usuario:Paciente){
    let retorno = false;
    this.pacientes.forEach(paciente => {
      if(paciente.mail == usuario.mail){
        retorno = true;
      }
    });
    return retorno;
  }

  estaEspecialistaEnBaseDeDatos(usuario:Especialista){
    let retorno = false;
    this.especialistas.forEach(especialista => {
      if(especialista.mail == usuario.mail){
        retorno = true;
      }
    });
    return retorno;
  }

  estaAdminEnBaseDeDatos(usuario:Admin){
    let retorno = false;
    this.admins.forEach(admin => {
      if(admin.mail == usuario.mail){
        retorno = true;
      }
    });
    return retorno;
  }

  setUsuario(tipoUsuario:string, usuario:any){
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.tipoUsuario = tipoUsuario;
    this.usuarioLogueado = true;
  }

  getUsuario(){
    return JSON.parse(localStorage.getItem('usuario'))
  }

  desloguearUsuario(){
    localStorage.removeItem('usuario');
    this.usuarioLogueado = false;
    this.tipoUsuario = "";
  }

  // getMensajes(): Observable<Mensaje[]>{
  //   return collectionData(this.mensajesDB) as Observable<Mensaje[]>;
  // }

  // cargarChat(){
  //   addDoc(this.mensajesDB, Object.assign({}, {msj:"apa"}));
  // }
}