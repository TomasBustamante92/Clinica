import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { doc, addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc, setDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState, sendEmailVerification, getAuth } from '@angular/fire/auth';
import { Paciente } from '../clases/paciente';
import { Especialista } from '../clases/especialista';
import { Admin } from '../clases/admin';
import { Especialidad } from '../clases/especialidad';
import { Turno } from '../clases/turno';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  autha = this.auth;

  constructor(private httpClient:HttpClient, private firestore: Firestore, private auth:Auth) { }

  registrarse(mail:string,password:string){
    return createUserWithEmailAndPassword(this.auth,mail,password);
  }

  confirmarMail(userCredential: any){
    return sendEmailVerification(userCredential.user);
  }

  ingresar(mail:string,password:string){
    return signInWithEmailAndPassword(this.auth,mail,password);
  }

  getPacientesDB(): Observable<Paciente[]>{
    let col = collection(this.firestore, 'pacientes');
    return collectionData(col, { idField: 'id'}) as Observable<Paciente[]>;
  }

  getEspecialistasDB(): Observable<Especialista[]>{
    let col = collection(this.firestore, 'especialistas');
    return collectionData(col, { idField: 'id'}) as Observable<Especialista[]>;
  }

  updateEspecialista(especialista:Especialista){
    let col = collection(this.firestore, 'especialistas');
    const documento = doc(col, especialista.id);
    updateDoc(documento, {
      habilitado: especialista.habilitado,
    });
  }

  getAdminDB(): Observable<Admin[]>{
    let col = collection(this.firestore, 'admins');
    return collectionData(col, { idField: 'id'}) as Observable<Admin[]>;
  }

  getTurnosDB(): Observable<Turno[]>{
    let col = collection(this.firestore, 'turnos');
    return collectionData(col, { idField: 'id'}) as Observable<Turno[]>;
  }

  updateTurnos(turno:Turno){
    let col = collection(this.firestore, 'turnos');
    const documento = doc(col, turno.id);
    updateDoc(documento, {
      estado: turno.estado,
      comentario: turno.comentario,
      calificacion: turno.calificacion,
      encuesta: turno.encuesta,
    });
  }

  cargarPacienteBD(usuario:Paciente){
    let col = collection(this.firestore, 'pacientes');
    addDoc(col, Object.assign({}, usuario));
  }

  cargarTurnosBD(turno:Turno){
    let col = collection(this.firestore, 'turnos');
    addDoc(col, Object.assign({}, turno));
  }

  cargarEspecialistaBD(usuario:Paciente){
    let col = collection(this.firestore, 'especialistas');
    addDoc(col, Object.assign({}, usuario));
  }

  cargarAdminBD(usuario:Admin){
    let col = collection(this.firestore, 'admins');
    addDoc(col, Object.assign({}, usuario));
  }

  getEspecialidades(): Observable<Especialidad[]>{
    let col = collection(this.firestore, 'especialidades');
    return collectionData(col) as Observable<Especialidad[]>;
  }

  cargarEspecialidad(esp:string){
    let col = collection(this.firestore, 'especialidades');
    addDoc(col, Object.assign({}, new Especialidad(esp)));
  }
}