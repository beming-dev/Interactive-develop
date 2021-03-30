const WIDTH = 140;
const HEIGHT = 60;

export class Rectangle {
  constructor() {
    this.pos = { x: 0, y: 0 };
  }

  resize(stageWidth, stageHeight) {
    this.pos.x = Math.random() * (stageWidth - WIDTH);
    this.pos.y = Math.random() * (stageHeight - HEIGHT);
  }

  animate(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(this.pos.x, this.pos.y, WIDTH, HEIGHT);
    ctx.fill();
    ctx.closePath();
  }
}
