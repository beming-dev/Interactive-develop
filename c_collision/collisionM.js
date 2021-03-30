import { Rectangle } from "./rectangle.js";
import { Circle } from "./circle.js";

class Collision {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.totalRect = 5;
    this.rects = [];
    for (let i = 0; i < this.totalRect; i++) {
      this.rects[i] = new Rectangle();
    }

    this.totalCircle = 5;
    this.circs = [];

    for (let i = 0; i < this.totalCircle; i++) {
      this.circs[i] = new Circle(this.totalRect, this.rects);
    }

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    for (let i = 0; i < this.totalRect; i++) {
      this.rects[i].resize(this.stageWidth, this.stageHeight);
    }
    for (let i = 0; i < this.totalCircle; i++) {
      this.circs[i].resize(this.stageWidth, this.stageHeight);
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.totalRect; i++) {
      this.rects[i].animate(this.ctx);
    }
    for (let i = 0; i < this.totalCircle; i++) {
      this.circs[i].animate(this.ctx);
    }
  }
}

window.onload = () => {
  new Collision();
};
