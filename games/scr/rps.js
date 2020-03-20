const ppIcos = Array.from(document.querySelectorAll(".leftCont .ico"));
const pcIcos = Array.from(document.querySelectorAll(".rightCont .ico"));
const showResultCont = document.querySelector(".showResult");
const ppPoints = document.querySelector(".points .pp");
const pcPoints = document.querySelector(".points .pc");
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", restart);
const cArr = ["p", "r", "s"];

const act = () => ppIcos.forEach(a => a.addEventListener("click", game));
const deact = () => ppIcos.forEach(a => a.removeEventListener("click", game));
const getRandom = () => cArr[Math.floor(Math.random() * 3)];

let points = { pp: 0, pc: 0 };
act();
function game(t) {
  deact();
  let myChoice = this.dataset.x;
  let pcChoice = getRandom();
  let result = myChoice + pcChoice;
  let ppTarget = t.target;
  let pcTarget = pcIcos.filter(f => pcChoice == f.dataset.x)[0];
  let showResult = "";

  const reset = () => {
    ppIcos.forEach(e => e.classList.remove("activeIco"));
    pcIcos.forEach(e => e.classList.remove("activeIco"));
    showResultCont.innerHTML = "";
    act();
  };
  const anime = (a, b, c) => {
    a.classList.add("activeIco");
    b.classList.add("activeIco");
    showResultCont.innerHTML = c;
    ppPoints.innerHTML = points.pp;
    pcPoints.innerHTML = points.pc;
  };

  const win = () => {
    points.pp++;
    showResult = "WIN";
    anime(ppTarget, pcTarget, showResult);
  };
  const lose = () => {
    points.pc++;
    showResult = "LOSE";
    anime(ppTarget, pcTarget, showResult);
  };
  const draw = () => {
    showResult = "DRAW";
    anime(ppTarget, pcTarget, showResult);
  };

  switch (result) {
    case "rr":
    case "pp":
    case "ss":
      draw();
      break;
    case "rs":
    case "pr":
    case "sp":
      win();
      break;
    case "sr":
    case "rp":
    case "ps":
      lose();
      break;
  }

  setTimeout(reset, 1000);
}

function restart() {
  points.pp = 0;
  points.pc = 0;
  ppPoints.innerHTML = points.pp;
  pcPoints.innerHTML = points.pc;
}
