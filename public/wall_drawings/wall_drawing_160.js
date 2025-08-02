//A black outlined square with a red diagonal line centered on the axis between the upper left and lower right corners and another red diagonal line centered on the axis between the lower left and upper right corners.
import Vector from "../utils/Vector.js";
import { random } from "../utils/random_util.js";
import { rect, line } from "../utils/shape_util.js";

export function draw(cnv) {
  const center = new Vector(cnv.width / 2, cnv.height / 2);
  const sqr_size = Math.min(cnv.width, cnv.height) * random(0.5, 0.8);
  cnv.erase();
  cnv.shape(
    rect(
      center.x - sqr_size * 0.5,
      center.y - sqr_size * 0.5,
      sqr_size,
      sqr_size
    ),
    "",
    "black"
  );

  const cross_len =
    new Vector(sqr_size / 2, sqr_size / 2).magnitude() * random(0.5, 0.9);

  const BR = new Vector(1, 1).normalize().mult(cross_len).add(center);
  cnv.shape(line(center.x, center.y, BR.x, BR.y), "", "red");
  const BL = new Vector(-1, 1).normalize().mult(cross_len).add(center);
  cnv.shape(line(center.x, center.y, BL.x, BL.y), "", "red");
  const TR = new Vector(1, -1).normalize().mult(cross_len).add(center);
  cnv.shape(line(center.x, center.y, TR.x, TR.y), "", "red");
  const TL = new Vector(-1, -1).normalize().mult(cross_len).add(center);
  cnv.shape(line(center.x, center.y, TL.x, TL.y), "", "red");
}
