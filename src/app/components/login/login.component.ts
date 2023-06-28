import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { LogIngreso } from 'src/app/clases/log-ingreso';
import { min } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  mail = "";
  password = "";
  nombreUsuario = "";
  mensajeError = "";
  usuario:any;
  usuarioEncontrado:boolean = false;
  usuariosAccesoRapido = [{mail: "", pass: "", img: ""},{mail: "", pass: "", img: ""},{mail: "", pass: "", img: ""},{mail: "", pass: "", img: ""},{mail: "", pass: "", img: ""},{mail: "", pass: "", img: ""}];

  constructor(private spinner:SpinnerService, private data:DataService, private usuarioService:UsuariosService,
    private router: Router) {}
  
  ngOnInit(): void {
    this.spinner.llamarSpinner();
    this.usuarioEncontrado = false;
    this.usuarioService.especialistas$.subscribe(esp => {
      this.cargarAccesoRapido();
      this.spinner.detenerSpinner();
    });
    if(this.usuarioService.admins != undefined){
      this.cargarAccesoRapido();
      this.spinner.detenerSpinner();
    }
  }

  resetearMensajeError(){
    this.mensajeError = "";
  }

  ingresarUsuario(){
    this.spinner.llamarSpinner();

    if(this.mail == "" || this.password == ""){
      this.mensajeError = "Complete todos los campos";
      this.spinner.detenerSpinner();
      return null;
    }

    this.usuario = this.usuarioService.buscarUsuarioPorMailPassword(this.mail, this.password);
    if(this.usuario != null){
      this.ingresarAuth();
      return null;
    }

    if(!this.usuarioEncontrado){
      this.mensajeError = "Usuario o contraseña incorrectos";
    }

    this.spinner.detenerSpinner();
    return null;
  }

  ingresadoRapido(numeroBoton:number){

    this.cargarAccesoRapido();
    this.mail = this.usuariosAccesoRapido[numeroBoton].mail;
    this.password = this.usuariosAccesoRapido[numeroBoton].pass;
    this.ingresarUsuario();
  }

  cargarAccesoRapido(){
    for(let i=0 ; i<6 ; i++){
      if(i<3){
        this.usuariosAccesoRapido[i].mail = this.usuarioService.pacientes[i].mail;
        this.usuariosAccesoRapido[i].pass = this.usuarioService.pacientes[i].password;
        this.usuariosAccesoRapido[i].img = this.usuarioService.pacientes[i].imagenes[0];
      }
      else if(i<5){
        this.usuariosAccesoRapido[i].mail = this.usuarioService.especialistas[i-3].mail;
        this.usuariosAccesoRapido[i].pass = this.usuarioService.especialistas[i-3].password;
        this.usuariosAccesoRapido[i].img = this.usuarioService.especialistas[i-3].imagen;
      }
      else{
        
        this.usuariosAccesoRapido[i].mail = this.usuarioService.admins[i-5].mail;
        this.usuariosAccesoRapido[i].pass = this.usuarioService.admins[i-5].password;
        this.usuariosAccesoRapido[i].img = this.usuarioService.admins[i-5].imagen;
      }
    }
  }

  ingresarAuth(){
    this.data.ingresar(this.mail,this.password)
    .then(response => {
      this.spinner.detenerSpinner();
      if((this.usuario.tipo == "Paciente" && this.data.autha.currentUser.emailVerified) ||
      (this.usuario.tipo == "Admin") || (this.usuario.tipo == "Especialista" && this.usuario.habilitado)){
          this.ingreso();
      }
      else{
        this.mensajeError = "Usuario aun sin validar";
      }
    })
    .catch(error => console.log(error));
  }

  ingreso(){
    this.usuarioService.setUsuario(this.usuario.tipo, this.usuario);
    let routerAux = this.router; 
    this.usuarioService.setEstaLogueado$(true);
    let now = new Date();
    let fecha = now.getDate().toString()+"/"+(now.getMonth()+1).toString()+"/"+now.getFullYear().toString();
    let hora = now.getHours().toString()+":"+this.formatoMinutos(now.getMinutes());
    this.data.cargarLogIngresos(new LogIngreso(this.usuario.mail,fecha,hora));
    routerAux.navigateByUrl("");
  }

  formatoMinutos(minutos:number){
    if(minutos < 10){
      return "0" + minutos;
    }
    return minutos.toString();
  }
}
