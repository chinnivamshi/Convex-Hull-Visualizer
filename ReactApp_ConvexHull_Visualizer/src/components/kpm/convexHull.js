let checkuh = 0;
function UPPER_HULL(pmin, pmax, T, hull_points) {
    // Step 1: Find the median of the x-coordinates
    let xCoordinates = T.map(point => point.x).sort((a, b) => a - b);
    let medianIndex = Math.floor((T.length / 2));
    let a = xCoordinates[medianIndex];
    if(checkuh === 0){   
        ga = a;
    }

    
    // Step 2: Split T into Tleft and Tright
    let Tleft = [];
    let Tright = [];
    for (let i = 0; i < T.length; i++) {
        if (T[i].x < a) {
            Tleft.push(T[i]);
        } else {
            Tright.push(T[i]);
        }
    }

    if(checkuh === 0){
        let ntleft = [];
        let ntright = [];
        Tleft.forEach(point => {
            ntleft.push(point);
        })
        Tright.forEach(point => {
            ntright.push(point);
        })

        states.push([2,[gpumax,gpumin,gplmax,gplmin],ga,ntleft, ntright]);
    }

    // Step 3: Compute upper bridge (Not implemented)
    let [pl, pr] = UPPER_BRIDGE(T, a, hull_points);
    // console.log(pmin,pmax);
    console.log([pl, pr], "this is bridge");
    if(ub === false){
        // states.push([pl,pr]);
        ub = true;
    }
    hull_points.add(pl);
    hull_points.add(pr);
    if(checkuh === 0){
        states.push([7, [gpumax,gpumin,gplmax,gplmin], ga, [pl,pr]]);
    }
    // Step 4: Discard points within the convex quadrilateral
    //const quadrilateral = [pmin, pl, pr, pmax];
    // console.log(quadrilateral);
    
    let newTleft = [pl];
    let newTright = [pr];
    Tleft.forEach(point => { 
        if(isPointToLeftOfLine(point, pmin, pl)){
            newTleft.push(point);
        }
    })

    Tright.forEach(point => { 
        if(isPointToLeftOfLine(point, pr, pmax)){
            newTright.push(point);
        }
    })

    Tleft = newTleft;
    Tright = newTright;
    // console.log(Tleft,Tright, "after removing inside quad");
    // return;
    //Step 5: Recursively call UPPER-HULL on Tleft and Tright
    if(checkuh === 0){
        let nntleft = [];
        let nntright = [];
        newTleft.forEach(point => {
            nntleft.push(point);
        })
        newTright.forEach(point => {
            nntright.push(point);
        })
        states.push([8,[gpumax,gpumin,gplmax,gplmin],ga, nntleft, nntright, [gpumin,pl], [gpumax, pr]]);
        states.push([9,[gpumax,gpumin,gplmax,gplmin],ga, nntleft, nntright, [gpumin,pl], [gpumax, pr]]);
        checkuh = 1;
    }

    let upperHullLeft = [];
    if(pmin !== pl){
        upperHullLeft = UPPER_HULL(pmin, pl, Tleft, hull_points);
    }
    
    let upperHullRight = [];
    if(pmax !== pr){
        upperHullRight = UPPER_HULL(pr, pmax, Tright, hull_points);
    }

    // Step 6: Concatenate the lists and return
    return upperHullLeft.concat(upperHullRight);
}

function crossProduct(A, B, P) {
    return (B.x - A.x) * (P.y - A.y) - (B.y - A.y) * (P.x - A.x);
}

// Function to check if a point is to the left of a line formed by two other points
function isPointToLeftOfLine(point, lineStart, lineEnd) {
    return crossProduct(lineStart, lineEnd, point) >= 0;
}

function threePointsUpper(S){
    S.sort((a,b) => a.x - b.x);

    let A = S[0];
    let B = S[2];
    let P = S[1];
    if(isPointToLeftOfLine(P, A, B)){
        if(P.x <= (A.x+B.x)/2){
            return [P,B];
        }
        else{
            return [A,P];
        }
    }
    else{
        return [A,B];
    }
}

