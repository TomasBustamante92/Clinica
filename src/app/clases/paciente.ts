export class Paciente {

    nombre:string;
    apellido:string;
    edad:number;
    dni:string;
    obraSocial:string;
    mail:string;
    password:string;
    imagenes:string[];
    tipo:string;

    constructor(nombre:string, apellido:string, edad:number, dni:string, 
    obraSocial:string,mail:string, password:string, imagenes:string[]){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.obraSocial = obraSocial;
        this.mail = mail;
        this.password = password;
        this.imagenes = imagenes;
        this.tipo = "Paciente";
    }
}
