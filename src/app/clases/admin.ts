export class Admin {

    id:string;
    tipo:string
    nombre:string;
    apellido:string;
    edad:number;
    dni:string;
    mail:string;
    password:string;
    imagen:string;

    constructor(id:string,nombre:string, apellido:string, edad:number, dni:string, 
    mail:string, password:string, imagen:string){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.mail = mail;
        this.password = password;
        this.imagen = imagen;
        this.tipo = "Admin";
    }
}
