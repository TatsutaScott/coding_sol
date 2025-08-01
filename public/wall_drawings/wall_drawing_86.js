//Ten thousand lines about 10 inches (25 cm) long, covering the wall evenly.

import { random } from "../utils/random_util.js";
import { line } from "../utils/shape_util.js";
import Vector from "../utils/Vector.js";

const graphite = "#303030";

export function draw(cnv) {
  const line_length = Math.max(cnv.width, cnv.height) * 0.04;
  const points = [];
  for (let i = 0; i < 10000; i++) {
    points.push(new Vector(random(0, cnv.width), random(0, cnv.height)));
  }
  for (let p of points) {
    let len, end_point;
    while (!inBounds(end_point, cnv.width, cnv.height)) {
      len = random(0.99, 1.01) * line_length;
      end_point = Vector.random(len).add(p);
    }

    cnv.shape(line(p.x, p.y, end_point.x, end_point.y), "", graphite);
  }
}

function inBounds(vec, width, height) {
  if (vec == undefined) {
    return false;
  }
  if (vec.x < 0 || vec.x > width) {
    return false;
  } else if (vec.y < 0 || vec.y > height) {
    return false;
  } else {
    return true;
  }
}
