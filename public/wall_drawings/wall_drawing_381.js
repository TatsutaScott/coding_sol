//A black outlined square with a red diagonal line centered on the axis between the upper left and lower right corners and another red diagonal line centered on the axis between the lower left and upper right corners.
import Vector from "../utils/Vector.js";
import { random, noise } from "../utils/random_util.js";
import { rect, line, point } from "../utils/shape_util.js";
import { primary } from "../utils/palettes.js";
import { map } from "../utils/math_util.js";

export function draw(cnv) {
  const center = new Vector(cnv.width / 2, cnv.height / 2);
  const sqr_size = Math.min(cnv.width, cnv.height) * random(0.5, 0.8);
  cnv.erase();
  cnv.shape(
    rect(
      center.x - sqr_size * 0.5,
      center.y - sqr_size * 0.5,
      sqr_size * 0.5,
      sqr_size * 0.5
    ),
    primary.gray,
    ""
  );
  cnv.shape(
    rect(center.x, center.y - sqr_size * 0.5, sqr_size * 0.5, sqr_size * 0.5),
    primary.yellow,
    ""
  );
  cnv.shape(
    rect(center.x - sqr_size * 0.5, center.y, sqr_size * 0.5, sqr_size * 0.5),
    primary.red,
    ""
  );
  cnv.shape(
    rect(center.x, center.y, sqr_size * 0.5, sqr_size * 0.5),
    primary.blue,
    ""
  );

  //   const density = 500;
  //   for (let i = 0; i < density; i++) {
  //     const x = map(
  //       i,
  //       0,
  //       density,
  //       center.x - sqr_size * 0.5,
  //       center.x + sqr_size * 0.5
  //     );
  //     for (let q = 0; q < density; q++) {
  //       const y = map(
  //         q,
  //         0,
  //         density,
  //         center.y - sqr_size * 0.5,
  //         center.y + sqr_size * 0.5
  //       );

  //       const n = noise(i / (density * 2), q / (density * 2));
  //       if (random(0, 1) < n) {
  //         const pos = Vector.random(random(0, 2)).add(x, y);
  //         const alpha = map(n, 0, 1, 0.1, 0.2);
  //         cnv.shape(point(pos.x, pos.y), "", `rgba(255,255,255,${alpha})`);
  //       }
  //     }
  //   }
}
