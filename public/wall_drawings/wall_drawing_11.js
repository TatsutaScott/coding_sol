import { random } from "../utils/random_util.js";
import { rect, line } from "../utils/shape_util.js";
import Vector from "../utils/Vector.js";

export function draw(cnv) {
  cnv.erase();
  const ctr = new Vector(cnv.width * 0.5, cnv.height * 0.5);
  const spacing = random(20, 50);

  //TOP LEFT
  cnv.save();
  cnv.ctx.clip(rect(0, 0, ctr.x, ctr.y));
  cnv.shape(patt_1(0, 0, ctr.x, ctr.y, spacing, false), "", "black");
  cnv.shape(patt_2(0, 0, ctr.x, ctr.y, spacing, false), "", "black");
  cnv.shape(patt_3(0, 0, ctr.x, ctr.y, spacing, "BR"), "", "black");
  cnv.restore();

  //TOP RIGHT
  cnv.save();
  cnv.ctx.clip(rect(ctr.x, 0, ctr.x, ctr.y));
  cnv.shape(patt_1(ctr.x, 0, ctr.x, ctr.y, spacing, true), "", "black");
  cnv.shape(patt_2(ctr.x, 0, ctr.x, ctr.y, spacing, false), "", "black");
  cnv.shape(patt_4(ctr.x, 0, ctr.x, ctr.y, spacing, "BL"), "", "black");
  cnv.restore();

  //BOTTOM LEFT
  cnv.save();
  cnv.ctx.clip(rect(0, ctr.y, ctr.x, ctr.y));
  cnv.shape(patt_1(0, ctr.y, ctr.x, ctr.y, spacing, false), "", "black");
  cnv.shape(patt_3(0, ctr.y, ctr.x, ctr.y, spacing, "TR"), "", "black");
  cnv.shape(patt_4(0, ctr.y, ctr.x, ctr.y, spacing, "TR"), "", "black");

  cnv.restore();

  //BOTTOM RIGHT
  cnv.save();
  cnv.ctx.clip(rect(ctr.x, ctr.y, ctr.x, ctr.y));
  cnv.shape(patt_2(ctr.x, ctr.y, ctr.x, ctr.y, spacing, true), "", "black");
  cnv.shape(patt_3(ctr.x, ctr.y, ctr.x, ctr.y, spacing, "TL"), "", "black");
  cnv.shape(patt_4(ctr.x, ctr.y, ctr.x, ctr.y, spacing, "TL"), "", "black");
  cnv.restore();
}

function patt_1(x, y, w, h, spacing, fromLeft) {
  const path = new Path2D();

  if (fromLeft) {
    let x_pos = x;
    while (x_pos < x + w) {
      path.addPath(line(x_pos, y, x_pos, y + h));
      x_pos += spacing;
    }
  } else {
    let x_pos = x + w;
    while (x_pos > x) {
      path.addPath(line(x_pos, y, x_pos, y + h));
      x_pos -= spacing;
    }
  }

  return path;
}

function patt_2(x, y, w, h, spacing, fromTop) {
  const path = new Path2D();

  if (fromTop) {
    let y_pos = y;
    while (y_pos < y + h) {
      path.addPath(line(x, y_pos, x + w, y_pos));
      y_pos += spacing;
    }
  } else {
    let y_pos = y + h;
    while (y_pos > y) {
      path.addPath(line(x, y_pos, x + w, y_pos));
      y_pos -= spacing;
    }
  }

  return path;
}

function patt_3(x, y, w, h, spacing, direction) {
  const path = new Path2D();
  const len = Math.min(w, h);

  if (direction == "TL") {
    const offset = new Vector(-len, len);
    let x_pos = x;
    while (x_pos < x + w + len) {
      path.addPath(line(x_pos, y, x_pos + offset.x, y + offset.y));
      x_pos += spacing;
    }
  } else if (direction == "BR") {
    const offset = new Vector(len, -len);
    let x_pos = x + w;
    while (x_pos > x - len) {
      path.addPath(line(x_pos, y + h, x_pos + offset.x, y + h + offset.y));
      x_pos -= spacing;
    }
  } else if (direction == "TR") {
    const offset = new Vector(-len, len);
    let x_pos = x + w + Math.floor(h / spacing) * spacing;
    while (x_pos > x) {
      path.addPath(line(x_pos, y, x_pos + offset.x, y + offset.y));
      x_pos -= spacing;
    }
  }

  return path;
}

function patt_4(x, y, w, h, spacing, direction) {
  const path = new Path2D();
  const len = Math.min(w, h);

  if (direction == "BL") {
    const offset = new Vector(-len, -len);
    let x_pos = x;
    while (x_pos < x + w + len) {
      path.addPath(line(x_pos, y + h, x_pos + offset.x, y + h + offset.y));
      x_pos += spacing;
    }
  } else if (direction == "TR") {
    const offset = new Vector(len, len);
    let x_pos = x + w;
    while (x_pos > x - len) {
      path.addPath(line(x_pos, y, x_pos + offset.x, y + offset.y));
      x_pos -= spacing;
    }
  } else if (direction == "TL") {
    const offset = new Vector(len, len);
    let x_pos = x - Math.floor(h / spacing) * spacing;
    while (x_pos < x + w) {
      path.addPath(line(x_pos, y, x_pos + offset.x, y + offset.y));
      x_pos += spacing;
    }
  }

  return path;
}
