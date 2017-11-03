import { Vector, Matrix3d } from './layer';
const solve = require('numeric');

type RectPoints = [Vector, Vector, Vector, Vector];

export const transformPointsToMatrix = (sourcePoints: RectPoints, targetPoints: RectPoints): Matrix3d => {
  const a: number[][] = [];
  const b: number[] = [];

  for (let i = 0, n = sourcePoints.length; i < n; ++i) {
    const [xSource, ySource] = sourcePoints[i];
    const [xTarget, yTarget] = targetPoints[i];

    b.push(xTarget, yTarget);

    a.push(
      [xSource, ySource, 1, 0, 0, 0, - xSource * xTarget, - ySource * xTarget],
      [0, 0, 0, xSource, ySource, 1, - xSource * yTarget, - ySource * yTarget]
    );
  }

  const x = solve(a, b, true);

  return [
    x[0], x[3], 0, x[6],
    x[1], x[4], 0, x[7],
    0, 0, 1, 0,
    x[2], x[5], 0, 1
  ];
};
