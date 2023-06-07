export class Especialista {

    id: string;
    nombre:string;
    apellido:string;
    edad:number;
    dni:string;
    especialidades:string[];
    mail:string;
    password:string;
    imagen:string;
    tipo:string;
    habilitado:boolean;

    constructor(id:string, nombre:string, apellido:string, edad:number, dni:string, 
    especialidades:string[],mail:string, password:string, imagen:string){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.especialidades = especialidades;
        this.mail = mail;
        this.password = password;
        this.imagen = imagen;
        this.tipo = "Especialista";
        this.habilitado = false;
    }
}
