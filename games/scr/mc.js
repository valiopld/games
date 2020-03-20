const allCards = Array.from(document.querySelectorAll(".card"));
const restart = document.querySelector(".restart");
const winContainer = document.querySelector(".winner");
const winMoves = document.querySelector(".winMoves span");
const myNcont = document.querySelector(".myN");
restart.addEventListener("click", restartFn);
let maxN, myN, n, first, second, rColors;

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
const colors = [
  "var(--color3)",
  "var(--color3)",
  "var(--color4)",
  "var(--color4)",
  "var(--color5)",
  "var(--color5)",
  "var(--color6)",
  "var(--color6)",
  "var(--color7)",
  "var(--color7)",
  "var(--color8)",
  "var(--color8)"
];
maxN = 2;
myN = 0;
n = 0;
first = false;
second = false;
allCards.forEach(f => f.classList.remove("flip"));
allCards.forEach(f => f.addEventListener("click", turn));
rColors = shuffle(colors);

for (let i = 0; i < allCards.length; i++) {
  allCards[i].children[1].style.backgroundColor = rColors[i];
}

function turn() {
  n >= maxN ? fail() : null;

  !first
    ? (first = this) + (second = false)
    : first && !second
    ? (second = this)
    : (first = this) + (second = false);

  first && second
    ? first.children[1].style.backgroundColor ==
      second.children[1].style.backgroundColor
      ? (maxN = maxN + 2)
      : null
    : null;

  if (maxN == 14) {
    winContainer.style.display = "block";
    winMoves.innerHTML = myN;
  }

  maxN == 14
    ? (winContainer.style.display = "block") + (winMoves.innerHTML = myN)
    : null;
  console.log(n, maxN);
  console.log(first, second);
  myN++;
  n++;
  myNcont.innerHTML = myN;

  this.classList.toggle("flip");
}
function fail() {
  allCards.forEach(f => f.classList.remove("flip"));
  n = 0;
  maxN = 2;
}

function restartFn() {
  fail();
  myN = 0;
  first = false;
  second = false;
  winContainer.style.display = "none";
  rColors = shuffle(colors);

  for (let i = 0; i < allCards.length; i++) {
    allCards[i].children[1].style.backgroundColor = rColors[i];
  }
}
