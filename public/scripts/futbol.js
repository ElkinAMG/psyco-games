let genero = null;

function switchPlayer(genre) {
  var arqueroImg = $("#arqueroImg");

  if (genero === "M") {
    console.log("Arquero seleccionado: Hombre");
    // Cambiar dinámicamente la imagen del arquero hombre
    arqueroImg.attr("src", "./assets/futbol/portero2.png");
  } else if (genero === "F") {
    console.log("Arquero seleccionado: Mujer");
    // Cambiar dinámicamente la imagen del arquero mujer
    arqueroImg.attr("src", "./assets/futbol/portera.png");
  } else {
    console.log("Selección no válida");
  }
}

$(document).ready(function () {
  $("#shemal,#yemeen,#nos")
    .fadeOut(200)
    .fadeIn(200)
    .fadeOut(200)
    .fadeIn(200)
    .css("background-color", "rgba(255,0,0,0.7)");

  $("#shemal,#yemeen,#nos").css("cursor", "pointer");

  genero = JSON.parse(localStorage.getItem("user")).genre;

  switchPlayer(genero);
});

function mostrarArquero() {
  var genero = $("input[name='flexRadioDefault']:checked").val();

  // Obtener la referencia al elemento img usando jQuery
  var arqueroImg = $("#arqueroImg");

  if (genero === "M") {
    console.log("Arquero seleccionado: Hombre");
    // Cambiar dinámicamente la imagen del arquero hombre
    arqueroImg.attr("src", "./assets/futbol/portero2.png");
  } else if (genero === "F") {
    console.log("Arquero seleccionado: Mujer");
    // Cambiar dinámicamente la imagen del arquero mujer
    arqueroImg.attr("src", "./assets/futbol/portera.png");
  } else {
    console.log("Selección no válida");
  }
}

var maxTiros = 15; // Número máximo de tiros
var tiros = 0; // Número actual de tiros

function mostrarAlertaConDelay() {
  setTimeout(mostrarAlerta, 300); // Retraso de 1 segundo (1000 milisegundos)
}

function mostrarAlertaTiros() {
  var goals = parseInt($("#goals").text(), 10);

  if (tiros === maxTiros) {
    if (goals <= 14 && goals >= 10) {
      Swal.fire({
        title:
          "Estuviste cerca, anotaste " + goals + " de un máximo de " + maxTiros,
        icon: "error",
        showConfirmButton: false,
        timer: 4000,
        showClass: {
          popup: `
                      animate__animated
                      animate__fadeInUp
                      animate__faster
                    `,
        },
        hideClass: {
          popup: `
                      animate__animated
                      animate__fadeOutDown
                      animate__faster
                    `,
        },
      });
      $("#again").text("¡Vuelve a intentar jugar!");
    } else if (goals >= 8 && goals <= 12) {
      Swal.fire({
        title:
          "Haz perdido, tan solo pudiste anotar " +
          goals +
          " de un máximo de " +
          maxTiros,
        icon: "error",
        showConfirmButton: false,
        timer: 6000,
        showClass: {
          popup: `
                      animate__animated
                      animate__fadeInUp
                      animate__faster
                    `,
        },
        hideClass: {
          popup: `
                      animate__animated
                      animate__fadeOutDown
                      animate__faster
                    `,
        },
      });
      $("#again").text("¡Vuelve a intentar jugar!");
    } else if (goals <= 7) {
      Swal.fire({
        title:
          "Mala suerte, solo anotaste" + goals + " de un máximo de " + maxTiros,
        icon: "error",
        showConfirmButton: false,
        timer: 4000,
        showClass: {
          popup: `
                      animate__animated
                      animate__fadeInUp
                      animate__faster
                    `,
        },
        hideClass: {
          popup: `
                      animate__animated
                      animate__fadeOutDown
                      animate__faster
                    `,
        },
      });
      $("#again").text("¡Vuelve a intentar jugar!");
    }
  }
}

