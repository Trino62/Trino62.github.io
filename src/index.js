//import "./styles.css";

import Reloj from "./reloj.js";
let reloj = new Reloj(document.getElementById("pantalla"));
let tiempoPasado = 0;

function ciclo(tiempo) {
  let tiempoDelta = tiempo - tiempoPasado;
  tiempoPasado = tiempo;
  reloj.actualizar(tiempoDelta);
  reloj.dibujar();
  requestAnimationFrame(ciclo);
}
requestAnimationFrame(ciclo);
let cc = setInterval(myTimer, 1000);

function myTimer() {
  reloj.incrementarSegundos();
}


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}