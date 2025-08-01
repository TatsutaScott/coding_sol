import Vector from "@/utils/Vector";
import { palettes } from "@/utils/palettes";
import { random, shuffle, noise } from "@/utils/random_util";
import { curve } from "@/utils/shape_util";
import { map } from "@/utils/math_util";

export function draw(cnv) {
  const palette = shuffle(random(palettes));
  const cols = Math.floor(Math.random() * 75) + 25;
  const rows = 200;
  const div = Math.floor(Math.random() * 7) + 1;
  cnv.ctx.lineWidth = Math.floor(Math.random() * 3) + 0.5;

  cnv.background(palette[0]);

  for (let i = 0; i < cols; i++) {
    const points = [];

    let x = (i + 1) * (cnv.width / (cols + 1));

    for (let q = 0; q < rows; q++) {
      let y = (q + 1) * (cnv.height / (rows + 1));
      let xOff = noise(i / (cols / div), q / (rows / div));
      xOff = map(
        xOff,
        0,
        1,
        -1 * (2 * (cnv.width / cols)),
        2 * (cnv.width / cols)
      );

      if (q == 0 || q == rows - 1) {
        points.push(new Vector(x + xOff, y));
      }
      points.push(new Vector(x + xOff, y));
    }
    const curve_path = curve(points);
    cnv.shape(curve_path, "", palette[1]);
  }
}
