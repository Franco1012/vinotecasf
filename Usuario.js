class Usuario {
    constructor(user_name, user_pass) {

        this.user_name = user_name;
        this.user_pass = user_pass;
        this.cliente = null;
        this.carrito_de_compra = null;



    }
    setCliente(cliente) {
        this.cliente = cliente;

    }
    setCarritoDecompra(carrito) {
        this.carrito_de_compra = carrito;
    }




}