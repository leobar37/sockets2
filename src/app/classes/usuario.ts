export class Usuario{
 public  nombre: string;
 public  contraseña :string;
 constructor(nombre:string , contraseña? :string){
   this.nombre = nombre;
   this.contraseña = contraseña;
 }

}

export interface IUsuario {
 id?:string,
 idBD ?:string,
 sala ?:string
  nombre? :string,
   password ?:string
}