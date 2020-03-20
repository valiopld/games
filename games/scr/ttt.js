const gameStarted = () => {
  const gameGrid = document.querySelector(".ttt-table");
  const all = Array.from(gameGrid.querySelectorAll(".ttt-table td"));
  const msg = document.querySelector(".msg");
  const restart = document.querySelector(".restart");
  const isMyTurn_span = document.querySelector(".isMyTurn");
  restart.addEventListener("click", gameStarted);
  restart.style.display = "none";
  msg.innerHTML = "";
  all.forEach(a => {
    a.innerHTML = "";
  });
  const ppS = "X";
  const pcS = "O";
  const winCombo = [
    ["aa", "ab", "ac"],
    ["ba", "bb", "bc"],
    ["ca", "cb", "cc"],
    ["aa", "ba", "ca"],
    ["ab", "bb", "cb"],
    ["ac", "bc", "cc"],
    ["aa", "bb", "cc"],
    ["ac", "bb", "ca"]
  ];
  let freeCells = ["aa", "ab", "ac", "ba", "bb", "bc", "ca", "cb", "cc"];
  let n = 1;
  let wt;
  let myMoves = [];
  let pcMoves = [];
  let isMyTurn = Boolean(Math.round(Math.random()));
  isMyTurn ? (wt = "Your") : (wt = "Pc");
  isMyTurn_span.innerHTML = "It's " + wt + " turn!";
  const enLi = () => all.forEach(sq => sq.addEventListener("click", click));
  const deLi = () => all.forEach(sq => sq.removeEventListener("click", click));

  const click = t => {
    t = t.target;
    let isBusy = freeCells.includes(t.dataset.key);
    isBusy ? draw(t, ppS, "var(--color4)") : busyCell(t);
  };

  const pcTurn = () => {
    const pcPick = () => {
      let pick = freeCells[Math.floor(Math.random() * freeCells.length)];
      return all.filter(a => a.dataset.key === pick)[0];
    };

    setTimeout(() => draw(pcPick(), pcS, "var(--color3)"), 500);
  };
  const myTurn = () => {
    enLi();
  };
  const busyCell = t => {
    msg.style.color = "var(--color5)";
    msg.innerHTML = "This cell is Busy";
    t.style.background = "var(--color5)";
    setTimeout(() => {
      t.style.background = "var(--color1)";
    }, 250);
  };
  const draw = (t, s, c) => {
    msg.innerHTML = "";
    n++;
    let key = t.dataset.key;
    freeCells = freeCells.filter(e => e !== key);
    t.style.color = c;
    t.innerHTML = s;
    let logic;
    isMyTurn ? (logic = myMoves) : (logic = pcMoves);
    logic.push(key);
    deLi();
    isMyTurn ? (wt = "Pc") : (wt = "Your");
    isMyTurn_span.innerHTML = "It's " + wt + " turn!";
    isMyTurn = !isMyTurn;

    checkEnd(logic) ? endGame() : newTurn(n);
  };
  const checkEnd = l => {
    let end = false;
    let result;
    let winner;
    let color;
    let checkWin = winCombo.some(b => b.every(a => l.includes(a)));
    if (checkWin) {
      end = true;
      isMyTurn
        ? (winner = "Pc") && (color = "var(--color3)")
        : (winner = "You") && (color = "var(--color4)");
      result = winner + " WIN!";
    } else if (freeCells.length < 1) {
      end = true;
      result = "DRAW";
      color = "var(--color6)";
    }

    result ? (msg.innerHTML = result) && (msg.style.color = color) : null;

    return end;
  };
  const endGame = () => {
    console.log("GAME ENDED");
    restart.style.display = "block";
  };

  newTurn = n => {
    isMyTurn ? myTurn() : pcTurn();

    document.querySelector(".turn span").innerHTML = n;
  };
  newTurn(n);
};
gameStarted();
