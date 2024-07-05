import React from 'react';
import './comparison.css';
import first from "../images/kps-gif.gif";
import second from "../images/march-gif.gif";
import table from "../images/table.jpeg";
import graph1 from "../images/march-graph.jpeg";
import graph2 from "../images/kps-graph.jpeg";

function ComparisonPage() {
    return (
        <div class="top">
            <div class = "bg2"></div>
            <div class="heading">
                <h1>Comparison</h1>
            </div>
            <div class="super-gif">
                <img class="gif1" src={first} alt="gif1" />
                <img class="gif2" src={second} alt="gif2" />
            </div>
            <div class="content">
                {/* <table>
                    <tr>
                        <th>
                            <h2>Kirk Patrick Seidel</h2>
                        </th>
                        <th>
                            <h2>Marching Algorithm</h2>
                        </th>
                    </tr>
                </table> */}
                <div class="container">
                    <div class="abc">
                        <h1>Kirk Patrick Seidel</h1>
                        <li >The Kirkpatrick-Seidel algorithm achieves an optimal O(n log h)
                            time complexity, where h is the number of vertices on the convex hull.</li>
                        <li >The space complexity of the Kirkpatrick-Seidel algorithm is O(n)
                            as it requires storing intermediate data structures during the computation.</li>

                        <li >Kirkpatrick-Seidel is a divide-and-conquer algorithm. It
                            recursively divides the set of points into smaller subsets, computes the convex hull of each subset, and
                            then merges the convex hulls to form the final convex hull.</li>

                        <li >Kirkpatrick-Seidel is more efficient, particularly for large
                            sets of points, due to its divide-and-conquer approach and optimal time complexity.</li>
                        <li >Kirkpatrick-Seidel is more complex and requires careful
                            implementation, but it is also robust and efficient, especially for large datasets.
                        </li>

                    </div>
                    <div class="abc">
                        <h1>Jarvis March</h1>
                        <li >The time complexity of the Jarvis March algorithm is O(nh),
                            where n is the number of input points and h
                            is the number of points on the convex hull. In the worst case, h = n, giving a time complexity of
                            O(n^2).</li>

                        <li >The space complexity of the Jarvis March algorithm is O(1) as it
                            only requires a constant amount of extra space.</li>
                        <li >Jarvis March is an intuitive algorithm that iteratively finds
                            the next point on the convex hull by considering all points and selecting the one with the largest polar
                            angle relative to the current point. It repeats this process until it reaches the starting point again.
                        </li>
                        <li >Jarvis March can be slow for large input sets, especially if the
                            points are nearly collinear, as it examines all points in each iteration.</li>

                        <li >Jarvis March is a simple and robust algorithm that works well
                            for general cases, but it can suffer from numerical precision issues due to its reliance on angle
                            calculations.</li>
                    </div>
                </div>
                <div class="table">
                    <img class="tab" src={table} alt="table" />
                </div>
                <div class="graphs">
                <img class="graph1" src={graph1} alt="gif1" />
                <img class="graph2" src={graph2} alt="gif2" />
            </div>
            </div>
        </div>
    );
}

export default ComparisonPage;
