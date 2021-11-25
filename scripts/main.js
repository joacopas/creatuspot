const user_code = "list";

class Usuario {
  constructor(usuario, nombre, apellido, edad) {
    this.usuario = usuario;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
  }

  getFullName() {
    return this.nombre + " " + this.apellido;
  }

  show_info() {
    let msj = "";

    msj += "\nUsusario: " + this.usuario;
    msj += "\nNombre: " + this.nombre;
    msj += "\nApellido: " + this.apellido;
    msj += "\nEdad: " + this.edad;

    return msj;
  }
}

let resp = confirm("Ya estas registrado ?");

if (resp) {
  let user = prompt("Ingrese su usuario");
  if (user) {
    let find_user = search_user(user);

    find_user = new Usuario(
      find_user.usuario,
      find_user.nombre,
      find_user.apellido,
      find_user.edad
    );

    if (find_user) {
      alert(
        "Bienvenido " + find_user.nombre + " " + find_user.apellido + " a CTS"
      );
    } else {
      alert("El usuario no existe!! Porfavor registrese");
    }
  } else {
    alert("No ingresaste ningun dato");
  }
} else {
  let resp = confirm("Desea registrarse ??");

  if (resp) {
    let user = prompt("Ingrese usuario");
    let nombre = prompt("Ingrese nombre");
    let apellido = prompt("Ingrese apellido");
    let edad = prompt("Ingrese edad");

    let msj = check_data(user, nombre, apellido, edad);
    if (msj == "") {
      let new_user = new Usuario(user, nombre, apellido, edad);

      alert(
        "Tu usuario se genero correctamente con la siguiente informacion: " +
          new_user.show_info()
      );

      save_user(new_user);
    }
  }
}

function save_user(new_user) {
  console.log(new_user);

  let item = localStorage.getItem(user_code);

  if (item) {
    let guardados = JSON.parse(localStorage.getItem(user_code));
    guardados.push(new_user);

    let guardados_string = JSON.stringify(guardados);
    localStorage.setItem(user_code, guardados_string);
  } else {
    let guardados = new Array();
    guardados.push(new_user);
    let guardados_string = JSON.stringify(guardados);
    localStorage.setItem(user_code, guardados_string);
  }
}

function check_data(user, nombre, apellido, edad) {
  let msj = "";
  if (user && nombre && apellido && edad) {
    if (isNaN(parseInt(edad))) {
      msj = "No ingresate un numero en edad";
    }

    let dato = search_user(user);
    if (dato != false) {
      msj = "Ya existe el usuario";
    }
  } else {
    msj = "Debes ingresar todos los datos. ";
  }

  return msj;
}

function search_user(user) {
  if (!localStorage.getItem(user_code)) {
    return false;
  }

  let guardados = JSON.parse(localStorage.getItem(user_code));
  let user_found = false;
  let i = 0;

  while (!user_found && i != guardados.length) {
    if (guardados[i].usuario == user) {
      user_found = guardados[i];

      console.log(user_found);

      return user_found;
    }

    i++;
  }

  return user_found;
}

class Producto {
  constructor(size, price) {
    this.size = size;
    this.price = price;
  }

  getProductData() {
    return this.size + "-" + this.price;
  }

  show_product() {
    let popup = "";

    popup += "\n" + this.size + " " + this.price;

    return popup;
  }
}

let choose = confirm("Ya tiene elejido un producto?");

if (choose) {
  let product = prompt(
    "Que tamanno de fogonero desea comprar? \nLarge \nMedium \nSmall"
  );

  if (product) {
    switch (product) {
      case "large":
        alert(
          "Elijio el fogonero de tamano " + product + " que cuesta $50.000"
        );
        break;
      case "medium":
        alert(
          "Elijio el fogonero de tamano " + product + " que cuesta $40.000"
        );
        break;
      case "small":
        alert(
          "Elijio el fogonero de tamano " + product + " que cuesta $30.000"
        );
        break;
    }
  } else {
    alert("ingrese un tamano valido");
  }
} else {
  alert("Desea ver todos los productos?");
}