let checkub = 0;
function UPPER_BRIDGE(S, L, hull_points) {
    let CANDIDATES = [];
    
    if (S.length === 2) {
        if(S[0].x < S[1].x){
            return [S[0], S[1]]; // If there are only two points, return them
        }
        else{
            return [S[1], S[0]];
        }
    }

    if(S.length === 3){
        return threePointsUpper(S);
    }

    // Pair up points into pairs
    let PAIRS = [];
    for (let i = 0; i < S.length-1; i += 2) {
        let pair = [S[i], S[i + 1]];
        PAIRS.push(pair);
    }
    //adding the last point
    if(S.length % 2 === 1){
        CANDIDATES.push(S[S.length-1]);
        
    }
    
    PAIRS.forEach(p => {
        if(p[0].x > p[1].x){
            let p1 = p[0];
            let p2 = p[1];
            p[0] = p2;
            p[1] = p1;
        }
    })
    
    // Determine slopes and populate CANDIDATES
    if(checkub === 0){
        let nPairs = [];
        PAIRS.forEach(pair => {
            nPairs.push(pair);
        })
        states.push([3,[gpumax,gpumin,gplmax,gplmin],ga,nPairs]);
    }
    
    let newPAIRS = [];
    for (let pair of PAIRS) {
        let [pi, pj] = pair;
        if (pi.x === pj.x) {
            if (pi.y > pj.y) {
                CANDIDATES.push(pi);
            } else {
                CANDIDATES.push(pj);
            }
            // pair.slope = Number.MAX_VALUE;
        } else {
            let slope = (pi.y - pj.y) / (pi.x - pj.x);
            pair.slope = slope;
            newPAIRS.push(pair);
        }
    }
    
    PAIRS = newPAIRS;
    // Sort PAIRS by slopes
    PAIRS.sort((a, b) => a.slope - b.slope);
    
    // Find K, the median of slopes
    // console.log(PAIRS);
    if(PAIRS.length === 0){
        return UPPER_BRIDGE(CANDIDATES, L);
    }
    let K = PAIRS[Math.floor(PAIRS.length / 2)].slope;
    // console.log(K);
    // Split PAIRS into SMALL, EQUAL, and LARGE based on slopes
    let SMALL = [];
    let EQUAL = [];
    let LARGE = [];
    for (let pair of PAIRS) {
        if (pair.slope < K) {
            SMALL.push(pair);
        } else if (pair.slope > K) {
            LARGE.push(pair);
        } else {
            EQUAL.push(pair);
        }
    }
    
    if(checkub === 0){
        let nlarge = [];
        let nsmall = [];
        let nequal = [];
        LARGE.forEach(pair => {
            nlarge.push(pair);
        })
        SMALL.forEach(pair => {
            nsmall.push(pair);
        })
        EQUAL.forEach(pair => {
            nequal.push(pair);
        })
        
        states.push([4,[gpumax,gpumin,gplmax,gplmin], ga, nlarge, nsmall, nequal]);
        
    }
    
    // console.log(SMALL, LARGE, EQUAL);
    
    // Find supporting line with slope K
    let MAX = [];
    let maxIntersection = -Infinity;
    for (let point of S) {
        let c = point.y - K * point.x;
        if (c > maxIntersection) {
            maxIntersection = c;
            MAX = [point];
        } else if (c === maxIntersection) {
            MAX.push(point);
        }
    }
    
    // console.log(MAX);
    // Find Pk with minimum x-coordinate
    let Pk = MAX.reduce((prev, curr) => (prev.x < curr.x ? prev : curr));
    
    // Find Pm with maximum x-coordinate
    let Pm = MAX.reduce((prev, curr) => (prev.x > curr.x ? prev : curr));
    
    // Determine if bridge is contained
    if(checkub === 0){
        states.push([5,[gpumax,gpumin,gplmax,gplmin],ga,[Pk,Pm,K]]);
    }
    
    if (Pk.x <= L && Pm.x > L) {
        if(checkub === 0){
            states.push([6,[gpumax,gpumin,gplmax,gplmin],ga,[Pk,Pm]]);
            checkub = 1;
        }
        return [Pk, Pm]; // Bridge is contained    
    }
    
    
    
    // Determine points to insert into CANDIDATES based on left or right of L
    // console.log(SMALL,LARGE,EQUAL);
    // console.log("hello");
    if (Pm.x <= L) {
        for (let pair of LARGE.concat(EQUAL)) {
            CANDIDATES.push(pair[1]); // Step 9
        }
        for (let pair of SMALL) {
            CANDIDATES.push(pair[0]); // Step 10
            CANDIDATES.push(pair[1]);
        }
        
    } else {
        for (let pair of SMALL.concat(EQUAL)) {
            CANDIDATES.push(pair[0]); // Step 9
        }
        for (let pair of LARGE) {
            CANDIDATES.push(pair[0]); // Step 10
            CANDIDATES.push(pair[1]);
        }
    }
    // console.log(CANDIDATES, "hello");
    // Recursively call UPPER_BRIDGE with updated CANDIDATES
    // console.log(CANDIDATES);
    if(checkub === 0){
        let ncandid = [];
        CANDIDATES.forEach(point => {
            ncandid.push(point);
        })
        states.push([6, [gpumax,gpumin,gplmax,gplmin], ga, ncandid]);
        checkub = 1;
    }
    // console.log(CANDIDATES.length);
    return UPPER_BRIDGE(CANDIDATES, L);
}

