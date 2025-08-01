import Vector from "../utils/Vector.js";
import { random } from "../utils/random_util.js";
import { polygon, line, ellipse } from "../utils/shape_util.js";
import { map } from "../utils/math_util.js";

export function draw(cnv) {
  cnv.erase();
  cnv.background("s");
  const center = new Vector(cnv.width / 2, cnv.height / 2);
  const lines = random(0, 30) + 5;
  const rows = random(0, 10) + 2;
  const radius = random(0.3, 0.9) * (Math.min(cnv.width, cnv.height) / 2);

  cnv.shape(ellipse(center.x, center.y, radius, radius, 0), "", "white");
  for (let i = 0; i < lines; i++) {
    const x = center.x - radius + ((i + 1) * radius * 2) / (lines + 1);
    const xoff = center.x - x;
    const yoff = Math.sqrt(radius * radius - xoff * xoff);
    const y1 = center.y - yoff;
    const y2 = center.y + yoff;
    cnv.shape(line(x, y1, x, y2), "", "white");
  }

  const roff = random(0, radius * Math.cos(Math.PI / 4) - 25) + 25;
  const loff = random(0, radius * Math.cos(Math.PI / 4) - 25) + 25;
  const yoff = random(0, radius * Math.sin(Math.PI / 4) - 25) + 25;

  const parallelogram = polygon([
    new Vector(center.x - loff, center.y + yoff),
    new Vector(center.x + roff, center.y + yoff),
    new Vector(center.x + loff, center.y - yoff),
    new Vector(center.x - roff, center.y - yoff),
  ]);
  cnv.shape(parallelogram, "black", "white");

  for (let i = 0; i < rows; i++) {
    let y = center.y + yoff - (i + 1) * ((2 * yoff) / (rows + 1));
    let lx = map((i + 1) / (rows + 1), 0, 1, center.x - loff, center.x - roff);
    let rx = map((i + 1) / (rows + 1), 0, 1, center.x + roff, center.x + loff);
    cnv.shape(line(lx, y, rx, y), "", "white");
  }
}
