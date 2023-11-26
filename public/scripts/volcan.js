const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
let intervalId;

draggableElements.forEach(elem => {
  elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
  // elem.addEventListener("drag", drag); // Fires when a dragged item (element or text selection) is dragged
  // elem.addEventListener("dragend", dragEnd); // Fires when a drag operation ends (such as releasing a mouse button or hitting the Esc key) - After the dragend event, the drag and drop operation is complete
});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter); 
  elem.addEventListener("dragover", dragOver); 
  elem.addEventListener("dragleave", dragLeave); 
  elem.addEventListener("drop", drop); 
});

// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
}

//Events fired on the drop target

function dragEnter(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if(!event.target.classList.contains("dropped")) {
    event.preventDefault(); // Prevent default to allow drop
  }
}

function dragLeave(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  event.preventDefault(); // This is in order to prevent the browser default handling of the data
  event.target.classList.remove("droppable-hover");
  const draggableElementData = event.dataTransfer.getData("text"); // Get the dragged data. This method will return any data that was set to the same type in the setData() method
  const droppableElementData = event.target.getAttribute("data-draggable-id");
  const isCorrectMatching = draggableElementData === droppableElementData;
  if(isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementData);
    event.target.classList.add("dropped");
    // event.target.style.backgroundColor = draggableElement.style.color; // This approach works only for inline styles. A more general approach would be the following: 
    event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.insertAdjacentHTML("afterbegin", `<i class="fas fa-${draggableElementData}"></i>`);
    clearInterval(intervalId);
    Swal.fire({
      icon: "success",
      title: "!Bien hecho!",
      text: "¡En muchas ocasiones somos como ese volcán! Nos llenamos de rabia y solemos explotar, haciéndonos daño a nosotros mismos o a las personas que más amamos! El psicólogo(a) que te guía te dará una hoja, en donde encontraras el dibujo de un volcán, en la parte inferior del volcán cuéntanos aquellas cosas que te dan IRA y te hacen explotar y en la lava, escribe o dibuja como reaccionas generalmente ante esa IRA.",
      backdrop: `
          rgba(0,0,123,0.4)
          url("/assets/volcan/star.gif")
          left top
          no-repeat
        `
      
    });
  }else{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Elige otra manera de calmar la lava, piensa mejor y encuentra la solución!",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/assets/volcan/rene.gif")
          left top
          no-repeat
        `
      });
  }
}



function startCounter(duration, display, imageElement) {
  let timer = duration;
  intervalId = setInterval(function () {
    display.textContent = timer;

    // Cambiar la imagen cada 5 segundos restantes
    if (timer % 4 === 0) {
      const imageNumber = timer / 4;
      imageElement.src = `/assets/volcan/${imageNumber}.png`;
    }

    if (--timer < 0) {
      clearInterval(intervalId); // Detener el contador
      timer = 0; // Asegurar que el tiempo restante sea 0
      display.textContent = timer; // Actualizar la pantalla con el tiempo restante
      Swal.fire({
        title: "!Oh no!, !El volcan estalló de furia!",
        width: 600,
        padding: "3em",
        color: "white",
        background: "rgba(0,0,0,0.8) url(/assets/volcan/1670.png)",
        imageWidth: 400,
        imageHeight: 200,
        backdrop: `
          rgba(0,0,123,0.4)
          url("/assets/volcan/volcan.gif")
          right
          no-repeat
        `
      });
      imageElement.src = `/assets/volcan/1.png`;
    }
  }, 1000);
}

// Inicia el contador y configura la imagen al cargar la página
window.onload = function () {
  const duration = 16; // Tiempo en segundos
  const display = document.getElementById("time");
  const imageElement = document.getElementById("volcanImage");
  startCounter(duration, display, imageElement);
};