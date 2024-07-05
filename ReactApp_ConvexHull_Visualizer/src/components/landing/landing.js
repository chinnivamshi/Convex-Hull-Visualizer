import React from "react";
import "./landing.css";


const Landing = () => {
    function lines() {
        let sizeW = Math.random() * 12;
        let duration = Math.random() * 3;
        let screenWidth = window.screen.width;
        let e = document.createElement('div')
        e.setAttribute('class', 'circle');
        document.body.appendChild(e);
        e.style.width = 2 + sizeW + 'px';
        e.style.left = Math.random() * screenWidth + 'px';
        e.style.animationDuration = 2 + duration + 's';
    
        setTimeout(function () {
            document.body.removeChild(e)
        }, 5000);
    }
    
    setInterval(function () {
        lines();
    }, 275)

    document.body.style.backgroundColor = 'white';
    
    return (
        <div>
            <div class="centered-div">
                <h1>Convex Hull Algorithm visualisation</h1>
            </div>
            <div class="flex-container" >
                <a href="/kpm">Kirk Patrick Seidel</a>
                <a href="comparison">Comparison</a>
                <a href="/march">Jarvis March</a>
                <a href="/applications">Applications</a>
            </div>
        </div>
    );
};

export default Landing;