let checklh = 0;
function LOWER_HULL(pmin, pmax, T, hull_points) {
    // Step 1: Find the median of the x-coordinates
    let xCoordinates = T.map(point => point.x).sort((a, b) => a - b);
    let medianIndex = Math.floor(T.length / 2);
    let a = xCoordinates[medianIndex];

    
    
    // Step 2: Split T into Tleft and Tright
    let Tleft = [];
    let Tright = [];
    for (let i = 0; i < T.length; i++) {
        if (T[i].x < a) {
            Tleft.push(T[i]);
        } else {
            Tright.push(T[i]);
        }
    }
    
    if(checklh === 0){
        let ntleft = [];
        let ntright = [];
        Tleft.forEach(point => {
            ntleft.push(point);
        })
        Tright.forEach(point => {
            ntright.push(point);
        })
        states.push([11, [gpumax,gpumin,gplmax,gplmin], guhull, ga, ntleft, ntright]);
    }

    // Step 3: Compute lower bridge (Not implemented)
    let [pl, pr] = LOWER_BRIDGE(T, a, hull_points);
    // console.log(pmin,pmax);
    console.log([pl, pr], "this is bridge");
    if(lb === false){
        // states.push([pl,pr]);
        lb = true;
    }
    hull_points.add(pl);
    hull_points.add(pr);
    if(checklh === 0){
        states.push([16, [gpumax,gpumin,gplmax,gplmin], guhull, ga, [pl,pr]]);
    }

    // Step 4: Discard points within the convex quadrilateral
    // const quadrilateral = [pmin, pl, pr, pmax];
    // console.log(quadrilateral);
    
    let newTleft = [pl,pmin];
    let newTright = [pr,pmax];
    Tleft.forEach(point => { 
        if(!isPointToLeftOfLine(point, pmin, pl)){
            newTleft.push(point);
        }
    })

    Tright.forEach(point => { 
        if(!isPointToLeftOfLine(point, pr, pmax)){
            newTright.push(point);
        }
    })

    Tleft = newTleft;
    Tright = newTright;
    // console.log(Tleft,Tright, "after removing inside quad");
    // return;
    //Step 5: Recursively call LOWER-HULL on Tleft and Tright
    if(checklh === 0){
        let nntleft = [];
        let nntright = [];
        newTleft.forEach(point => {
            nntleft.push(point);
        })
        newTright.forEach(point => {
            nntright.push(point);
        })
        states.push([17,[gpumax,gpumin,gplmax,gplmin],guhull, ga, nntleft, nntright, [gpumin,pl], [gpumax, pr]]);
        states.push([18,[gpumax,gpumin,gplmax,gplmin],guhull, ga, nntleft, nntright, [gpumin,pl], [gpumax, pr]]);
        checklh = 1;
    }

    let lowerHullLeft = [];
    if(pmin !== pl){
        lowerHullLeft = LOWER_HULL(pmin, pl, Tleft, hull_points);
        // console.log("after first bridge");
    }
    
    let lowerHullRight = [];
    if(pmax !== pr){
        lowerHullRight = LOWER_HULL(pr, pmax, Tright, hull_points);
        // console.log("after first bridge");
    }

    // Step 6: Concatenate the lists and return
    return lowerHullLeft.concat(lowerHullRight);
}
let checklb = 0;
function LOWER_BRIDGE(S, L, hull_points) {
    let CANDIDATES = [];
    
    if (S.length === 2) {
        console.log("hello mister")
        if(S[0].x < S[1].x){
            return [S[0], S[1]]; // If there are only two points, return them
        }
        else{
            return [S[1], S[0]];
        }
    }

    if(S.length === 3){
        return threePointsLower(S);
    }

    // Pair up points into pairs
    let PAIRS = [];
    for (let i = 0; i < S.length-1; i += 2) {
        let pair = [S[i], S[i + 1]];
        PAIRS.push(pair);
    }
    //adding the last point
    if(S.length % 2 === 1){
        CANDIDATES.push(S[S.length-1]);
    }

    PAIRS.forEach(p => {
        if(p[0].x > p[1].x){
            let p1 = p[0];
            let p2 = p[1];
            p[0] = p2;
            p[1] = p1;
        }
    })

    if(checklb === 0){
        let nPairs = [];
        PAIRS.forEach(pair => {
            nPairs.push(pair);
        })
        states.push([12,[gpumax,gpumin,gplmax,gplmin],guhull,ga,nPairs]);
    }

    // Determine slopes and populate CANDIDATES
    let newPAIRS = [];
    for (let pair of PAIRS) {
        let [pi, pj] = pair;
        if (pi.x === pj.x) {
            if (pi.y < pj.y) {
                CANDIDATES.push(pi);
            } else {
                CANDIDATES.push(pj);
            }
        } else {
            let slope = (pi.y - pj.y) / (pi.x - pj.x);
            pair.slope = slope;
            newPAIRS.push(pair);
        }
    }

    PAIRS = newPAIRS;

    // Sort PAIRS by slopes
    PAIRS.sort((a, b) => a.slope - b.slope);

    // Find K, the median of slopes
    if(PAIRS.length === 0){
        return LOWER_BRIDGE(CANDIDATES, L, hull_points);
    }
    let K = PAIRS[Math.floor(PAIRS.length / 2)].slope;

    // Split PAIRS into SMALL, EQUAL, and LARGE based on slopes
    let SMALL = [];
    let EQUAL = [];
    let LARGE = [];
    for (let pair of PAIRS) {
        if (pair.slope < K) {
            SMALL.push(pair);
        } else if (pair.slope > K) {
            LARGE.push(pair);
        } else {
            EQUAL.push(pair);
        }
    }

    if(checklb === 0){
        let nlarge = [];
        let nsmall = [];
        let nequal = [];
        LARGE.forEach(pair => {
            nlarge.push(pair);
        })
        SMALL.forEach(pair => {
            nsmall.push(pair);
        })
        EQUAL.forEach(pair => {
            nequal.push(pair);
        })

        states.push([13,[gpumax,gpumin,gplmax,gplmin], guhull, ga, nlarge, nsmall, nequal]);
    }

    let MAX = [];
    let maxIntersection = Infinity;
    for (let point of S) {
        let c = point.y - K * point.x;
        if (c < maxIntersection) {
            maxIntersection = c;
            MAX = [point];
        } else if (c === maxIntersection) {
            MAX.push(point);
        }
    }

    // Find Pk with minimum x-coordinate
    let Pk = MAX.reduce((prev, curr) => (prev.x < curr.x ? prev : curr));

    // Find Pm with maximum x-coordinate
    let Pm = MAX.reduce((prev, curr) => (prev.x > curr.x ? prev : curr));

    if(checklb === 0){
        states.push([14,[gpumax,gpumin,gplmax,gplmin],guhull, ga, [Pk,Pm,K]]);
    }

    // Determine if bridge is contained
    if (Pk.x <= L && Pm.x > L) {
        if(checklb === 0){
            states.push([15,[gpumax,gpumin,gplmax,gplmin],guhull, ga,[Pk,Pm]]);
            checklb = 1;
        }
        return [Pk, Pm]; // Bridge is contained   
    }

    // Determine points to insert into CANDIDATES based on left or right of L
    if (Pm.x <= L) {
        for (let pair of SMALL.concat(EQUAL)) {
            CANDIDATES.push(pair[1]); // Step 9
        }
        for (let pair of LARGE) {
            CANDIDATES.push(pair[0]); // Step 10
            CANDIDATES.push(pair[1]);
        }
    } else {
        for (let pair of LARGE.concat(EQUAL)) {
            CANDIDATES.push(pair[0]); // Step 9
        }
        for (let pair of SMALL) {
            CANDIDATES.push(pair[0]); // Step 10
            CANDIDATES.push(pair[1]);
        }
    }

    // Recursively call LOWER_BRIDGE with updated CANDIDATES
    // console.log(CANDIDATES);
    if(checklb === 0){
        let ncandid = [];
        CANDIDATES.forEach(point => {
            ncandid.push(point);
        })
        states.push([15, [gpumax,gpumin,gplmax,gplmin],guhull, ga, ncandid]);
        checklb = 1;
    }
    return LOWER_BRIDGE(CANDIDATES, L, hull_points);
}

