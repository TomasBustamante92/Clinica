import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { doc, addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc, setDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState, sendEmailVerification, getAuth } from '@angular/fire/auth';
import { Paciente } from '../clases/paciente';
import { Especialista } from '../clases/especialista';
import { Admin } from '../clases/admin';
import { Especialidad } from '../clases/especialidad';
import { Turno } from '../clases/turno';
import { HorarioEspecialista } from '../clases/horario-especialista';
import { HistoriaClinica } from '../clases/historia-clinica';
import { LogIngreso } from '../clases/log-ingreso';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  autha = this.auth;
  historias:HistoriaClinica[] = [];
  especialidades:string[] = [];

  constructor(private httpClient:HttpClient, private firestore: Firestore, private auth:Auth) {
      this.getHistoriaDB().subscribe(historias => {
      this.historias = historias;
    });
    this.getEspecialidades().subscribe(esp => {
      esp.forEach(e => {
        this.especialidades.push(e.nombre);
      })
    });
   }

  // AUTH
  registrarse(mail:string,password:string){
    return createUserWithEmailAndPassword(this.auth,mail,password);
  }
  confirmarMail(userCredential: any){
    return sendEmailVerification(userCredential.user);
  }
  ingresar(mail:string,password:string){
    return signInWithEmailAndPassword(this.auth,mail,password);
  }

  // HORARIO ESPECIALISTAS
  getHorarioEspecialistas(): Observable<HorarioEspecialista[]>{
    let col = collection(this.firestore, 'horarioEspecialistas');
    return collectionData(col, { idField: 'id'}) as Observable<HorarioEspecialista[]>;
  }
  cargarHorarioEspecialistas(horarioEsp:HorarioEspecialista){
    let col = collection(this.firestore, 'horarioEspecialistas');
    addDoc(col, Object.assign({}, horarioEsp));
  }
  updateHorarioEspecialistas(horarioEsp:HorarioEspecialista){
    let col = collection(this.firestore, 'horarioEspecialistas');
    const documento = doc(col, horarioEsp.id);
    updateDoc(documento, {
      lunInicio: horarioEsp.lunInicio,
      lunFin: horarioEsp.lunFin,
      marInicio: horarioEsp.marInicio,
      marFin: horarioEsp.marFin,
      mierInicio: horarioEsp.mierInicio,
      mierFin: horarioEsp.mierFin,
      jueInicio: horarioEsp.jueInicio,
      jueFin: horarioEsp.jueFin,
      vierInicio: horarioEsp.vierInicio,
      vierFin: horarioEsp.vierFin,
      sabInicio: horarioEsp.sabInicio,
      sabFin: horarioEsp.sabFin,
      estados: horarioEsp.estados,
      especialidadesPorDia: horarioEsp.especialidadesPorDia,
    });
  }

  // ESPECIALISTAS
  getEspecialistasDB(): Observable<Especialista[]>{
    let col = collection(this.firestore, 'especialistas');
    return collectionData(col, { idField: 'id'}) as Observable<Especialista[]>;
  }
  cargarEspecialistaBD(usuario:Paciente){
    let col = collection(this.firestore, 'especialistas');
    addDoc(col, Object.assign({}, usuario));
  }
  updateEspecialista(especialista:Especialista){
    let col = collection(this.firestore, 'especialistas');
    const documento = doc(col, especialista.id);
    updateDoc(documento, {
      habilitado: especialista.habilitado,
    });
  }


  // ADMIN
  getAdminDB(): Observable<Admin[]>{
    let col = collection(this.firestore, 'admins');
    return collectionData(col, { idField: 'id'}) as Observable<Admin[]>;
  }
  cargarAdminBD(usuario:Admin){
    let col = collection(this.firestore, 'admins');
    addDoc(col, Object.assign({}, usuario));
  }


  // LOG INGRESOS
  getLogIngresos():Observable<LogIngreso[]>{
    let col = collection(this.firestore, 'logIngresos');
    return collectionData(col) as Observable<LogIngreso[]>;
  }
  cargarLogIngresos(ingresos:LogIngreso){
    let col = collection(this.firestore, 'logIngresos');
    addDoc(col, Object.assign({}, ingresos));
  }


  // TURNO
  getTurnosDB(): Observable<Turno[]>{
    let col = collection(this.firestore, 'turnos');
    return collectionData(col, { idField: 'id'}) as Observable<Turno[]>;
  }
  cargarTurnosBD(turno:Turno){
    let col = collection(this.firestore, 'turnos');
    addDoc(col, Object.assign({}, turno));
  }
  updateTurnos(turno:Turno){
    let col = collection(this.firestore, 'turnos');
    const documento = doc(col, turno.id);
    updateDoc(documento, {
      estado: turno.estado,
      comentario: turno.comentario,
      calificacion: turno.calificacion,
      encuesta: turno.encuesta,
      fecha: turno.fecha,
      resenia: turno.resenia,
    });
  }

    // HISTORIA CLINICA
    getHistoriaDB(): Observable<HistoriaClinica[]>{
      let col = collection(this.firestore, 'historias');
      return collectionData(col, { idField: 'id'}) as Observable<HistoriaClinica[]>;
    }
    cargarHistoriasBD(historia:HistoriaClinica){
      let col = collection(this.firestore, 'historias');
      addDoc(col, Object.assign({}, historia));
    }
    // updateHistorias(historia:HistoriaClinica){
    //   let col = collection(this.firestore, 'historias');
    //   const documento = doc(col, historia.id);
    //   updateDoc(documento, {
    //     estado: turno.estado,

    //   });
    // }


  // PACIENTE
  cargarPacienteBD(usuario:Paciente){
    let col = collection(this.firestore, 'pacientes');
    addDoc(col, Object.assign({}, usuario));
  }
  getPacientesDB(): Observable<Paciente[]>{
    let col = collection(this.firestore, 'pacientes');
    return collectionData(col, { idField: 'id'}) as Observable<Paciente[]>;
  }

  // ESPECIALIDADES
  getEspecialidades(): Observable<Especialidad[]>{
    let col = collection(this.firestore, 'especialidades');
    return collectionData(col) as Observable<Especialidad[]>;
  }
  cargarEspecialidad(esp:string){
    let col = collection(this.firestore, 'especialidades');
    addDoc(col, Object.assign({}, new Especialidad(esp)));
  }
}