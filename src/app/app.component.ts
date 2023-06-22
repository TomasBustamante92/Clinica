import { Component, ElementRef, OnInit } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';
import { RouterOutlet } from '@angular/router';
import { fader,slider } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ 
    // fader,
    slider,
    // transformer,
  ]

})
export class AppComponent implements OnInit {

  estaLogueado = false;
  tipoUsuario = "";
  nombreUsuario:string;
  usuario:any;

  constructor(private elementRef: ElementRef, private usuarioService:UsuariosService) {}

  ngOnInit(): void {
    this.cambiarEstado();
    this.usuarioService.getEstaLogueado$().subscribe(esta => {
      this.usuario = this.usuarioService.getUsuario();
      this.cambiarTipoUsuario();
      this.nombreUsuario = this.usuario.mail;
      this.estaLogueado = esta;
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = "transparent";
    this.usuario = this.usuarioService.getUsuario();
    this.cambiarEstado();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  cambiarTipoUsuario(){
    if(this.usuario != undefined){
      this.tipoUsuario = this.usuario.tipo;
    }
    else{
      this.tipoUsuario = "";
    }
  }

  logout(){
    this.usuarioService.desloguearUsuario();
    this.usuario = this.usuarioService.getUsuario();
    this.cambiarEstado();
    this.usuarioService.setEstaLogueado$(false);
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
