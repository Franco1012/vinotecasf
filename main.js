document.addEventListener('DOMContentLoaded', () => {
  //creamos una base de datos
  //Instanciamos objetos
  const usuarios = new Usuarios();
  const usuario1 = new Usuario("franco85", "1234");
  const usuario2 = new Usuario("ana26", "5678")
  const cliente1 = new Cliente("Franco", "Soler", 37, "soler_franco@gmail.com");
  const cliente2 = new Cliente("Ana", "Kocian", 36, "anakocian@gmail.com")
  const producto1 = new Producto("Rutini Cabernet Malbec", 5350, 1);
  const producto2 = new Producto("Trumpeter Malbec 375 ml", 1840, 2);
  const producto3 = new Producto("Encuentro Malbec", 4000, 3);
  const producto4 = new Producto("Colección Rutini Cabernet Malbec", 4900, 4);
  const producto5 = new Producto("Trumpeter Cabernet Sauvignon", 7500, 5);
  const producto6 = new Producto("Trumpeter Cabernet Franc", 2870, 6);
  const carrito1 = new Carrito();
  const carrito2 = new Carrito();
  //seteamos la propiedad cliente del objeto usuario1 
  usuario1.setCliente(cliente1);
  //seteamos la propiedad carrito_de_compra del objeto usuario1
  usuario1.setCarritoDecompra(carrito1);
  //seteamos la propiedad cliente del objeto usuario2 
  usuario2.setCliente(cliente2);
  //seteamos la propiedad carrito_de_compra del objeto usuario2
  usuario2.setCarritoDecompra(carrito2);
  //agregamos los usuarios a la lista de usuarios
  usuarios.agregarUsuario(usuario1);
  usuarios.agregarUsuario(usuario2);
  //declaramos las variables globales usuario y password para que puedan ser accedidas desde diferentes partes del código
  const hoy = new Date();
  alert("Bienvenid@ a VinotecaSF \n" + hoy.toLocaleString())
  let nombre_usuario;
  let password;
  let numero_cupon = 123456;
  let descuento_aplicado = false;
  //invitamos al usuario a loguearse
  let acceder = login();

  if (acceder) {
    //declaramos una variable con valor booleano true para acceder al ciclo while
    let continuar = true;
    let confirmar_compra;
    while (continuar) {
      //llamamos la funcion mostrarMenu para visualizar las opciones de menú
      let opcion = mostrarMenu();
      if (opcion === "1") {
        //El usuario selecciona un producto y lo agrega a su carrito de compra
        let producto = seleccionarProducto("Ingrese el id del producto a comprar")
        comprarProducto(nombre_usuario, producto);
      } else if (opcion === "2") {

        //El usuario selecciona un producto y lo elimina de su carrito de compra
        let producto = seleccionarProducto("Ingrese el id del producto a eliminar")
        eliminarProducto(nombre_usuario, producto);
        //le mostramos los pruductos que contiene el carrito del usuario
      } else if (opcion === "3") {
        verCarrito(nombre_usuario);

        //le ofrecemos una promoción al usuario
      } else if (opcion === "4") {
        if (cantidadElementos(nombre_usuario) !== 0 && descuento_aplicado === false) {
          //le pedimos al usuario que ingrese el numero del cupon y lo validamos
          let validar_cupon = validarCupon();
          if (validar_cupon) {
            promocion(nombre_usuario);
          }
        } else {
          alert("No hay productos en su carrito para aplicar el descuento o su cupón ya fue ingresado")
        }
        //Si el usuario elige cancelar o ingresa la opcion 4 el programa sale del bucle y finaliza la operacion
      } else if (opcion === null || opcion === "5") {
        continuar = false;
        confirmar_compra = false;

      }
      //confirmamos si el usuario desea continuar
      if (opcion !== "3" && opcion !== "5" && opcion !== null) {
        continuar = confirm("Desea continuar?(Aceptar para seguir manipulando el carrito/Cancelar para continuar el proceso de compra ?");
        confirmar_compra = true;
      }

    }

    //confirmamos la compra del usuario

    if (confirmar_compra) {
      let confirmar = confirm("confirmar compra?");
      if (confirmar) {
        const lista_precios = listaPrecios(nombre_usuario)
        //le mostramos al usuario el monto de la compra
        let total_compra = totalCompra(lista_precios);
        alert("El total de la compra es de" + " " + total_compra + " " + "pesos");
      } else {
        alert("Compra cancelada");
      }

    }
  }




  function login() {
    //Solicitar al usuario que ingrese su nombre de usuario y contraseña
    nombre_usuario = prompt("Ingrese su usuario");
    password = prompt("Ingrese su password");
    //validar el login utilizando la función validarLogin
    let validacion_loguin = validarLogin();
    if (validacion_loguin) {
      let nombre_cliente = nombreCliente(nombre_usuario);
      alert("Hola" + " " + nombre_cliente);
      return true;
    }
    //Si el login no es válido mostrar un mensaje de error
    alert("No se ha podido loguear correctamente, el usuario no existe");
  }

  function validarLogin() {
    // Recorrer la lista de usuarios y verificar si el nombre de usuario y contraseña ingresados coinciden
    for (let i = 0; i < usuarios.lista_usuarios.length; i++) {
      if (nombre_usuario === usuarios.lista_usuarios[i].user_name && password === usuarios.lista_usuarios[i].user_pass) {
        //retornamos true si se encontraron coincidencias
        return true;
      }
    }


    let mensaje = "";

    //le mostramos al usuario un mensaje o una alerta indicandole el error
    if (nombre_usuario === "" || nombre_usuario === null) {
      mensaje = "No ingresó Usuario \n";
    }
    if (password === "" || password === null) {
      mensaje += "No ingresó contraseña";
    }

    if (mensaje !== "") {
      alert(mensaje);
    } else {
      alert("Nombre de usuario o contraseña incorrectos");
    }

    return false;
  }


  //Recorremos la lista de usuarios y obtenemos el usuario que contiene el user_name ingresado por el mismo
  function encontrarUsuario(usuario) {
    return usuarios.lista_usuarios.find((el) => el.user_name === usuario);
  }
  //Se muestra el menú de opciones al usuario
  function mostrarMenu() {
    let mensaje = "";
    mensaje = "seleccione la opción númerica que desea realizar:";
    mensaje += "\n" + "1-" + "Agregar producto";
    mensaje += "\n" + "2-" + "Eliminar producto";
    mensaje += "\n" + "3-" + "Ver Carrito";
    mensaje += "\n" + "4-" + "Promoción 20% off";
    mensaje += "\n" + "5-" + "Salir";
    let opcion = prompt(mensaje);
    return opcion;
  }
  //obenemos el nombre del cliente
  function nombreCliente(usuario) {
    return encontrarUsuario(usuario).cliente.nombre;
  }

  function seleccionarProducto(mensaje) {
    //solicitar al usuario que ingrese el id del producto a comprar
    let id = prompt(mensaje);
    switch (id) {
      case "1":
        return producto1;
      case "2":
        return producto2;
      case "3":
        return producto3;

      case "4":
        return producto4;

      case "5":
        return producto5;

      case "6":
        return producto6;
    }
  }

  function comprarProducto(usuario, producto) {
    //Agregar el producto seleccionado al carrito de compras del usuario1
    encontrarUsuario(usuario).carrito_de_compra.agregarProducto(producto);
  }
  function cantidadElementos(usuario) {
    let cantidad_elementos = encontrarUsuario(usuario).carrito_de_compra.productos.length;
    return cantidad_elementos;
  }
  //Nos muestra el carrito del usuario
  function verCarrito(usuario) {
    let cantidad_elementos = cantidadElementos(usuario);
    if (cantidad_elementos !== 0) {
      let carrito = encontrarUsuario(usuario).carrito_de_compra.getProductos();
      alert(usuario + " " + "Su carrito de compras contiene los siguientes productos:\n" + carrito);
    } else {
      alert("Su carrito está vacío");
    }

  }
  //Elimina productos del carrito
  function eliminarProducto(usuario, producto) {
    encontrarUsuario(usuario).carrito_de_compra.eliminarProducto(producto);
  }
  //Nos devulve el monto de la compra
  function listaPrecios(usuario) {
    //creo un nuevo array de precios
    const lista_precios = encontrarUsuario(usuario).carrito_de_compra.productos.map((el) => el.precio
    );
    return lista_precios
  }
  //obtengo la suma de los precios
  function totalCompra(lista) {
    const total = lista.reduce((acumulador, el) => acumulador + el, 0);
    return total;
  }

  //le aplicamos el 20% de descuento a los precios de los productos
  function promocion(usuario) {

    encontrarUsuario(usuario).carrito_de_compra.productos.map((el) => el.setPrecioProducto(el.precio * 0.8));

  }

  //validamos el cupón
  function validarCupon() {
    n_cupon = parseInt(prompt("Ingrese el número del cupón"));
    if (isNaN(n_cupon)) {
      alert("Ingrese solo números");
      return false;
    }
    if (n_cupon === numero_cupon) {
      alert("Promoción válida")
      descuento_aplicado = true;
      return true
    } else {
      alert("Cupón no válido")
      return false

    }


  }

});

