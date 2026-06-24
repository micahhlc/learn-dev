class Character {
  constructor(speed) {
    this.speed = speed;
  }
  move = () =>
    console.log("I am moving with this speed of " + this.speed + ".");
}
class Enemy extends Character {
  constructor(name, phrase, power, speed) {
    super(speed);
    this.name = name;
    this.phrase = phrase;
    this.power = power;
    this.species = "unknown";
  }
  attack = () =>
    console.log("I am attacking with this power of " + this.power + "!");
  sayPhrase() {
    console.log(this.phrase);
  }
  whoAmI = () =>
    console.log(`My name is ${this.name}, a specie of ${this.species}. `);
}

class Alien extends Enemy {
  #birthYear; //declare private variable using #.

  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = "alien";
    this.#birthYear = new Date(2000, 1, 1).getFullYear();
  }
  fly = () => console.log("Zzzzzziiiiiinnnnnnnggggg!");
  //howOld = () => console.log(`I am ${this.#birthYear - new Date().getFullYear()} years old.`);
  howOld = () => console.log(`I was born in ${this.#birthYear}`);
}
class Robot extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = "robot";
  }
  transform = () => console.log("Optimus prime!");
}
class Bug extends Enemy {
  constructor(name, phrase, power, speed) {
    super(name, phrase, power, speed);
    this.species = "bug";
  }
  hide = () => {
    console.log("You can't catch me now!");
  };
}

const alienBlue = new Alien(
  "Blue",
  "I am a blue alien!",
  "superTechnology",
  "0.5x of light speed"
);
const alienGreen = new Alien(
  "Green",
  "I am a green alien!",
  "green secret sustances"
);

console.log(alienBlue);

const bugBee = new Bug(
  "Bee",
  "I am a bug bee!",
  "I have alots of us",
  "very fast"
);
console.log(bugBee);
bugBee.hide();
