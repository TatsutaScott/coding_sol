import Vector from "../utils/Vector.js";
import { random } from "../utils/random_util.js";
import { point, line } from "../utils/shape_util.js";

const charcoal = "rgba(74,74,74, 0.8)";

export function draw(cnv) {
  cnv.erase();
  const points = [];
  cnv.ctx.lineWidth = 0.5;

  for (let i = 0; i < 50; i++) {
    const x = random(0, cnv.width);
    const y = random(0, cnv.height);
    points.push(new Vector(x, y));
  }

  for (let i = 0; i < points.length; i++) {
    const p = point(points[i].x, points[i].y);
    cnv.shape(p, "", charcoal);
  }

  for (let i = 0; i < points.length; i++) {
    for (let q = i; q < points.length; q++) {
      const l = line(points[i].x, points[i].y, points[q].x, points[q].y);
      cnv.shape(l, "", charcoal);
    }
  }
}
