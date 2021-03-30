const RAINWIDTH = 5;
const RAINHEIGHT = 30;

export class Rain {
  constructor(box) {
    this.startX = 0;
    this.startY = 0;
    this.stageWidth;
    this.stageHeight;
    this.maxRain;
    this.box = box;
  }

  resize(width, height) {
    this.stageWidth = width;
    this.stageHeight = height;

    this.startX = Math.random() * this.stageWidth;
    this.startY = Math.random() * this.stageHeight;
  }

  animate(ctx) {
    this.startY += 4;
    if (this.startY > this.stageHeight) {
      this.startX = Math.random() * this.stageWidth;
      this.startY = (Math.random() * this.stageHeight) / 10;
    }
    if (this.collision()) {
      this.startX = Math.random() * this.stageWidth;
      this.startY = (Math.random() * this.stageHeight) / 10;
    }
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(this.startX, this.startY, RAINWIDTH, RAINHEIGHT);
  }

  collision() {
    if (
      this.startX + RAINWIDTH >= this.box.drawX &&
      this.startX <= this.box.drawX + this.box.WIDTH &&
      this.startY + RAINHEIGHT >= this.box.drawY &&
      this.startY + RAINHEIGHT <= this.box.drawY + this.box.HEIGHT
    )
      return true;
    else return false;
  }
}