function mostrarAlerta() {
  var goals = parseInt($("#goals").text(), 10);

  if (goals == maxTiros) {
    Swal.fire({
      title:
        "¡Felicidades! Has marcado todos los " +
        goals +
        " goles de " +
        tiros +
        " tiros ¡Eres un verdadero campeón!",
      icon: "success",
      showConfirmButton: false,
      timer: 4000,
      showClass: {
        popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `,
      },
      hideClass: {
        popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `,
      },
    });
  } else if (goals == 10) {
    Swal.fire({
      title:
        "¡Buen trabajo! Has alcanzado " +
        goals +
        " goles de " +
        tiros +
        " tiros!",
      icon: "info",
      showConfirmButton: false,
      timer: 4000,
      showClass: {
        popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `,
      },
      hideClass: {
        popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `,
      },
    });
  } else if (goals == 5) {
    Swal.fire({
      title:
        "No estás tan mal. Has marcado " +
        goals +
        " goles de " +
        tiros +
        " tiros ¡Sigue practicando!",
      icon: "info",
      showConfirmButton: false,
      timer: 4000,
      showClass: {
        popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `,
      },
      hideClass: {
        popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `,
      },
    });
  }
}

var test = 0,
  goals = 1,
  goalkeeper = 0,
  player = 0;

function GoalOrNot(i) {
  document.getElementById("tiros").innerHTML = ++tiros;

  if (player != goalkeeper) {
    document.getElementById("goals").innerHTML = goals++;
    if (goals <= maxTiros) {
      mostrarAlerta();
    }
    mostrarAlertaTiros();
  }
}

//RIGHT
function dosyemeen() {
  //Function when click right
  if (test == 0) {
    goalkeeper = btn_click(); //RANDOM FUNCTION of the goal keeper
    $("#kora").animate({ top: "37%", left: "+=280px" }, 100);
    test = 1;
    $("#shoot").css("display", "none");
    $("#again").css("display", "block");
    player = 0;
    GoalOrNot(player);
  }
}

//LEFT
function dosshemal() {
  //Function when click left
  if (test == 0) {
    goalkeeper = btn_click(); //RANDOM FUNCTION Bta3et el 7ares
    $("#kora").animate({ top: "37%", left: "34%" }, 100);
    test = 1;
    $("#shoot").css("display", "none");
    $("#again").css("display", "block");
    player = 2;
    GoalOrNot(player);
  }
}

//CENTER
function dosfelnos() {
  //Function lama badoos felnos
  if (test == 0) {
    goalkeeper = btn_click(); //RANDOM FUNCTION of the goal keeper
    $("#kora").animate({ top: "32%", left: "+=1.5%" }, 100);
    test = 1;
    $("#shoot").css("display", "none");
    $("#again").css("display", "block");
    player = 1;
    GoalOrNot(player);
  }
}

function playAgain() {
  if (tiros === maxTiros) {
    // Cambia el mensaje y resetea las variables
    $("#again").text("¡Vuelve a intentar jugar!");
    tiros = 0;
    goals = 0;
    $("#ares").css({ transform: "rotate(0)" }, 100);
    $("#tiros").text(tiros);
    $("#goals").text(goals);
    $("#again").text("Click aquí para tirar otro!");
  } else {
    // Continúa con la lógica actual
    $("#kora").animate({ top: "80%", left: "47%" }, 100);
    $("#ares").css({ transform: "rotate(0)" }, 100);
    $("#ares").animate({ top: "40%", left: "45%" }, 100);
    $("#again").css("display", "none");
    $("#shoot").css("display", "block");
    test = 0;
  }
}

function mover() {
  //The goal keeper goes right
  $("#ares").css({ transform: "rotate(25deg)" }, 100);
  $("#ares").animate({ top: "-=50px", left: "980px" }, 100);
}
function movel() {
  //The goal keeper goes left
  $("#ares").css({ transform: "rotate(-25deg)" }, 100);
  $("#ares").animate({ top: "-=50px", left: "-=180px" }, 100);
}

function movec() {
  //The goal keeper goes center
  $("#ares").animate({ top: "-=50px" }, 100);
}

// Put the 3 functions of the goal keeper in the array of functions
var array_o = [mover, movec, movel];

//Random Function
function btn_click() {
  var num = Math.floor(Math.random() * 3);
  array_o[num]("a string");
  return num;
}

var x = array_o[0];
var y = array_o[1];
var z = array_o[2];
