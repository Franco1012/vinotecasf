class Cliente {
  constructor(nombre, apellido, edad, mail) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.mail = mail;
  }
  descripcionCliente() {
    let mensaje = "";
    mensaje += "Nombre y Apellido:" + this.nombre + " " + this.apellido;
    mensaje += "\n" + "Edad:" + this.edad + "años";
    mensaje += "\n" + "Mail:" + this.mail;

    return mensaje;
  }
}
