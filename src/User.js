const blobToData = require("./utils/blob-to-base64");

class User {
  #name;
  #age;
  #genre;
  #avatar;
  #sessionKey;

  /**
   *
   * @param {string} name
   * @param {"Young" | "Kid"} age
   * @param {"F" | "M"} genre
   */
  constructor(name = "Pepito Pérez", age = "Kid", genre = "F") {
    const sessionKey = `${name}-${new Date().toJSON()}`;
    this.#name = name;
    this.#age = age;
    this.#genre = genre;
    this.#sessionKey = sessionKey;
    localStorage.setItem(
      sessionKey,
      JSON.stringify({
        name: this.#name,
        age: this.#age,
        genre: this.#genre,
        avatar: this.#avatar,
      })
    );
  }

  greet() {
    console.log(`Hello, my name is ${this.#name}.`);
  }

  getSession() {
    return JSON.parse(localStorage.getItem(this.#sessionKey));
  }

  updateSession(keys) {
    const user = this.getSession();
    this.removeSession();
    localStorage.setItem(
      this.#sessionKey,
      JSON.stringify({
        ...user,
        ...keys,
      })
    );
  }

  removeSession() {
    localStorage.removeItem(this.#sessionKey);
  }

  clearSession() {
    localStorage.clear();
  }

  saveAvatar(avatarBase64) {
    const avatar = avatarBase64;
    this.avatar = avatar;
    this.updateSession({ avatar });
  }

  async createAvatar() {
    console.log("Saving avatar on memory...");

    var svg = document.querySelector("#avatar svg");
    var data = new XMLSerializer().serializeToString(svg);

    const blob = new Blob([data], { type: "image/svg+xml" });

    const base64 = await blobToData(blob);

    this.saveAvatar(base64);
  }
}

module.exports = User;
