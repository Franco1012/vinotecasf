document.addEventListener("DOMContentLoaded", () => {
  //se crean dos constantes globales para ser utilizadas en el caso de otorgar usuario y contraseña
  const usuario = "franco";
  const password = "1234";

  // Verificamos si es mayor de edad para acceder a la página
  let mayor_de_edad = verificarEdad();
  // Verificamos si el usuario desea comprar en nuestra página
  if (mayor_de_edad) {
    let desea_comprar = adquirirProducto();
    //confirmamos si el usuario desea loguearse
    if (desea_comprar) {
      let desea_loguearse = registrarse();
      //le pedimos al usuario que ingrese sus datos
      if (desea_loguearse) {
        let perfil = pedirDatosUsuario();
        let nombre = perfil.nombre;
        let apellido = perfil.apellido;
        let edad = perfil.edad;
        let mail = perfil.mail;
        //verificamos que los datos ingresados sean correctos
        let datos_correctos = validarCampos(nombre, apellido, edad, mail);
        //le otorgamos un usuario y contraseña
        if (datos_correctos) {
          alert(
            "Los datos ingresados son correctos. A continuación se le asignará un usuario y contraseña."
          );
          mostrarUsuarioContraseña();
          //le pedimos al usuario que inicie sesion
          let cuenta_usuario = inicioSesion();
          let user_usuario = cuenta_usuario.user_usuario;
          let user_password = cuenta_usuario.user_password;
          //verificamos que los datos de sesion sean correctos
          if (user_usuario === usuario && user_password === password) {
            alert("Bienvenido " + usuario);
            //confirmamos si el usuario cambia la contraseña
            let cambiar_contraseña = cambiarContraseña();
            //le solicitamos ingresar la nueva contraseña
            if (cambiar_contraseña) {
              let nuevo_password = IngresarNuevaContraseña();
              //validamos la nueva contraseña
              if (nuevo_password != "") {
                if (nuevo_password != password) {
                  alert("su nueva contraseña se cambió exitosamente");
                  //le pedimos al usuario que ingrese el codigo de los productos a comprar
                  alert(
                    "a continuación para adquirir un producto ingrese el código correspondiente al mismo"
                  );
                  let lista_de_productos = "";
                  let compra_total = 0;
                  let codigo_vino = "";
                  do {
                    //ingresar y validar el codigo del producto ingresado
                    codigo_vino = ingresarCodigoVino();
                    //otorga la descripcion del producto
                    if (codigo_vino) {
                      let descripcion = descripcionVino(codigo_vino);
                      if (descripcion == "") {
                        alert("articulo no encontrado");
                      } else {
                        //otorga el precio del producto
                        let precio = precioVino(codigo_vino);
                        //se va guardando el precio y la descripcion de cada producto
                        lista_de_productos += descripcion;
                        compra_total += precio;
                      }
                    }
                  } while (codigo_vino != "cancelar" && codigo_vino != false);
                  //se imprime la lista de compras
                  document.write(
                    "lista de vinos comprados:" + "<br>" + lista_de_productos
                  );
                  document.write(
                    "El total de la comprar es de: " + compra_total + " pesos"
                  );
                } else {
                  alert("No puede ingresar la misma contraseña.");
                }
              } else {
                alert("Ingresa una contraseña");
              }
            } else {
              alert("Debes cambiar tu contraseña para continuar");
            }
          } else {
            let mensaje_sesion =
              "Ingresar correctamente los siguientes datos:\n";
            if (user_usuario !== usuario) {
              mensaje_sesion += "usuario\n";
            }
            if (user_password != password) {
              mensaje_sesion += "password\n";
            }
            alert(mensaje_sesion);
          }
        } else {
          alert("Ingresa nuevamente los datos");
        }
      }
    }
  } else {
    alert("Lo sentimos, no puedes acceder a esta página.");
  }

  //funcion para verificar si el usuario es mayor de edad
  function verificarEdad() {
    let mayor_de_edad = parseInt(prompt("Ingresa tu edad"));
    if (isNaN(mayor_de_edad)) {
      alert("No ingresaste un número");
      return false;
    }
    if (mayor_de_edad >= 18) {
      return true;
    }
    return false;
  }
  //funcion para confirmar si el usuario quiere adquirir un producto
  function adquirirProducto() {
    let desea_comprar = confirm("Desea adquirir un producto?");
    return desea_comprar;
  }
  //funcion para confirmar si el usuario desea registrarse
  function registrarse() {
    let desea_loguearse = confirm(
      "Para proceder a comprar en nuestra página, por favor debes loguearte"
    );
    return desea_loguearse;
  }
  //funcion para pedir los datos del usaurio
  function pedirDatosUsuario() {
    let nombre = prompt("Ingrese su nombre");
    let apellido = prompt("Ingrese su apellido");
    let edad = parseInt(prompt("Ingrese su edad"));
    let mail = prompt("Ingrese su mail");
    // Verificamos que se haya ingresado un número válido en el campo de edad
    if (isNaN(edad)) {
      alert("No ingresaste un número válido para la edad");
      return;
    }
    //retornamos los valores ingresados como un objeto con sus propiedades
    return {
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      mail: mail,
    };
  }
  //funcion para validar los campos ingresados
  function validarCampos(valor1, valor2, valor3, valor4) {
    if (valor1 === "" || valor2 === "" || valor3 === "") {
      alert("Debes ingresar datos en todos los campos");
    } else {
      let mensaje = "Los datos ingresados son correctos:\n";
      mensaje += "Nombre: " + valor1 + "\n";
      mensaje += "Apellido: " + valor2 + "\n";
      mensaje += "Edad: " + valor3 + "\n";
      mensaje += "Mail: " + valor4 + "\n";
      let datos_correctos = confirm(mensaje);
      return datos_correctos;
    }
  }
  //funcion para mostrar usuario y contraseña asignados
  function mostrarUsuarioContraseña() {
    let mensaje_usuario = "Usuario: " + usuario + "\n";
    mensaje_usuario += "Contraseña: " + password + "\n";
    alert(mensaje_usuario);
    alert(
      "Felicitaciones " +
        usuario +
        " se ha podido loguear correctamente. A continuación, inicie sesión"
    );
  }
  //funcion para iniciar sesion
  function inicioSesion() {
    user_usuario = prompt("Ingrese su usuario");
    user_password = prompt("Ingrese su contraseña");
    return {
      user_usuario: user_usuario,
      user_password: user_password,
    };
  }
  //funcion para confirmar si cambia la contraseña
  function cambiarContraseña() {
    let cambiar_contraseña = confirm("Deseas cambiar la contraseña?");
    return cambiar_contraseña;
  }
  55;
  //funcion para ingresar nueva contraseña
  function IngresarNuevaContraseña() {
    let nuevo_password = prompt("ingrese su nueva contraseña?");
    return nuevo_password;
  }
  //funcion solicitar codigo del producto
  function ingresarCodigoVino() {
    let codigo_vino = prompt(
      "Ingrese código del producto a comprar.(cancelar)para terminar"
    );
    if (validarCodigo(codigo_vino)) {
      return codigo_vino;
    }
    return false;
  }
  //funcion validar codigo
  function validarCodigo(codigo) {
    if (codigo == "") {
      alert("código vacio");
      return false;
    }
    if (!codigo || codigo.toLowerCase() == "cancelar") {
      return false;
    }
    return true;
  }
  //funcion para devolver la descripcion del producto
  function descripcionVino(vino) {
    let descripcion = "";
    switch (vino) {
      case "1":
        descripcion = "Rutini Cabernet Malbec" + "<br>";
        break;
      case "2":
        descripcion = "Trumpeter Malbec 375 ml" + "<br>";
        break;
      case "3":
        descripcion = "Encuentro Malbec" + "<br>";
        break;
      case "4":
        descripcion = "Colección Rutini Cabernet Malbec" + "<br>";
        break;
      case "5":
        descripcion = "Trumpeter Cabernet Sauvignon" + "<br>";
        break;
      case "6":
        descripcion = "Trumpeter Cabernet Franc" + "<br>";
        break;
    }
    return descripcion;
  }
  //funcion para devolver el precio del producto
  function precioVino(vino) {
    let precio = "precio no actualizado";
    switch (vino) {
      case "1":
        precio = 5350;
        break;
      case "2":
        precio = 1840;
        break;
      case "3":
        precio = 4000;
        break;
      case "4":
        precio = 4900;
        break;
      case "5":
        precio = 7500;
        break;
      case "6":
        precio = 2870;
        break;
    }
    return precio;
  }

  function imprimirLista(valor) {
    document.write("lista de vinos comprados:" + "<br>" + valor);
  }
  function totalCompra(valor) {
    document.write("El total de la comprar es de: " + valor + " pesos");
  }
});
