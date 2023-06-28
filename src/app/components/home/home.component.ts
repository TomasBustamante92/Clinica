import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  usuario:any;
  estaLogueado:boolean = false;
  tipo = "";
  
  // Form
  formModal: any;

  constructor(private usuarioService:UsuariosService){}
  
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('regisModal')
    );
    this.usuario = this.usuarioService.getUsuario();
    this.tipo = this.usuario.tipo;
    this.cambiarEstado();
    this.usuarioService.getEstaLogueado$().subscribe(esta => {
      this.estaLogueado = esta;
    });
  }

  ngAfterViewInit() {
    this.usuario = this.usuarioService.getUsuario();
    this.cambiarEstado();
  }

  

  cambiarEstado(){
    if(this.usuario != null){
      this.estaLogueado = true;
    }
    else{
      this.estaLogueado = false;
    }
  }

  abrirModulo(tipo:string){ 
    this.usuarioService.setTipoRegistro$(tipo);
    this.formModal.show();
  }

  cerrarModulo(){
    this.formModal.hide();
  }
}
