var tabla = [
  "tigre",
  "zorro",
  "cocodrilo",
  "panda",
  "jirafa",
  "delfin",
  "perro",
  "gato",
  "caballo",
  "hamster",
  "conejo",
  "cobaya",
  "tortuga",
];

var indice = obtenerIndiceAleatorio();
var palabra = tabla[indice];
var arrayp = palabra.split("");
var container = document.getElementById("container");
var salida = document.getElementById("fallos");
var solucion = [];
var fallos = 0;
var finalGanado = false;
var won = 0;
var lost = 0;
var ultimoIndice = indice; // Nuevo

let tigreModal = document.getElementById("tigreModal-btn");
tigreModal.style.display = "none";
let zorroModal = document.getElementById("zorroModal-btn");
zorroModal.style.display = "none";
let cocodriloModal = document.getElementById("cocodriloModal-btn");
cocodriloModal.style.display = "none";
let pandaModal = document.getElementById("pandaModal-btn");
pandaModal.style.display = "none";
let jirafaModal = document.getElementById("jirafaModal-btn");
jirafaModal.style.display = "none";
let delfinModal = document.getElementById("delfinModal-btn");
delfinModal.style.display = "none";
var perroModal = document.getElementById("perroModal-btn");
perroModal.style.display = "none";
var gatoModal = document.getElementById("gatoModal-btn");
gatoModal.style.display = "none";
var caballoModal = document.getElementById("caballoModal-btn");
caballoModal.style.display = "none";
var hamsterModal = document.getElementById("hamsterModal-btn");
hamsterModal.style.display = "none";
var conejoModal = document.getElementById("conejoModal-btn");
conejoModal.style.display = "none";
var cobayaModal = document.getElementById("cobayaModal-btn");
cobayaModal.style.display = "none";
var tortugaModal = document.getElementById("tortugaModal-btn");
tortugaModal.style.display = "none";

for (var i = 0; i < arrayp.length; i++) {
  solucion.push("-");
  container.innerHTML = solucion.join(" ");
}

function obtenerIndiceAleatorio() {
  var nuevoIndice;
  do {
    nuevoIndice = Math.floor(Math.random() * 13);
  } while (nuevoIndice === ultimoIndice);
  ultimoIndice = nuevoIndice;
  return nuevoIndice;
}

function enviado(tecla) {
  var boton = document.getElementById(tecla);

  // Deshabilitar el botón para evitar clics adicionales
  boton.disabled = true;

  var encontrado = palabra.indexOf(tecla);

  //si adivina
  if (encontrado != -1) {
    for (var j = 0; j < arrayp.length; j++) {
      if (arrayp[j] == tecla) {
        solucion[j] = tecla;
      }
      container.innerHTML = solucion.join(" ");
      var terminado = solucion.indexOf("-");
      if (terminado == -1) {
        lanzarConfeti();
        container.innerHTML +=
          "<br>¡Bien hecho! <br> Recuerda, cada animal cuenta con características únicas.<br>Al igual que tú y yo :), ¡dale al botón de aprender más para descubrir más!";

        finalGanado = true;
        //reseteo el array para validar la palabra
        let animal = solucion.join("");
        switch (animal) {
          case "tigre":
            tigreModal.style.display = "block";
            break;
          case "zorro":
            zorroModal.style.display = "block";
            break;
          case "cocodrilo":
            cocodriloModal.style.display = "block";
            break;
          case "panda":
            pandaModal.style.display = "block";
            break;
          case "jirafa":
            jirafaModal.style.display = "block";
            break;
          case "delfin":
            delfinModal.style.display = "block";
            break;
          case "perro":
            perroModal.style.display = "block";
            break;
          case "gato":
            gatoModal.style.display = "block";
            break;
          case "caballo":
            caballoModal.style.display = "block";
            break;
          case "hamster":
            hamsterModal.style.display = "block";
            break;
          case "conejo":
            conejoModal.style.display = "block";
            break;
          case "cobaya":
            cobayaModal.style.display = "block";
            break;
          case "tortuga":
            tortugaModal.style.display = "block";
            break;
        }

        // Cambiar la clase del botón al ganar
        boton.classList.remove("btn-outline-primary");
        boton.classList.add("btn-success");

        var teclado = document.getElementById("teclado");
        teclado.innerHTML = "";
        salida.innerHTML = muestraboton();
      }
    }
    if (finalGanado) {
      won++;
      document.getElementById("win").innerHTML = won;
      finalGanado = false;
    }
  } else {
    fallos++;
    salida.innerHTML = "Con " + (6 - fallos) + " fallos habrás perdido";
    document.getElementById("imagen").src =
      "https://jadigar.neocities.org/codepen/ahorcado-" + fallos + ".jpg";

    // Cambiar la clase del botón al perder
    boton.classList.remove("btn-outline-primary");
    boton.classList.add("btn-danger");

    if (fallos >= 6) {
      container.innerHTML = "PERDISTE !!!!! ";
      lost++;
      salida.innerHTML =
        '<div class="d-flex flex-column align-items-center"><div>La solución era: ' +
        palabra +
        "</div><div>" +
        muestraboton() +
        "</div></div>";
      var teclado = document.getElementById("teclado");
      teclado.innerHTML = "";
    }
  }
}

