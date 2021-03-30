import { Point } from "./point copy.js";

const WIDTH = 50;
const HEIGHT = 50;
const FOLLOW_SPEED = 0.05;

export class Dialog {
  constructor() {
    this.pos = new Point();
    this.start = new Point();
    this.mousePos = new Point();
    this.clickMove = new Point();
    this.clickPoint = new Point();
    this.target = new Point();
    this.click = false;
  }

  resize(width, height) {
    this.pos.x = Math.random() * (width - WIDTH);
    this.pos.y = Math.random() * (height - HEIGHT);
    this.target = this.pos.clone();
    this.start = this.pos.clone();
  }

  animate(ctx) {
    const move = this.target.clone().subtract(this.pos).multiple(FOLLOW_SPEED);
    this.pos.add(move);

    this.clickMove = this.pos.clone().add(this.mousePos);
    ctx.beginPath();
    ctx.fillStyle = `#f4e55a`;
    ctx.fillRect(this.pos.x, this.pos.y, WIDTH, HEIGHT);
  }

  down(mouse) {
    if (mouse.collide(this.pos, WIDTH, HEIGHT)) {
      this.click = true;
      this.clickPoint = mouse;
      this.start = this.pos.clone();
      this.mousePos = mouse.clone().subtract(this.pos);
      return this;
    } else {
      return null;
    }
  }

  move(mouse) {
    if (this.click) {
      this.target = this.start.clone().subtract(this.clickPoint).add(mouse);
    }
  }

  up() {
    this.click = false;
  }
}
