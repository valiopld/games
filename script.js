window.innerWidth < 1200 ? error() : open();

function open() {
  document.querySelector(".mainContainer").addEventListener("click", a => {
    if (a.target.className == "game") {
      let target = a.target;
      let elses = [];

      document.querySelector(".visible").style.opacity = "0.2";
      document.querySelector(".openedGame").style.opacity = "1";
      document.querySelector(".openedGame").style.zIndex = "99";

      let iframe = document.querySelector("iframe");
      let idGame = target.id;
      iframe.setAttribute("src", "./games/" + idGame + ".html");
    }
  });

  document.querySelector(".exit").addEventListener("click", a => {
    document.querySelector(".visible").style.opacity = "1";
    document.querySelector(".openedGame").style.opacity = "0";
    document.querySelector(".openedGame").style.zIndex = "-1";
  });
}

function error() {
  console.log("This page is avalable on screen bigger than 1200px");
  document.querySelector(".visible").style.display = "none";
  document.querySelector(".openedGame").style.display = "none";
  document.querySelector(".error").style.display = "block";
}
