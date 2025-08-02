//A black five-pointed star, a yellow six-pointed star, a red seven-pointed star, and a blue eight-pointed star, drawn in color and India ink washes.
import { star } from "../utils/shape_util.js";
import { shuffle, random } from "../utils/random_util.js";

export function draw(cnv) {
  let stars = [
    [5, random(0.3, 0.45), "black"],
    [6, random(0.5, 0.7), "yellow"],
    [7, random(0.6, 0.8), "red"],
    [8, random(0.6, 0.88), "blue"],
  ];

  stars = shuffle(stars);
  const size = (Math.min(cnv.width, cnv.height) * random(0.2, 0.45)) / 2;
  const offset = size * 1.2;
  cnv.save();
  cnv.ctx.rotate(Math.PI);
  cnv.ctx.translate(-cnv.width / 2, -cnv.height / 2);
  cnv.shape(
    star(offset, offset, size, size, stars[0][0], stars[0][1]),
    stars[0][2],
    ""
  );
  cnv.restore();

  cnv.save();
  cnv.ctx.rotate(Math.PI);
  cnv.ctx.translate(-cnv.width / 2, -cnv.height / 2);
  cnv.shape(
    star(-offset, -offset, size, size, stars[1][0], stars[1][1]),
    stars[1][2],
    ""
  );
  cnv.restore();

  cnv.save();
  cnv.ctx.rotate(Math.PI);
  cnv.ctx.translate(-cnv.width / 2, -cnv.height / 2);
  cnv.shape(
    star(-offset, offset, size, size, stars[2][0], stars[2][1]),
    stars[2][2],
    ""
  );
  cnv.restore();

  cnv.save();
  cnv.ctx.rotate(Math.PI);
  cnv.ctx.translate(-cnv.width / 2, -cnv.height / 2);
  cnv.shape(
    star(offset, -offset, size, size, stars[3][0], stars[3][1]),
    stars[3][2],
    ""
  );
  cnv.restore();
}