function threePointsLower(S){
    S.sort((a,b) => a.x - b.x);

    let A = S[0];
    let B = S[2];
    let P = S[1];
    if(!isPointToLeftOfLine(P, A, B)){
        if(P.x <= (A.x+B.x)/2){
            return [P,B];
        }
        else{
            return [A,P];
        }
    }
    else{
        return [A,B];
    }
}

function convexHullClockwise(points) {
    // Your convex hull generation logic here

    // Assume 'hullPoints' contains the points forming the convex hull
    // Replace this with your actual convex hull logic
    const hullPoints = [...points]; // Assuming points are already in hull order

    // Find the lowest point (leftmost in case of tie) to start the traversal
    let lowestPoint = hullPoints[0];
    for (let i = 1; i < hullPoints.length; i++) {
        if (hullPoints[i].y < lowestPoint.y || (hullPoints[i].y === lowestPoint.y && hullPoints[i].x < lowestPoint.x)) {
            lowestPoint = hullPoints[i];
        }
    }

    // Sort the points based on the angle from the lowest point
    hullPoints.sort((a, b) => {
        const angleA = Math.atan2(a.y - lowestPoint.y, a.x - lowestPoint.x);
        const angleB = Math.atan2(b.y - lowestPoint.y, b.x - lowestPoint.x);
        return angleA - angleB;
    });

    return hullPoints;
}

