import { sound } from "./funciones.js";
import Round from "./round";
const ESTADO = {
  PAUSA: 0,
  NUEVO: 1,
  INICIO: 2,
  CORRIENDO: 3,
  FINALIZANDO: 4,
  ESPERANDO: 5
};
export default class Reloj {
  constructor(canvas) {
    this.round = 1;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ancho = window.innerWidth;
    this.alto = window.innerHeight;
    this.logo = document.getElementById("logo");
    this.campanainicio = new sound("src/sound/campana.mp3", false);
    this.preparados = new sound("src/sound/estamoslistos.mp3", false);
    this.tiempo = new sound("src/sound/tiempo.mp3", false);
    this.alertaRound = new sound("src/sound/velocidadrapido10.mp3", false);
    this.segundos = -1;
    this.estado = ESTADO.NUEVO;
    this.display = "00:00";
    this.opciones = {
      rounds: 3,
      tiemporoud: 25,
      inicio: 5,
      descanso: 5,
      alertadescanso: 2,
      alertaround: 10
    };
  }
  dibujar() {
    this.ctx.clearRect(0, 0, this.ancho, this.alto);
    this.dashboard();

    this.ctx.fillText(this.estado, 10, 30);
    this.ctx.fillText(this.segundos, 10, 70);
  }
  actualizar() {
    this.ancho = window.innerWidth;
    this.alto = window.innerHeight;
    this.canvas.width = this.ancho;
    this.canvas.height = this.alto;
    this.convertirAReloj(this.segundos);
  }
  resizeCanvas() {
    this.ancho = window.innerWidth;
    this.alto = window.innerHeight;
  }

  incrementarSegundos() {
    if (this.estado === ESTADO.PAUSA) return 0;

    if (this.estado === ESTADO.NUEVO && this.segundos === -1) {
      this.preparados.play();
      this.segundos = this.opciones.inicio;
      return 0;
    }
    if (this.estado === ESTADO.NUEVO && this.segundos === 0) {
      this.segundos = this.opciones.tiemporoud;
      this.estado = ESTADO.CORRIENDO;
      this.campanainicio.play();
      return 0;
    }

    if (this.estado === ESTADO.CORRIENDO && this.segundos === 0) {
      this.tiempo.play();
      this.estado = ESTADO.ESPERANDO;
      this.segundos = this.opciones.descanso;
      return 0;
    }
    if (
      this.estado === ESTADO.CORRIENDO &&
      this.segundos === this.opciones.alertaround
    ) {
      this.alertaRound.play();
    }
    if (this.estado === ESTADO.ESPERANDO && this.segundos === 0) {
      this.campanainicio.play();
      this.estado = ESTADO.CORRIENDO;
      this.segundos = this.opciones.tiemporoud;
      this.round++;
      return 0;
    }
    if (
      this.estado === ESTADO.ESPERANDO &&
      this.segundos === this.opciones.alertadescanso
    ) {
      this.preparados.play();
    }
    this.segundos--;
  }

  dashboard() {
    switch (this.estado) {
      case ESTADO.NUEVO:
        //Datos a mostrar
        this.ctx.fillStyle = "orange";
        this.ctx.fillRect(0, 0, this.ancho, this.alto);
        this.ctx.drawImage(
          this.logo,
          this.ancho / 2 - 50,
          this.alto / 20,
          100,
          100
        );
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.textAling = "center";
        this.ctx.fillText("¡PREPARATE!", this.ancho / 3, (this.alto / 6) * 2);
        this.ctx.font = "40px Arial";
        this.ctx.fillText(this.display, this.ancho / 3, (this.alto / 6) * 3);
        break;
      case ESTADO.CORRIENDO:
        //Datos a mostrar
        //Datos a mostrar
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, 0, this.ancho, this.alto);
        this.ctx.drawImage(
          this.logo,
          this.ancho / 2 - 150,
          this.alto / 20,
          300,
          200
        );
        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAling = "center";
        this.ctx.fillText(
          "ROUND " + this.round,
          this.ancho / 3,
          (this.alto / 6) * 3
        );
        this.ctx.font = "40px Arial";
        this.ctx.fillText(this.display, this.ancho / 3, (this.alto / 6) * 4);
        break;
      case ESTADO.ESPERANDO:
        //Datos a mostrar
        //Datos a mostrar
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(0, 0, this.ancho, this.alto);
        this.ctx.drawImage(
          this.logo,
          this.ancho / 2 - 50,
          this.alto / 20,
          100,
          100
        );
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.textAling = "center";
        this.ctx.fillText("DESCANSO", this.ancho / 3, (this.alto / 6) * 2);
        this.ctx.font = "40px Arial";
        this.ctx.fillText(this.display, this.ancho / 3, (this.alto / 6) * 3);
        break;
      case ESTADO.PAUSA:
        //Datos a mostrar
        //Datos a mostrar
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(0, 0, this.ancho, this.alto);
        this.ctx.drawImage(
          this.logo,
          this.ancho / 2 - 50,
          this.alto / 20,
          100,
          100
        );
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.textAling = "center";
        this.ctx.fillText("PAUSA", this.ancho / 3, (this.alto / 6) * 2);
        this.ctx.font = "40px Arial";
        this.ctx.fillText(this.display, this.ancho / 3, (this.alto / 6) * 3);
        break;
      default:
        break;
    }
  }
  convertirAReloj(seg) {
    let minutos = parseInt(seg / 60);
    let segundo = seg - 60 * minutos;
    let izquierda = "00";
    let derecha = "00";
    if (minutos < 10) izquierda = "0" + minutos;
    else izquierda = minutos;
    if (segundo < 10) derecha = "0" + segundo;
    else derecha = segundo;
    this.display = izquierda + ":" + derecha;
  }
}
