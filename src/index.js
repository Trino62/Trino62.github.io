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
