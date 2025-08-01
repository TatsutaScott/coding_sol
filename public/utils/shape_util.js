import { TAU, sin, cos, interp } from "./math_util.js";

/**
 * Draws a line.
 *
 * @param {number} x1 Starting x value
 * @param {number} y1 Starting y value
 * @param {number} x2 Ending x value
 * @param {number} y2 Ending y value
 * @param {object} context Canvas context to draw to
 */
export function line(x1, y1, x2, y2) {
  const path = new Path2D(); // Start a new path
  path.moveTo(x1, y1); // Move the pen to (x1, y1)
  path.lineTo(x2, y2); // Draw a line to (x2, y2)
  return path;
}

/**
 * Makes a rectangle path, with optional rounded corners.
 *
 * @param {Number} x - x position
 * @param {Number} y - y position
 * @param {Number} w - width
 * @param {Number} h - height
 * @param {number | [number]} radius - radius for all corners, or an array representing each corner
 * @returns
 */
export function rect(x, y, w, h, radius) {
  const path = new Path2D();
  if (radius) {
    path.roundRect(x, y, w, h, radius);
  } else {
    path.rect(x, y, w, h);
  }

  return path;
}

/**
 * Generates an ellipse shaped path
 * @param {Number} x - x position
 * @param {Number} y - y position
 * @param {Number} w - width
 * @param {Number} h - height
 * @param {Number} r - radius
 * @returns {Path2D} - path object representing an ellipse
 */
export function ellipse(x, y, w, h, r = 0) {
  const path = new Path2D(); // inits the path object
  path.ellipse(x, y, w, h, r, 0, TAU); // adds an ellipse to the path
  return path;
}

/**
 * Generates a star shaped path
 * @param {Number} x - x position
 * @param {Number} y - y position
 * @param {Number} w - width
 * @param {Number} h - height
 * @param {Number} points - number of points
 * @param {Number} o - offset between outer point and inner angle
 * @param {Number} i_curv - inner curve (0 is a point)
 * @param {Number} o_curv - outer curve (1 is a point)
 * @returns {Path2D} - path object representing a star
 */
export function star(x, y, w, h, points, o = 0.5, i_curv = 0, o_curv = 1) {
  const angle_step = TAU / points; // angle step size for each point of the star
  const path = new Path2D(); // init 4 path object

  for (let i = 0; i < points; i++) {
    const c_a = i * angle_step; //angle for center points
    const r_a = (i * 2 - 1) * (angle_step / 2); // angle for right points
    const l_a = (i * 2 + 1) * (angle_step / 2); // angle for left points

    const center = [x + sin(c_a) * w, y + cos(c_a) * h]; // center point

    // right point and right control points
    const right = [x + sin(r_a) * w * o, y + cos(r_a) * h * o];
    const ctrl_r_1 = [
      x + sin(interp(i_curv, r_a, c_a)) * w * o,
      y + cos(interp(i_curv, r_a, c_a)) * h * o,
    ];
    const ctrl_r_2 = [
      x + sin(interp(o_curv, r_a, c_a)) * w,
      y + cos(interp(o_curv, r_a, c_a)) * h,
    ];

    // left point and left control points
    const left = [x + sin(l_a) * w * o, y + cos(l_a) * h * o];
    const ctrl_l_1 = [
      x + sin(interp(i_curv, l_a, c_a)) * w * o,
      y + cos(interp(i_curv, l_a, c_a)) * h * o,
    ];
    const ctrl_l_2 = [
      x + sin(interp(o_curv, l_a, c_a)) * w,
      y + cos(interp(o_curv, l_a, c_a)) * h,
    ];

    // moves to the start of the path if its the first point
    if (i == 0) path.moveTo(...right);

    // add curve to path
    path.bezierCurveTo(...ctrl_r_1, ...ctrl_r_2, ...center);
    path.bezierCurveTo(...ctrl_l_2, ...ctrl_l_1, ...left);
  }
  return path;
}

/**
 * Generates an arc shaped path
 * @param {Number} x - x position of arc center
 * @param {Number} y - y position of arc center
 * @param {Number} r - arc radius
 * @param {Number} a - angle to start from in radians
 * @param {Number} l - length of arc in radians
 */
export function arc(x, y, r, a, l) {
  const path = new Path2D();
  path.arc(x, y, r, a, a + l);
  return path;
}

/**
 * Generates a point shaped path
 * @param {Number} x - x position of the point
 * @param {Number} y - y position of the point
 */
export function point(x, y) {
  const path = new Path2D();
  path.arc(x, y, 0.25, 0, Math.PI * 2, false);
  return path;
}

/**
 * Generates a grid
 * @param {Number} x - x position
 * @param {Number} y - y position
 * @param {Number} w - width
 * @param {Number} h - height
 * @param {Number} rows - number of rows
 * @param {Number} cols - number of cols
 * @returns {Path2D} - path object representing a grid
 */
export function grid(x, y, w, h, rows, cols) {
  const grid = new Path2D();
  grid.rect(x, y, w, h);

  const cell_width = w / cols;
  for (let i = 1; i < cols; i++) {
    const cell_x = cell_width * i + x;
    grid.moveTo(cell_x, y);
    grid.lineTo(cell_x, y + h);
  }

  const cell_height = h / rows;
  for (let i = 1; i < rows; i++) {
    const cell_y = cell_height * i + y;
    grid.moveTo(x, cell_y);
    grid.lineTo(x + w, cell_y);
  }

  return grid;
}

