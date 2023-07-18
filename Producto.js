class Producto {
  constructor(nombre, precio, id) {
    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
  }

  getDescripcionProducto() {
    let mensaje = "";
    mensaje += this.id + "-" + "Nombre: " + this.nombre;
    mensaje += "\n" + "Precio: " + this.precio + " " + "pesos";
    return mensaje;
  }
  setPrecioProducto(nuevo_precio) {
    this.precio = nuevo_precio;
  }
}
