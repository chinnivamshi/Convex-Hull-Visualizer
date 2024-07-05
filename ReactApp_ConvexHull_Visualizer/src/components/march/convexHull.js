/**
 * The `convexHull` function in the provided JavaScript code calculates the convex hull of a set of
 * points using the Graham scan algorithm and stores the intermediate states during the process.
 * @param points - The `convexHull` function in the provided code snippet takes an array of points as
 * input to find the convex hull. Each point in the array is represented by an object with `x` and `y`
 * coordinates.
 * @returns The `convexHull` function is returning an array of states that represent the process of
 * finding the convex hull of a set of points. Each state includes information about the current point
 * being considered, the next point to be added to the hull, the current hull, and the count of points
 * processed so far.
 */
// convexHull.js best code
const convexHull = (points) => {
  let hull = [];
  let states = [];
  const n = points.length;
  if (n < 3) {
    if (n === 1) {
      hull.push(points[0]);
    }
    if (n === 2) {
      hull.push(points[0]);
      hull.push(points[1]);
    }

    return hull;
  } // Convex hull not possible with less than 3 points

  // Function to find orientation
  const orientation = (p1, p2, p3) => {
    const val = (p3.y - p2.y) * (p2.x - p1.x) - (p2.y - p1.y) * (p3.x - p2.x);
    if (val === 0) return 0; // Collinear
    return val > 0 ? 1 : -1; // Clockwise or counterclockwise
  };

  const dist = (p1, p2) => {
    return Math.sqrt((p2.y - p1.y) ** 2 + (p2.x - p1.x) ** 2);
  };

  // Find the leftmost point
  let l = 0;
  for (let i = 1; i < n; i++) {
    if (points[i].x < points[l].x) {
      l = i;
    }
  }
  let onHull = points[l];
  let thull = [];
  let count = -1;
  while (true) {
    hull.push(onHull);
    thull.push(onHull);
    count = count + 1;
    let nextPoint = points[0];
    states.push([onHull, nextPoint, nextPoint, thull, count]);
    //states.push([onHull,nextPoint,nextPoint]);
    for (const point of points) {
      const o = orientation(onHull, nextPoint, point);
      states.push([onHull, nextPoint, point, thull, count]);
      //states.push([onHull,nextPoint,point]);
      if (
        nextPoint === onHull ||
        o === 1 ||
        (o === 0 && dist(onHull, point) > dist(onHull, nextPoint))
      ) {
        nextPoint = point;
        states.push([onHull, nextPoint, point, thull, count]);
        //states.push([onHull,nextPoint,point]);
      }
    }
    onHull = nextPoint;
    states.push([onHull, nextPoint, nextPoint, thull, count]);
    //states.push([onHull,nextPoint,nextPoint]);
    if (onHull === hull[0]) {
      hull.push(onHull);
      thull.push(onHull);
      break;
    }
  }
  //states.push(hull);
  return states;
};

export default convexHull;
