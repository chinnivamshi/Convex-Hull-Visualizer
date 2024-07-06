# Convex-Hull-Visualizer

This project implements two convex hull algorithms: Jarvis March and Kirkpatrick-Seidel, and visualizes their working using a web-based interface built with React.

## Contributors
| Name |
| :-------- |
| `Atharva Chikhale` |
| `Suyash Patil` |
| `Chinni Vamshi Krushna` |
| `Aditya Aggarwal` |
| `Utkarsh Tiwari` |

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Algorithm Details](#algorithm-details)
  - [Jarvis March Algorithm](#jarvis-march-algorithm)
  - [Kirkpatrick-Seidel Algorithm](#kirkpatrick-seidel-algorithm)
- [Visualization](#visualization)
- [Documentation](#documentation)

## Introduction

This project is developed as part of an assignment for the Design and Analysis of Algorithms course (CS F364) at BITS Pilani, Hyderabad Campus. The goal is to implement and visualize two convex hull algorithms, compare their performances, and provide a comprehensive analysis.

## Features

- Implementation of Jarvis March Algorithm
- Implementation of Kirkpatrick-Seidel Algorithm
- Interactive web-based visualization of both algorithms
- Comparative analysis between the two algorithms

## Technologies Used

- React
- HTML
- CSS
- JavaScript

## Setup

To set up the project locally, follow these steps:-

1. Clone the repository:
```
git clone https://github.com/AtharvaSC/Convex-Hull-Visualizer.git
```

2. Navigate to the project directory:
```
cd ReactApp_ConvexHull_Visualizer
```

3. Install the dependencies:
```
npm i
```

4. Start the development server:
```
npm start
```
The application should now be running on http://localhost:3000.

## Usage
1. Open your web browser and navigate to http://localhost:3000.
2. Select the algorithm you want to visualize (Jarvis March or Kirkpatrick-Seidel).
3. Add points by clicking on the canvas.
4. Click the "Generate Convex Hull" button to generate the convex hull and then click the "RunConvexHull" button to see the convex hull being computed and visualized step by step.

## Algorithm Details
### Jarvis March Algorithm
Jarvis March is an intuitive algorithm that iteratively finds the next point on the convex hull by considering all points and selecting the one with the largest polar angle relative to the current point. It repeats this process until it reaches the starting point again.

### Kirkpatrick-Seidel Algorithm
Kirkpatrick-Seidel is a divide-and-conquer algorithm. It recursively divides the set of points into smaller subsets, computes the convex hull of each subset, and then merges the convex hulls to form the final convex hull.

## Visualization
The visualizations are designed to help understand the step-by-step process of each algorithm. The web interface provides an interactive canvas where you can add points and see the algorithms in action.

## Documentation
Code Documentation: The code is well-documented with comments explaining the design and implementation of each algorithm.

Comparison: Detailed analysis and comparison of the two algorithms is provided in the form of a webpage included in the project.



