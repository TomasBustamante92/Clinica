import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/clases/admin';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { DataService } from 'src/app/services/data.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Especialidad } from 'src/app/clases/especialidad';
declare var window: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  
  constructor(private data:DataService, private usuarioService:UsuariosService, private spinner:SpinnerService){}

  // Datos
  nombre = "";
  apellido = "";
  edad = "";
  mail = "";
  dni = "";
  obraSocial = "";
  especialidades:string[] = [];
  especialidadesUsuario = [];
  especialidadAux = "";
  imagenes:string[] = ["",""];
  password = "";
  passwordRepetir = "";
  tipoUsuario = 'Paciente';
  usuario:any;

  // Dom
  usuarioEnBaseDeDatos = false;
  mensajeError = "";
  usuarioAprobado = false;
  tituloUsuarioAprobado = "";
  textoUsuarioAprobado = "";

   // Popup
   formModal: any;
   popUpTitulo = "";
   popUpMensaje = "";
   esPopUpColor = true;

   // UsuarioElegido
   tipoUsuarioElegido = "";

   ngOnInit(): void {    
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.usuarioAprobado = false;
    this.usuarioService.getEstaLogueado$().subscribe(esta => {
      this.tipoUsuarioElegido = this.usuarioService.getUsuario().tipo;
    });
    this.data.getEspecialidades().subscribe(esp => {
      this.especialidades = [];
      esp.forEach(e => {
        this.especialidades.push(e.nombre);
      });
      this.ordernarListaEspecialidades();
    });
  }
  

  ngAfterViewInit() {
    if(this.usuarioService.getUsuario() != undefined){
      this.tipoUsuarioElegido = this.usuarioService.getUsuario().tipo;
    }
    else{
      this.tipoUsuarioElegido = "";
    }
  }

  seleccionarEspecialidad(tipo:string){
    if(tipo == 'paciente'){
      this.tipoUsuario = 'Paciente';
    }
    else if(tipo == 'especialista'){
      this.tipoUsuario = 'Especialista';
    }
    else{
      this.tipoUsuario = 'Admin';
    }
  }

  eliminarEspecialidadUsuario(especialidad:string){
    let indiceEsp = -1;
    this.especialidadesUsuario.forEach((esp,index) => {
      if(esp == especialidad){
        indiceEsp = index;
      }
    });
    if(indiceEsp != -1){
      this.devolverEspecialidad(especialidad);
      this.especialidadesUsuario.splice(indiceEsp, 1);
    }
  }

  ordernarListaEspecialidades(){
    this.especialidades.sort((one, two) => (one < two ? -1 : 1));
  }

  devolverEspecialidad(especialidad:string){
    this.especialidades.push(especialidad);
    this.ordernarListaEspecialidades();
  }

  sacarEspecialidad(especialidad:string){
    let indiceEsp = -1;
    this.especialidades.forEach((esp,index) => {
      if(esp == especialidad){
        indiceEsp = index;
      }
    });
    if(indiceEsp != -1){
      this.especialidades.splice(indiceEsp, 1);
    }
    this.ordernarListaEspecialidades();
  }

  registrarUsuario(){
    this.spinner.llamarSpinner();
    if(!this.estanCamposCompletos()){
      this.mensajeError = "Complete todos los campos";
    this.spinner.detenerSpinner();
      return null;
    }

    if(!this.estanDatosCorrectos()){
      this.mensajeError = "Edad o DNI no se completaron con numeros";
    this.spinner.detenerSpinner();
      return null;
    }   

    if(this.setearUsuario()){
      this.mensajeError = "Ya existe una cuenta con este mail";
      this.spinner.detenerSpinner();
      return null;
    }

    if(this.password != this.passwordRepetir){
      this.mensajeError = "Las contraseñas no son iguales";
      this.spinner.detenerSpinner();
      return null;
    }

    this.registrarAuth(); 
    return null;
  }

  setearUsuario(){
    if(this.tipoUsuario == "Paciente"){
      this.usuario = new Paciente(this.nombre,this.apellido,Number(this.edad),this.dni,this.obraSocial,this.mail,this.password,this.imagenes);
      return this.usuarioService.estaPacienteEnBaseDeDatos(this.usuario);
    }
    else if(this.tipoUsuario == "Especialista"){
      this.usuario = new Especialista("",this.nombre,this.apellido,Number(this.edad),this.dni,this.especialidadesUsuario,this.mail,this.password,this.imagenes[0]);
      return this.usuarioService.estaEspecialistaEnBaseDeDatos(this.usuario);
    }
    this.usuario = new Admin(this.nombre,this.apellido,Number(this.edad),this.dni,this.mail,this.password,this.imagenes[0]);
    return this.usuarioService.estaAdminEnBaseDeDatos(this.usuario);
  }

  agregarEspecialidad(){
    if(this.especialidadAux != ""){
      this.especialidadesUsuario.push(this.especialidadAux);
      this.data.cargarEspecialidad(this.especialidadAux);
      this.especialidadAux = "";
      this.cerrarPopUp();
    }
  }

  verificarMail(){
    if(this.tipoUsuario == "Paciente"){
      this.usuarioAprobado = true;
      this.tituloUsuarioAprobado = "Mail enviado";
      this.textoUsuarioAprobado = "Revise su correo \nSi no lo encuentra puede estar en spam";
    }
    else if(this.tipoUsuario == "Especialista"){
      this.usuarioAprobado = true;
      this.tituloUsuarioAprobado = "Registro satisfactorio";
      this.textoUsuarioAprobado = "Espere mientras los administradores aprueban su registro";
    }
  }

  abrirPopUp(){
    this.formModal.show();
  }

  cerrarPopUp(){
    this.formModal.hide();
  }

  registrarAuth(){    
    this.data.registrarse(this.mail,this.password)
    .then(responseRegistro => {
      this.usuarioService.registrarUsuario(this.tipoUsuario, this.usuario);
      this.spinner.detenerSpinner();
      if(this.tipoUsuario == "Paciente"){
        this.mandarMail(responseRegistro);
      }
      else{
        this.verificarMail();
      }
    })
    .catch(error => {
      this.spinner.detenerSpinner();
      if(error == "FirebaseError: Firebase: Error (auth/invalid-email)."){
        this.mensajeError = "Mail con formato invalido";
      }
      else if(error = "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."){
        this.mensajeError = "Contraseña debe ser minimo 6 caracteres";
      }
      else{
        this.mensajeError = error;
      }
    });
  }

  mandarMail(responseRegistro:any){
    this.data.confirmarMail(responseRegistro)
    .then(responseMail => {
      this.verificarMail();
    })
    .catch(errorMail =>{
      console.log(errorMail);
    });
  }

  elegirEspecialidad(especialidad:string){
    this.sacarEspecialidad(especialidad);
    this.especialidadesUsuario.push(especialidad);
  }

  resetearMensajeError(){
    this.mensajeError = "";
  }

  estanDatosCorrectos(){
    if(isNaN(Number(this.edad)) || isNaN(Number(this.dni))){
      return false;
    }
    return true;
  }

  estanCamposCompletos(){

    if(this.nombre == "" || this.apellido == "" || this.edad == "" || this.mail == "" || this.dni == "" || this.passwordRepetir == "" || 
    this.imagenes[0] == "" || this.password == ""){
      return false;
    }
    else if(this.tipoUsuario == 'Paciente' && (this.obraSocial == "" || this.imagenes[1] == "")){
      return false;
    }
    else if(this.tipoUsuario == 'Especialista' && this.especialidadesUsuario[0] == undefined){
      return false;
    }
    return true;
  }
}
