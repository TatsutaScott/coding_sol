import Vector from "../utils/Vector.js";
import { random } from "../utils/random_util.js";
import { curve } from "../utils/shape_util.js";

export function draw(cnv) {
  const cols = Math.floor(random(cnv.width / 5, cnv.width / 3));
  const rows = Math.floor(random(cnv.height / 5, cnv.height / 3));
  const unitW = cnv.width / cols;
  const unitH = cnv.height / rows;

  const points = [];
  for (let i = 0; i < rows; i++) {
    const row_points = [];
    for (let q = 0; q < cols; q++) {
      row_points.push(0);
    }
    points.push(row_points);
  }

  for (let i = 0; i < 2000; i++) {
    const w = wiggle(points, rows, cols, unitW, unitH);
    if (w) {
      cnv.shape(w, "", "black");
    }
  }
}

function wiggle(points, rows, cols, unitW, unitH) {
  const point_num = Math.floor(random(6, 30));
  const p = new Vector(
    Math.floor(random(0, cols)),
    Math.floor(random(0, rows))
  );

  const line_points = [];
  for (let i = 0; i < point_num; i++) {
    const direction = Math.random();
    if (direction < 0.8) {
      p.add(0, 1);
    } else if (direction < 0.9) {
      p.add(1, 0);
    } else {
      p.add(-1, 0);
    }

    if (check_free(p, points, rows, cols)) {
      points[p.y][p.x] = 1;
      line_points.push(
        new Vector(
          p.x * unitW + random(0.25, 0.75) * unitW,
          p.y * unitH + random(0.25, 0.75) * unitH
        )
      );
    } else {
      break;
    }
  }

  if (line_points.length < 3) {
    return false;
  } else {
    return curve(line_points, 0.99);
  }
}

function check_free(vec, points, rows, cols) {
  const in_bounds = vec.x >= 0 && vec.x < cols && vec.y >= 0 && vec.y < rows;
  if (in_bounds) {
    return points[vec.y][vec.x] === 0;
  } else {
    return false;
  }
}
