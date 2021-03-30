const BALL_SIZE = 15;

export class Circle {
  constructor(totalRect, rects) {
    this.pos = { x: 0, y: 0 };
    this.vx = 10;
    this.vy = 10;
    this.rects = rects;
    this.totalRect = totalRect;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.pos.x = Math.random() * (stageWidth - 2 * BALL_SIZE) + BALL_SIZE;
    this.pos.y = Math.random() * (stageHeight - 2 * BALL_SIZE) + BALL_SIZE;
  }

  animate(ctx) {
    this.pos.x += this.vx;
    this.pos.y += this.vy;

    this.collision();

    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.arc(this.pos.x, this.pos.y, BALL_SIZE, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  collision() {
    if (this.pos.x - BALL_SIZE < 0) {
      this.vx *= -1;
    }
    if (this.pos.x + BALL_SIZE > this.stageWidth) {
      this.vx *= -1;
    }
    if (this.pos.y - BALL_SIZE < 0) {
      this.vy *= -1;
    }
    if (this.pos.y + BALL_SIZE > this.stageHeight) {
      this.vy *= -1;
    }

    for (let i = 0; i < this.totalRect; i++) {
      let xs = this.rects[i].pos.x;
      let xe = this.rects[i].pos.x + 140;
      let ys = this.rects[i].pos.y;
      let ye = this.rects[i].pos.y + 60;

      if (this.pos.x - BALL_SIZE < xe && this.pos.y < ye && this.pos.y > ys) {
        this.vx *= -1;
      }
      if (this.pos.x + BALL_SIZE > xs && this.pos.y < ye && this.pos.y > ys) {
        this.vx *= -1;
      }
      if (this.pos.y - BALL_SIZE < ys && this.pos.x < xe && this.pos.x > xs) {
        this.vy *= -1;
      }
      if (this.pos.y + BALL_SIZE > ye && this.pos.x < xe && this.pos.x > xs) {
        this.vy *= -1;
      }
    }
  }
}
