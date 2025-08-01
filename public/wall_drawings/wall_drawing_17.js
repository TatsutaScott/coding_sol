import { random } from "../utils/random_util.js";
import { rect, line } from "../utils/shape_util.js";
import Vector from "../utils/Vector.js";

export function draw(cnv) {
  const w = cnv.width,
    h = cnv.height;
  const scaling = random(0.75, 1);
  const gap = w * 0.25 * ((1 - scaling) * 0.5);
  const spacing = (w * 0.25 * scaling) / Math.floor(random(10, 50));

  const block_w = w * 0.25 * scaling;
  const block_h = h - gap * 2;

  cnv.erase();

  //up-down
  let x = gap;
  while (x < block_w + gap) {
    cnv.shape(line(x, gap, x, h - gap), "", "black");
    x += spacing;
  }
  cnv.shape(rect(gap, gap, block_w, block_h), "", "black");

  //left-right
  let y = gap;
  let start_x = w * 0.25 + gap;
  while (y < h - gap) {
    cnv.shape(line(start_x, y, start_x + block_w, y), "", "black");
    y += spacing;
  }
  cnv.shape(rect(start_x, gap, block_w, block_h), "", "black");

  //diagonal up-right
  start_x = w * 0.5 + gap;
  const block_3 = rect(start_x, gap, block_w, block_h);
  cnv.shape(block_3, "", "black");

  cnv.save();
  cnv.ctx.clip(block_3);
  let off = new Vector(block_w, -block_w);
  y = gap;
  while (y + off.y < h) {
    cnv.shape(line(start_x, y, start_x + off.x, y + off.y), "", "black");
    y += spacing;
  }
  cnv.restore();

  //diagonal down-right
  start_x = w * 0.75 + gap;
  const block_4 = rect(start_x, gap, block_w, block_h);
  cnv.shape(block_4, "", "black");

  cnv.save();
  cnv.ctx.clip(block_4);

  off = new Vector(block_w, block_w);
  y = -off.y;
  while (y - off.y < h) {
    cnv.shape(line(start_x, y, start_x + off.x, y + off.y), "", "black");
    y += spacing;
  }
  cnv.restore();
}
