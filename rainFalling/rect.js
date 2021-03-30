export class Rect {
  constructor() {
    this.startX;
    this.startY;
    this.drawX;
    this.drawY;
    this.WIDTH = 100;
    this.HEIGHT = 100;
  }

  resize(width, height) {
    this.startX = Math.random() * (width - this.WIDTH);
    this.startY = Math.random() * (height - this.HEIGHT);
  }

  animate(ctx) {
    (this.drawX = this.startX - this.WIDTH / 2),
      (this.drawY = this.startY - this.HEIGHT / 2),
      (ctx.fillStyle = "blue");
    ctx.beginPath();
    ctx.fillRect(this.drawX, this.drawY, this.WIDTH, this.HEIGHT);
  }

  move(x, y) {
    this.startX = x;
    this.startY = y;
  }
}
