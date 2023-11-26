var symbols = ['face-dizzy', 'face-dizzy', 'face-grin-hearts', 'face-grin-hearts', 'face-kiss-wink-heart','face-kiss-wink-heart' , 'face-grin-tongue-squint', 'face-grin-tongue-squint', 'smile', 'smile', 'face-angry', 'face-angry', 'face-sad-tear', 'face-sad-tear', 'face-meh', 'face-meh'],
		opened = [],
		match = 0,
		moves = 0,
		$deck = $('.deck'),
		$scorePanel = $('#score-panel'),
		$moveNum = $scorePanel.find('.moves'),
		$ratingStars = $scorePanel.find('i'),
		$restart = $scorePanel.find('.restart'),
		delay = 800,
		gameCardsQTY = symbols.length / 2,
		rank3stars = gameCardsQTY + 2,
		rank2stars = gameCardsQTY + 6,
		rank1stars = gameCardsQTY + 10;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
	
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Initial Game
function initGame() {
	var cards = shuffle(symbols);
	
  $deck.empty();
  match = 0;
  moves = 0;
  $moveNum.html(moves);
  $ratingStars.removeClass('fa-star-o').addClass('fa-star');
	for (var i = 0; i < cards.length; i++) {
		$deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
	}
};

// Set Rating and final Score
function setRating(moves) {
	var rating = 3;
	if (moves > rank3stars && moves < rank2stars) {
		$ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
		rating = 2;
	} else if (moves > rank2stars && moves < rank1stars) {
		$ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
		rating = 1;
	} else if (moves > rank1stars) {
		$ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
		rating = 0;
	}	
	return { score: rating };
};

function detenerTemporizador() {
    clearInterval(temporizador);
}


// End Game
function endGame(moves, score) {

	detenerTemporizador()
	Swal.fire({
		title: 'Felicidades! Eres impresionante!',
		text: 'Con ' + moves + ' movimientos y ' + score + ' Estrellas.',
		icon: 'success',
	}).then(function(isConfirm) {
		if (isConfirm) {
			tiempoRestante= 40;
			actualizarTiempo();
			initGame();
			
		}
	})
}

// Restart Game
$restart.on('click', function() {
    initGame();
	tiempoRestante= 40;
	actualizarTiempo()
});

//Time
var tiempoRestante = 40;
var temporizador;

function actualizarTiempo() {
    $('.seconds').text('Tienes ' + tiempoRestante + ' segundos');
}

function iniciarTemporizador() {
    temporizador = setInterval(function() {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            actualizarTiempo();
        } else {
            // Mostrar alerta cuando se agote el tiempo
            Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "¡Tiempo acabado!"
			  });
            reiniciarJuego();
        }
    }, 1000);  // Actualizar cada segundo
}

function reiniciarJuego() {
    aciertos = 0;
    tiempoRestante = 40;
    $('.aciertos').text('Aciertos: ' + aciertos);
    iniciarTemporizador();
    clearInterval(temporizador);  // Detener el temporizador
    initGame();  // Función para reiniciar el juego
}



var aciertos= 0;

// Card flip
$deck.on('click', '.card:not(".match, .open")', function() {
	if (!temporizador) {
        iniciarTemporizador();
    }

	if($('.show').length > 1) { return true; }
	
	var $this = $(this),
    card = $this.find('i').attr('class');
$this.addClass('open show');
opened.push(card);


	// Compare with opened card
  if (opened.length > 1) {
	
    if (card === opened[0]) {
      $deck.find('.open').addClass('match animated infinite rubberBand');
      setTimeout(function() {
        $deck.find('.match').removeClass('open show animated infinite rubberBand');
      }, delay);
      match++;
	  aciertos++;
	  $('.aciertos').text('Aciertos: ' + aciertos);
    } else {
      $deck.find('.open').addClass('notmatch animated infinite wobble');
			setTimeout(function() {
				$deck.find('.open').removeClass('animated infinite wobble');
			}, delay / 1.5);
      setTimeout(function() {
        $deck.find('.open').removeClass('open show notmatch animated infinite wobble');
      }, delay);
    }
    opened = [];
		moves++;
		setRating(moves);
		$moveNum.html(moves);
  }
	
	// End Game if match all cards
	if (gameCardsQTY === match) {
		setRating(moves);
		var score = setRating(moves).score;
		setTimeout(function() {
			endGame(moves, score);
		}, 500);
  }
});

initGame();