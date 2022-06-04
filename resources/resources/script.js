//DYNAMIC TABLE GENERATORS
/**
 * Cofee dynamic table generator function
 */
function tablaDeCafes() {
  readTextFile("../resources/json/cafes.json", function (text) {
    var json = JSON.parse(text);
    //console.log(json);
    processData(json);
  });
  /**
   * This function must be called after reading JSON data
   */
  function processData(json) {
    const cafes = json.cafes;
    cafes.forEach((cafe) => {
      cafe.disponibilidad =
        cafe.disponibilidad === "yes" ? "Disponible" : "No disponible";
    });

    const headers = ["Café", "Precio", "Disponibilidad"];

    let txt = buildTable(cafes, headers);
    document.getElementById("cafeTabla").innerHTML = txt;

    // add class dinamically
    var mytable = document.getElementsByTagName("table")[0];
    mytable.classList.add("tablaDinamica");
  }
}
/**
 * Orders dynamic table generator function
 */
function tablaDePedidos() {
  //usage: operation async
  readTextFile("../resources/json/pedidos.json", function (text) {
    var json = JSON.parse(text);
    //console.log(json);
    processData(json);
  });
  /**
   * This function must be called after reading JSON data
   */
  function processData(json) {
    var pedidos = json.pedidos;
    //console.log(pedidos);
    // use foreach better than map
    pedidos.forEach((pedido) => {
      pedido.estado = setEstado(pedido);
      pedido.pto = setPto(pedido);
      pedido.importe = "$" + (pedido.cant * pedido.precio).toFixed(2);
    });

    const headers = [
      "Id",
      "Café",
      "Cant.",
      "Telf.",
      "Nombre",
      "Apellidos",
      "Punto de R.",
      "Estado",
      "Precio",
      "Importe",
    ];

    //txt += "<tr><th>IdPedido</th><th>Café</th><th>Cantidad</th><th>Teléfono</th><th>Nombre</th><th>Apellidos</th><th>Punto Recogida</th><th>Estado</th><th>Precio</th><th>Importe</th>"
    let txt = buildTable(pedidos, headers);
    document.getElementById("wrapper").innerHTML = txt;

    // add class dinamically
    var mytable = document.getElementsByTagName("table")[0];
    mytable.classList.add("tablaDinamica");
  }
}
/**
 * Opinions about service. Dynamic table generator function
 */
function tablaDeOpinionesServicio() {
  readTextFile("../resources/json/opiniones_servicio.json", function (text) {
    var json = JSON.parse(text);
    //console.log(json);
    processData(json);
  });
  /**
   * This function must be called after reading JSON data
   */
  function processData(json) {
    const opinionesServicio = json.opinionesServicio;
    opinionesServicio.forEach((opinion) => {
      opinion.percentage = opinion.percentage * 100;
      opinion.percentage = opinion.percentage + " %";
    });

    const headers = ["Id", "% de Satisfacción", "Detalles"];

    let txt = buildTable(opinionesServicio, headers);
    document.getElementById("wrapper").innerHTML = txt;

    // add class dinamically
    var mytable = document.getElementsByTagName("table")[0];
    mytable.classList.add("tablaDinamica");
  }
}
/**
 * Opinions about how is the web is working. Dynamic table generator function.
 */
function tablaDeOpinionesWeb() {
  readTextFile("../resources/json/opiniones_web.json", function (text) {
    var json = JSON.parse(text);
    //console.log(json);
    processData(json);
  });
  /**
   * This function must be called after reading JSON data
   */
  function processData(json) {
    const opinionesWeb = json.opinionesWeb;
    opinionesWeb.forEach((opinion) => {
      opinion.selections.forEach((select) => { //NOT WORKING
        select = setIssue(select);
      });  
    });

    const headers = ["Id", "Problemas", "Detalles"];

    let txt = buildTable(opinionesWeb, headers);
    document.getElementById("wrapper").innerHTML = txt;

    // add class dinamically
    var mytable = document.getElementsByTagName("table")[0];
    mytable.classList.add("tablaDinamica");
  }
}

