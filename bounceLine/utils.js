export function distance(x1, y1, x2, y2) {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
}

export function lineCircle(x1, y1, x2, y2, cx, cy, r) {
  const linelength = distance(x1, y1, x2, y2);
  const point =
    ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / Math.pow(linelength, 2);

  const px = x1 + point * (x2 - x1);
  const py = y1 + point * (y2 - y1);

  if (distance(px, py, cx, cy) < r) {
    return true;
  } else {
    return false;
  }
}
