import "../../public/avioncito.css";

let isWindowFocused = true;

//Variables del board
let board;
let boardWidth = 1250;
let boardHeight = 700;
let context;
let initialContext;
let gamePaused = true;

//bird
let birdWidth = 60; //width/height ratio = 408/228 = 17/12
let birdHeight = 37;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

//pipes
let pipeArray = [];
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2; //Velocicidad del pipe
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.addEventListener("focus", function () {
  isWindowFocused = true;
  if (!gamePaused) {
    // Reiniciar el juego o realizar otras acciones necesarias al volver al foco
  }
});

window.addEventListener("blur", function () {
  isWindowFocused = false;
});

function loadImages() {
  birdImg = new Image();
  birdImg.src = "./assets/avioncito/avion.png";
  birdImg.onload = function () {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  topPipeImg = new Image();
  topPipeImg.src = "./assets/avioncito/toppipe.png";
  topPipeImg.onload = function () {
    // Aquí puedes agregar lógica adicional si es necesario
  };

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./assets/avioncito/bottompipe.png";
  bottomPipeImg.onload = function () {
    // Aquí puedes agregar lógica adicional si es necesario
  };
}

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d"); //la forma de dibujar en el board
  initialContext = board.getContext("2d");

  loadImages();

  requestAnimationFrame(update);
  setInterval(placePipes, 1500); //every 1.5 seconds
  document.addEventListener("keydown", moveBird);
};

// Asegurar la carga de imágenes antes de iniciar el juego
function startGame() {
  if (birdImg.complete && topPipeImg.complete && bottomPipeImg.complete) {
    gamePaused = false;
    document.removeEventListener("keydown", startGame);
  } else {
    // Esperar a que todas las imágenes estén cargadas antes de iniciar el juego
    setTimeout(startGame, 100);
  }
}

function update() {
  requestAnimationFrame(update);

  if (gamePaused) {
    // Mostrar un mensaje de bienvenida o cualquier otra pantalla de inicio
    // Puedes dibujar el mensaje en el contexto inicial.
    initialContext.clearRect(0, 0, board.width, board.height);

    // Establece el estilo del texto
    initialContext.fillStyle = "white";
    initialContext.font = "40px Courier-New";
    initialContext.textAlign = "center"; // Centra el texto horizontalmente
    initialContext.textBaseline = "middle"; // Centra el texto verticalmente

    // Mensaje de bienvenida con salto de línea
    const welcomeMessage =
      "¡Bienvenido😁!\nUsa espacio varias veces\no Tecla hacia arriba\n Para Jugar";

    // Divide el mensaje en líneas y dibújalas
    const lines = welcomeMessage.split("\n");
    for (let i = 0; i < lines.length; i++) {
      initialContext.fillText(
        lines[i],
        board.width / 2,
        board.height / 3 + i * 40
      );
    }

    // Esperar a que el jugador presione una tecla para iniciar el juego
    document.addEventListener("keydown", startGame);
    return;
  }

  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height);

  //bird
  velocityY += gravity;
  // bird.y += velocityY;
  bird.y = Math.max(bird.y + velocityY, 0); //apply gravity to current bird.y, limit the bird.y to top of the canvas
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > board.height) {
    gameOver = true;
  }

  //pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5; //0.5 because there are 2 pipes! so 0.5*2 = 1, 1 for each set of pipes
      pipe.passed = true;
    }

    if (detectCollision(bird, pipe)) {
      gameOver = true;
    }
  }

  //clear pipes
  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift(); //removes first element from the array
  }

  //score
  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.textAlign = "left"; // Alinea el score a la izquierda
  context.textBaseline = "top"; // Alinea el score en la parte superior

  // Dibuja el score
  context.fillText(score, 5, 5);

  if (gameOver) {
    context.fillText("Recuerda, así como este, hay algunos obstáculos", 15, 70);
    context.fillText("en nuestras vidas que nos hacen tropezar", 15, 120);
    context.fillText("y caer en conductas que nos hacen daño.", 15, 170);
    context.fillText("Pero así también cómo en los videojuegos", 15, 220);
    context.fillText("siempre podemos, volver a intentarlo.", 15, 270);
    context.fillText("Así que, ¡Otra vez!", 15, 320);
    context.fillText(
      `Porque estoy seguro de que puedes hacer más de ${score} puntos!`,
      15,
      370
    );
  }
}

function placePipes() {
  if (gameOver || gamePaused || !isWindowFocused) {
    return;
  }

  //(0-1) * pipeHeight/2.
  // 0 -> -128 (pipeHeight/4)
  // 1 -> -128 - 256 (pipeHeight/4 - pipeHeight/2) = -3/4 pipeHeight
  let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let openingSpace = board.height / 4;

  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(topPipe);

  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(bottomPipe);
}

function moveBird(e) {
  if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
    //jump
    velocityY = -6;

    //reset game
    if (gameOver) {
      bird.y = birdY;
      pipeArray = [];
      score = 0;
      gameOver = false;
    }
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
    a.x + a.width > b.x && //a's top right corner passes b's top left corner
    a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y
  ); //a's bottom left corner passes b's top left corner
}
