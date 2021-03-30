import { Rain } from "./rain.js";
import { Rect } from "./rect.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.rect = new Rect();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.mouseX = 0;
    this.mouseY = 0;
    window.addEventListener("pointerdown", this.down.bind(this), false);
    window.addEventListener("pointermove", this.move.bind(this), false);
    window.addEventListener("pointerup", this.up.bind(this), false);
    this.idDown = false;

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.rect.resize(this.stageWidth, this.stageHeight);

    this.totalRain = (this.stageWidth / 80) * (this.stageHeight / 80);
    this.rains = [];
    for (let i = 0; i < this.totalRain; i++) {
      this.rains[i] = new Rain(this.rect);
    }

    for (let i = 0; i < this.rains.length; i++) {
      this.rains[i].resize(this.stageWidth, this.stageHeight);
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.rains.length; i++) {
      this.rains[i].animate(this.ctx);
    }

    this.rect.animate(this.ctx);

    this.ctx.fillStyle = `white`;
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight / 10);
  }

  down(e) {
    this.idDown = true;
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }
  move(e) {
    if (this.idDown) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      this.rect.move(this.mouseX, this.mouseY);
    }
  }
  up() {
    this.idDown = false;
  }
}

window.onload = () => {
  new App();
};
