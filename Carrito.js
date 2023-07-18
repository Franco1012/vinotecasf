class Carrito {
    constructor() {

        this.productos = [];

    }
    getProductos() {
        let descripcion_productos = [];
        for (let i = 0; i < this.productos.length; i++) {
            descripcion_productos.push(this.productos[i].getDescripcionProducto());
        }
        return descripcion_productos.join("\n");
    }
    agregarProducto(producto) {
        this.productos.push(producto);
    }
    eliminarProducto(producto) {
        this.productos = this.productos.filter((el) => el !== producto);
    }
}