/**
 * Generates a spray paint like cloud of points
 * @param {Number} x - x value of spray center
 * @param {Number} y - y value of spray center
 * @param {Number} w - width of the spray
 * @param {Number} h - height of the spray
 * @param {Number} points - the number of points to draw
 * @param {Function} ease - an easing function to control the distribution of points
 * @returns {Path2D} - a cloud of points
 */
export function spray(x, y, w, h, points, ease = (n) => n) {
  const spray_path = new Path2D();
  for (let i = 0; i < points; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const r = ease(Math.sqrt(Math.random()));

    spray_path.rect(
      r * w * Math.cos(theta) + x,
      r * h * Math.sin(theta) + y,
      0.1,
      0.1
    );
  }
  return spray_path;
}

/**
 * generates a rectangular path with scattered points
 * @param {Number} x - x value of rectangle
 * @param {Number} y - y value of rectangle
 * @param {Number} w - width of the rectangle
 * @param {Number} h - height of the rectangle
 * @param {Number} density - density of points in the rectangle
 * @returns - a rectangle made of scattered points
 */
export function fuzzy_rect(x, y, w, h, density) {
  const shape = new Path2D();
  const points = w * h * density * 2;
  for (let i = 0; i < points; i++) {
    const pos_x = Math.random() * w + x;
    const pos_y = Math.random() * h + y;
    shape.rect(pos_x, pos_y, 0.1, 0.1);
  }
  return shape;
}

/**
 * generates a line path with scattered points
 * @param {Number} x1 - starting x coordinate
 * @param {Number} y1 - starting y coordinate
 * @param {Number} x2 - ending x coordinate
 * @param {Number} y2 - ending y coordinate
 * @param {Number} width - line width
 * @param {Number} points  - the number of points to draw
 * @param {function} ease - an easing function to control the distribution of points
 * @returns {Path2D} - a line made of fuzzy points
 */
export function fuzzy_line(x1, y1, x2, y2, width, points, ease = (n) => n) {
  const path = new Path2D();
  const r = width / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);

  // Unit vectors
  const ux = dx / length;
  const uy = dy / length;
  const perpX = -uy;
  const perpY = ux;

  // Areas
  const rectArea = length * width;
  const capArea = Math.PI * r * r;
  const totalArea = rectArea + capArea;

  for (let i = 0; i < points; i++) {
    const pick = Math.random() * totalArea;

    if (pick < rectArea) {
      // Sample in the rectangle
      const t = Math.random(); // 0 to 1 along the line
      // const offset = (Math.random() - 0.5) * width; // perpendicular offset
      const offset = Math.random() * 2 - 1;
      const eased_offset = Math.sign(offset) * ease(Math.abs(offset)) * r;

      const px = x1 + ux * length * t + perpX * eased_offset;
      const py = y1 + uy * length * t + perpY * eased_offset;
      path.rect(px, py, 0.1, 0.1);
    } else {
      // Sample in one of the circular caps
      const isStart = Math.random() < 0.5;

      // Uniform point in semicircle (polar coordinates)
      const angle = Math.random() * Math.PI;
      const dist = ease(Math.sqrt(Math.random())) * r; // √ for uniform area distribution

      const px = isStart
        ? x1 + Math.cos(angle + Math.PI) * dist
        : x2 + Math.cos(angle + Math.PI) * dist;
      const py = isStart
        ? y1 + Math.sin(angle) * dist
        : y2 + Math.sin(angle) * dist;

      path.rect(px, py, 0.1, 0.1);
    }
  }

  return path;
}

/**
 * generates a polygon based on an array of vectors
 * @param {[Vector]} points - an array of vectors representing points of the polygon
 * @param {Boolean} close - true to close, false to leave shape open
 * @returns {Path2D} - a polygon
 */
export function polygon(points, close = true) {
  const path = new Path2D();
  if (points.length == 0) {
    return path;
  }

  path.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    path.lineTo(points[i].x, points[i].y);
  }

  if (close) {
    path.closePath();
  }

  return path;
}

/**
 *
 * @param {[Vector]} points
 * @param {Number} tension
 * @param {Number} segments
 * @returns
 */
export function curve(points, tension = 0.5, segments = 16) {
  if (points.length < 2) return;
  const curve_path = new Path2D();
  curve_path.moveTo(points[0].x, points[0].y);

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1] || points[i];
    const p3 = points[i + 2] || p2;

    for (let t = 0; t <= segments; t++) {
      const st = t / segments;
      const tt = st * st;
      const ttt = tt * st;

      const q1 = -tension * ttt + 2 * tension * tt - tension * st;
      const q2 = (2 - tension) * ttt + (tension - 3) * tt + 1;
      const q3 = (tension - 2) * ttt + (3 - 2 * tension) * tt + tension * st;
      const q4 = tension * ttt - tension * tt;

      const x = q1 * p0.x + q2 * p1.x + q3 * p2.x + q4 * p3.x;
      const y = q1 * p0.y + q2 * p1.y + q3 * p2.y + q4 * p3.y;

      curve_path.lineTo(x, y);
    }
  }
  return curve_path;
}
