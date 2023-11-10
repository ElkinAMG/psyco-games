import "../public/index.css"; //Esto es lo que queremos lograr

const User = require("./User");

const initialModal = new bootstrap.Modal("#initialModal");
initialModal.show();

const initialForm = document.getElementById("initialFormUser");
const submitButton = document.getElementById("initialFormButton");

const userInput = {};

/**
 * @type {User}
 */
let user;

initialForm.onchange = (ev) => {
  userInput[ev.target.name] = ev.target.value;
};

submitButton.onclick = (_ev) => {
  user = new User(userInput?.name, userInput?.age, userInput?.genre);
  initialModal.hide();
};
