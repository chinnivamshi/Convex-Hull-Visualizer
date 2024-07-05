import React from 'react';
import app1 from "../images/app1.png";
import app2 from "../images/app2.png";
import app3 from "../images/app3.jpg";
import app4 from "../images/app4.png";
import app5 from "../images/image.jpg";
import './applications.css';

function Applications() {
    return (
        <div class="top1">
            <div class = "bg5"></div>
            <div class="heading1">
                <h1>Applications of Convex Hull</h1>
            </div>
            <div class="container">
                <div><img src={app1} width = "300px" height="350px" /></div>
                <div class="sub">
                    <h1>Robot Motion planning</h1>
                    <h3>It is used in Robot Motion planning:
                        In order to get from s to t, the shortest path will either be the straight line from s to t (if the
                        obstacle doesn't intersect it) or one of the two polygonal chains of the convex hull.</h3></div>
            </div>
            <div class="container">
                <div><img src={app2} width = "300px" height="350px" /></div>
                <div class="sub">
                    <h1>Collision Detection</h1>
                    <h3>By working with convex hulls instead of the raw point cloud data, self-driving cars can perform
                        collision detection much faster. This simplified representation allows the car to identify potential
                        obstacles and take necessary actions like swerving or braking to avoid a collision.</h3>
                </div>
            </div>
            <div class="container">
                <div><img src={app3} width = "300px" height="350px" /></div>
                <div class="sub">
                    <h1>Feature Extraction</h1>
                    <h3> These shape properties and convexity defects extracted from the convex hull become features used for
                        pattern recognition. These features are then fed into machine learning algorithms that can learn to
                        distinguish between different patterns or objects based on their shapes.</h3>
                </div>
            </div>
            <div class="container">
                <div><img src={app4} width = "300px" height="350px" /></div>
                <div class="sub">
                    <h1>Path Planning</h1>
                    <h3> Convex hulls are also helpful in path planning for self-driving cars. By understanding the size and
                        location of obstacles through convex hulls, the car's navigation system can efficiently calculate a safe
                        path to the destination.</h3>
                </div>
            </div>
            <div class="container">
                <div><img src={app5} width = "300px" height="350px"/></div>
                <div class="sub">
                    <h1>Sensor Perception</h1>
                    <h3> Self-driving cars rely on various sensors like LiDAR, radar, and cameras to perceive their
                        surroundings. These sensors generate a point cloud, which is a massive dataset of points representing
                        the surrounding objects.
                    </h3>
                </div>
            </div>
        </div>
    )
};

export default Applications;