//FORMS DATA VALIDATORS
/**
 * This function validates Orders form
 * @returns true if inputs data are correct, false IOC
 */
function validateFormPedido() {
  var telNumber = document.forms["pedido"]["tel"].value;
  if (isNaN(telNumber)) {
    //document.getElementById(telInfo).style.display = "block";
    alert("El número de teléfono contiene caracteres incorrectos.");
    return false;
  } else {
    return true;
  }
}

/**
 * This function validates Reservation form
 * @returns true if inputs data are correct, false IOC
 */
function validateFormReserva() {
  var dateReserva = new Date(document.forms["reserva"]["dateR"].value);
  var now = new Date();
  //alert((((dateReserva.getHours()<10 || dateReserva.getHours()>21) && (dateReserva.getDay()>=1 || dateReserva.getDay()<=4))));
  if (
    dateReserva <= now ||
    ((dateReserva.getHours() < 10 || dateReserva.getHours() > 11) &&
      (dateReserva.getDay() >= 5 || dateReserva.getDay() === 0)) ||
    ((dateReserva.getHours() < 10 || dateReserva.getHours() > 21) &&
      (dateReserva.getDay() >= 1 || dateReserva.getDay() <= 4))
  ) {
    alert(
      "Elija una fecha y hora correctas, por favor. Tenga en cuenta reservar una hora antes de nuestro cierre."
    );
    return false;
  } else {
    return true;
  }
}

//MOTIVATIONAL PHRASES IMPLEMENTS THIS:
/**
 * Motivational phrases array.
 */
let frasesTrabajador = [];
/**
 * This function shows up motivational phrases in the navbar.
 */
async function generarFraseTrabajador() {
  if (frasesTrabajador.length == 0) {
    //load frases from book
    const file = "../data/frasesTrabajadores.txt";
    await fetch(file)
      .then((obj) => obj.text())
      .then((text) => {
        frasesTrabajador = text.split("\n");
        //console.log(text + "\n" + frasesTrabajador.length)
      });
  }
  //console.log("first")
  document.getElementById("motivacion").innerHTML = `<li">${
    frasesTrabajador[Math.floor(Math.random() * frasesTrabajador.length)]
    }</li>`;
  // alert(frasesTrabajador[Math.floor(Math.random() * frasesTrabajador.length)]); //
}


//OTHER UTIL FUNCTIONS
/**
 * 
 * @param {object} _pedido 
 * @returns string "Entregado" if the status property (estado) from _pedido is "1"
 * @returns string "Por entregar" if the status property (estado) from _pedido have any value but 1
 */
function setEstado(_pedido) {
  if (_pedido.estado === "1") {
    return "Entregado";
  } else {
    return "Por entregar";
  }
}
/**
 * Provisional login function
 */
function loginU (){
  //console.log(document.forms["login"]["pass"]);
  if(document.forms["login"]["user"].value==="root" && document.forms["login"]["pass"].value==="root"){
    return true;
  }
  else{
    alert(
      "Usuario y contraseña incorrectos."
    );
    return false;
  } 
}
/**
 * 
 * @param {object} _pedido 
 * @returns  pick up point name of any order
 * @example _pedido.pto="1" return "Matanzas Este"
 */
function setPto(_pedido) {
  switch (_pedido.pto) {
    case "1":
      return "Matanzas Este";
    case "2":
      return "Matanzas Oeste";
    case "3":
      return "Versalles";
    case "4":
      return "Pueblo Nuevo";
    case "5":
      return "Pastorita";
    default:
      return "Nuestro Local";
  }
}

function setIssue(_select) {
  switch (_select) {
    case "1":
      return "No se muestra correctamente en un dispositivo móvil";
    case "2":
      return "No cargan las imágenes";
    case "3":
      return "Diseño incorrecto";
    case "4":
      return "No envía mis pedidos";
    case "5":
      return "No envía mis reservaciones";
    case "6":
      return "Carga muy lento";
    case 7:
      return "Muestra el error Cannot GET..."
    default:
      return "Ninguna de las selecciones";
  }
}

