let convert = document.querySelector("#convert");
const light = document.querySelector("#light");
let revconvert = document.querySelector("#revconvert");
const copyBtn = document.querySelector("#copy");
const morse = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",

  " ": "/",

  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",

  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  ":": "---...",
  ";": "-.-.-.",
  "(": "-.--.",
  ")": "-.--.-",
  "'": ".----.",
  '"': ".-..-.",
  "&": ".-...",
  "/": "-..-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  $: "...-..-",
  "@": ".--.-.",
};

const reverseMorse = {};

for (const key in morse) {
  reverseMorse[morse[key].trim()] = key;
}

if (convert) {
  convert.addEventListener("click", morseify);
}

if (revconvert) {
  revconvert.addEventListener("click", revmorseify);
}

function morseify() {
  let input = document.querySelector("#input-text").value;
  let output = document.querySelector("#output-text");
  output.value = "";
  for (let i = 0; i < input.length; i++) {
    let ch = input[i].toUpperCase();
    if (morse[ch] !== undefined) {
      output.value += morse[ch] + " ";
    } else {
      output.value += "?";
    }
  }
  console.log(output.value);
  blinkMorse(output.value);
}

function revmorseify() {
  let input = document.querySelector("#input-text").value;
  let output = document.querySelector("#output-text");
  output.value = "";
  let arr = input.trim().split(" ");
  for (let i = 0; i < arr.length; i++) {
    if (reverseMorse[arr[i]] !== undefined) {
      output.value += reverseMorse[arr[i]];
    } else {
      output.value += "?";
    }
  }
  console.log(output.value);
}

if (copyBtn) {
  copyBtn.addEventListener("click", copyOutput);
}

function copyOutput() {
  const output = document.querySelector("#output-text");

  if (output.value === "") return;

  navigator.clipboard.writeText(output.value);

  copyBtn.textContent = "Copied ✓";
  //timing to show copied message in ms
  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 1500);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function blinkMorse(morseString) {
  convert.disabled = true;
  const UNIT = 100; // milliseconds

  for (const symbol of morseString) {
    if (symbol === ".") {
      light.classList.add("on");
      await sleep(UNIT);

      light.classList.remove("on");
      await sleep(UNIT);
    } else if (symbol === "-") {
      light.classList.add("on");
      await sleep(UNIT * 3);

      light.classList.remove("on");
      await sleep(UNIT);
    } else if (symbol === " ") {
      // gap between letters
      await sleep(UNIT * 2);
    } else if (symbol === "/") {
      // gap between words
      await sleep(UNIT * 2);
    }
  }
  convert.disabled = false;
}