function muestraboton() {
  return '<button id="restart-game" type="button" class="btn btn-primary" onclick="reiniciar()">Jugar otra vez</button> ';
}

function reiniciar() {
  indice = Math.floor(Math.random() * 13);
  palabra = tabla[indice];
  arrayp = palabra.split("");
  solucion = [];
  fallos = 0;
  tigreModal.style.display = "none";
  zorroModal.style.display = "none";
  cocodriloModal.style.display = "none";
  pandaModal.style.display = "none";
  jirafaModal.style.display = "none";
  delfinModal.style.display = "none";
  perroModal.style.display = "none";
  gatoModal.style.display = "none";
  caballoModal.style.display = "none";
  hamsterModal.style.display = "none";
  conejoModal.style.display = "none";
  cobayaModal.style.display = "none";
  tortugaModal.style.display = "none";

  for (var i = 0; i < arrayp.length; i++) {
    solucion.push("-");
    salida.innerHTML = "Con 6 fallos habrás perdido";
    container.innerHTML = solucion.join(" ");
    document.getElementById("lost").innerHTML = lost;
    document.getElementById("win").innerHTML = won;
    document.getElementById("imagen").src =
      "https://jadigar.neocities.org/codepen/ahorcado-0.jpg";
    teclado.innerHTML =
      '<button id="a" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'a\')">A</button>' +
      '<button id="b" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'b\')">B</button>' +
      '<button id="c" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'c\')">C</button>' +
      '<button id="d" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'d\')">D</button>' +
      '<button id="e" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'e\')">E</button>' +
      '<button id="f" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'f\')">F</button>' +
      '<button id="g" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'g\')">G</button>' +
      '<button id="h" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'h\')">H</button>' +
      '<button id="i" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'i\')">I</button>' +
      '<button id="j" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'j\')">J</button>' +
      '<button id="k" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'k\')">K</button>' +
      '<button id="l" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'l\')">L</button>' +
      '<button id="m" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'m\')">M</button>' +
      '<button id="n" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'n\')">N</button>' +
      '<button id="ñ" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'ñ\')">Ñ</button>' +
      '<button id="o" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'o\')">O</button>' +
      '<button id="p" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'p\')">P</button>' +
      '<button id="q" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'q\')">Q</button>' +
      '<button id="r" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'r\')">R</button>' +
      '<button id="s" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'s\')">S</button>' +
      '<button id="t" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'t\')">T</button>' +
      '<button id="u" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'u\')">U</button>' +
      '<button id="v" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'v\')">V</button>' +
      '<button id="w" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'w\')">W</button>' +
      '<button id="x" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'x\')">X</button>' +
      '<button id="y" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'y\')">Y</button>' +
      '<button id="z" type="button" class="btn btn-outline-primary m-1" onclick="enviado(\'z\')">Z</button>';
  }
}

function lanzarConfeti() {
  confetti({
    angle: 90,
    spread: 120,
    particleCount: 100,
    colors: ["#FF0000", "#00FF00", "#0000FF"],
    origin: { x: 0.5, y: 0.5 },
  });
}
