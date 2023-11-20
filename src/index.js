import "../public/index.css"; //Esto es lo que queremos lograr

const User = require("./User");

const initialModal = new bootstrap.Modal("#initialModal");
initialModal.show();

const userInput = {};

/**
 * @type {User}
 */
let user;

$(function () {
  const user = new User();
  user.clearSession();
});

$("#initialFormUser").change(function (ev) {
  userInput[ev.target.name] = ev.target.value;
});

$("#initialFormButton").click(function () {
  user = new User(userInput?.name, userInput?.age, userInput?.genre);
  initialModal.hide();
});

$("#continue").click(function () {
  user.createAvatar().then(() => {
    window.location.href = "gametest.html";
  });
});
