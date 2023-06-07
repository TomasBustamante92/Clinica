import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

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

  constructor(private spinner:SpinnerService, private data:DataService, private usuarioService:UsuariosService,
    private router: Router) {}
  
  ngOnInit(): void {
    this.usuarioEncontrado = false;
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

  ingresadoRapido(tipo:string){
    if(tipo == "Paciente"){
      this.mail = this.usuarioService.pacientes[3].mail;
      this.password = this.usuarioService.pacientes[3].password;
    }
    else if(tipo == "Especialista"){
      this.mail = this.usuarioService.especialistas[0].mail;
      this.password = this.usuarioService.especialistas[0].password;
    }
    else{
      this.mail = this.usuarioService.admins[0].mail;
      this.password = this.usuarioService.admins[0].password;
    }
    this.ingresarUsuario();
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
    routerAux.navigateByUrl("");
  }
}
