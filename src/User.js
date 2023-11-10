class User {
  #name;
  #age;
  #genre;
  #avatar;

  /**
   *
   * @param {string} name
   * @param {"Young" | "Kid"} age
   * @param {"F" | "M"} genre
   */
  constructor(name = "Pepito Pérez", age = "Kid", genre = "F") {
    this.#name = name;
    this.#age = age;
    this.#genre = genre;
  }

  greet() {
    console.log(`Hello, my name is ${this.#name}.`);
  }
}

module.exports = User;