let ub = false;
let lb = false;
let states = [];
let gpumin = 0,gpumax = 0,gplmin = 0,gplmax = 0;
let guhull = [];
let ga = 0;
/***
 * @
 */
function convexHull(points) {
    states = [];
    guhull = [];
    ga = 0;
    checklb = 0;
    checklh = 0;
    checkub = 0;
    checkuh = 0;
    gpumin = 0;
    gpumax = 0;
    gplmin = 0;
    gplmax = 0;
    const hull_points = new Set();
    
    // Step 1: Find pmin and pmax
    let pmin = points.reduce((prev, curr) => (curr.x < prev.x ? curr : prev));
    let pmax = points.reduce((prev, curr) => (curr.x > prev.x ? curr : prev));
    // console.log(pmin, pmax);
    // Step 2: If there are multiple pmin or pmax, choose the one with the highest y-coordinate
    // console.log(pmin, pmax, "alert");
    let pumin = points.filter(p => p.x === pmin.x).reduce((prev, curr) => (curr.y > prev.y ? curr : prev));
    let pumax = points.filter(p => p.x === pmax.x).reduce((prev, curr) => (curr.y > prev.y ? curr : prev));
    let plmin = points.filter(p => p.x === pmin.x).reduce((prev, curr) => (curr.y < prev.y ? curr : prev));
    let plmax = points.filter(p => p.x === pmax.x).reduce((prev, curr) => (curr.y < prev.y ? curr : prev));
    // console.log(pumin, pumax, "hello");
    // let s1 = new Set([]);
    gpumin = pumin;
    gpumax = pumax;
    gplmin = plmin;
    gplmax = plmax;
    // s1.add(pumax,pumin,plmin,plmax);
    states.push([1,[pumax,pumin,plmax,plmin]]);
    //Step 3: Construct set T
    let T = [];
    T.push(pumin);
    T.push(pumax);
    points.forEach(p => { 
        if(p.x > pumin.x && p.x < pumax.x){
            T.push(p);
        }
    });
    // console.log(T);
    // Step 4: Compute the upper hull
    let upperHull = UPPER_HULL(pumin, pumax, T, hull_points);
    console.log("done with upperhull");
    console.log(upperHull);
    guhull = convexHullClockwise(hull_points);
    guhull.sort((a,b) => b.x - a.x);
    console.log(guhull.sort((a,b) => b.x - a.x));
    // console.log("hello");
    // console.log(convexHullClockwise(hull_points));
    states.push([10, [gpumax,gpumin,gplmax,gplmin], guhull]);
    // states.push(convexHullClockwise(hull_points)); earlier

    // Step 2: If there are multiple pmin or pmax, choose the one with the highest y-coordinate

    T = [];
    T.push(plmin);
    T.push(plmax);
    points.forEach(p => { 
        if(p.x > plmin.x && p.x < plmax.x){
            T.push(p);
        }
    });

    let lowerHull = LOWER_HULL(plmin, plmax, T, hull_points);
    console.log("done with lower hull");
    console.log(lowerHull);
    // states.push(convexHullClockwise(hull_points));
    let fhull = convexHullClockwise(hull_points);
    console.log(fhull);
    // console.log(fhull.sort((a,b) => b.x - a.x));
    states.push([19, [gpumax,gpumin,gplmax,gplmin], fhull]);
    if(pumin !== plmin){
        let edge = [pumin, plmin];
        console.log(edge);
        console.log("this is the connecting the bridge");
    }

    if(pumax !== plmax){
        let edge = [pumax, plmax];
        console.log(edge);
        console.log("this is the connecting the bridge");
    }
    console.log(states.length);
    console.log("done with code");
    console.log(states);

    
    return states;
}
// Run the main function
export default convexHull;
