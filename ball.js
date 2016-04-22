console.log("hello");
var svg = document.getElementById("hall");
var xmax = svg.getAttribute("width");
var ymax = svg.getAttribute("height");
var hallsOfBalls = []

var ball = function(xcor, ycor, r, xv, yv){
    var radius = r;
    var x = xcor;
    var y = ycor;
    var xvel = xv;
    var yvel = yv;
    var nextx = x + xvel;
    var nexty = y + yvel;

    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", r);
    c.setAttribute("fill", "red");
    c.setAttribute("stroke", "black");
    svg.appendChild(c);
    
    var getX = function(){
        return x;
    };

    var getY = function(){
        return y;
    };
    var getRadius = function(){
        return r;
    };
    
    var setXVel = function(vel){
	xvel = vel;
    };
    var setYVel = function(vel){
	yvel = vel;
    };
    
    var move = function(){
	if (nextx - 10 <= 0 || nextx + 10 >= xmax){
	    xvel *= -1;
	}
	if (nexty -10 <= 0 || nexty + 10 >= ymax){
	    yvel *= -1;
	}
	x += xvel;
	y += yvel;
	nextx = x + xvel;
	nexty = y + yvel;
	c.setAttribute("cx", x);
	c.setAttribute("cy", y);
	console.log(nextx);	
    };

    return {
	getX: getX,
	getY: getY,
	getR: getRadius,
	move: move,
	setXVel: setXVel,
	setYVel: setYVel
    };
}

for (var i = 0; i < 5; i ++){
    var r = Math.floor(Math.random() * 50) + 5;
    var x = Math.floor(Math.random() * (xmax - 2*r)) + r;
    var y = Math.floor(Math.random() * (ymax - 2*r)) + r;
    var rx = Math.floor(Math.random() * 50);
    var ry = Math.floor(Math.random() * 50);
    var xv = 1;
    var yv;
    if (rx % 2 == 0){
	xv *= -1;
    }
    if (ry % 2 == 0){
	yv *= -1;
    }
    hallsOfBalls[i] = ball(x, y, r, xv, yv);
}

var goo = function(){
    
}
var stopp = function(){
    
}

var go = document.getElementById("go");
go.addEventListener("click", goo);
var stop = document.getElementById("stop");
stop.addEventListener("click", stopp);


