import { Dialog } from "./dialog copy.js";
import { Point } from "./point copy.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.curItem = null;
    this.mousePos = new Point();
    this.total = 1;
    this.box = [];

    for (let i = 0; i < this.total; i++) {
      this.box[i] = new Dialog();
    }

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    window.addEventListener("pointerdown", this.onDown.bind(this), false);
    window.addEventListener("pointerup", this.onUp.bind(this), false);
    window.addEventListener("pointermove", this.onMove.bind(this), false);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    for (let i = 0; i < this.total; i++) {
      this.box[i].resize(this.canvas.width, this.canvas.height);
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.total; i++) {
      this.box[i].animate(this.ctx);
    }

    if (this.curItem) {
      this.ctx.fillStyle = `#ff5a54`;
      this.ctx.strokeStyle = `000000`;
      this.ctx.beginPath();
      this.ctx.arc(this.mousePos.x, this.mousePos.y, 5, 0, Math.PI * 2);
      this.ctx.arc(
        this.curItem.clickMove.x,
        this.curItem.clickMove.y,
        5,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.moveTo(this.mousePos.x, this.mousePos.y);
      this.ctx.lineTo(this.curItem.clickMove.x, this.curItem.clickMove.y);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  onDown(e) {
    this.mousePos.x = e.offsetX;
    this.mousePos.y = e.offsetY;
    let item;

    for (let i = 0; i < this.total; i++) {
      item = this.box[i].down(this.mousePos.clone());
    }
    if (item) {
      this.curItem = item;
    }
  }

  onMove(e) {
    this.mousePos.x = e.offsetX;
    this.mousePos.y = e.offsetY;

    for (let i = 0; i < this.total; i++) {
      this.box[i].move(this.mousePos.clone());
    }
  }

  onUp(e) {
    for (let i = 0; i < this.total; i++) {
      this.box[i].up(this.mousePos.clone());
    }
    this.curItem = null;
  }
}

window.onload = () => {
  new App();
};
