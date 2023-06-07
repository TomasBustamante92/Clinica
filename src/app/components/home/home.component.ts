import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  usuario:any;
  estaLogueado:boolean = false;

  constructor(private usuarioService:UsuariosService){}
  
  ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuario();
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
}
