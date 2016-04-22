console.log("hello");
var xmax = 500;
var ymax = 500;


var ball = function(xcor, ycor, r, xv, yv){
    var radius = r;
    var x = xcor;
    var y = ycor;
    var xvel = xv;
    var yvel = yv;
    var nextx = x + xvel;
    var nexty = y + yvel;
    
    var s = document.getElementById("hall");
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", r);
    c.setAttribute("fill", "red");
    c.setAttribute("stroke", "black");
    s.appendChild(c);
    
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
};
