console.log("hello");
var svg = document.getElementById("hall");
var xmax = svg.getAttribute("width");
var ymax = svg.getAttribute("height");
var hallsOfBalls = [];
var interval;

var ball = function(xcor, ycor, r, xv, yv){
    var radius = r;
    var x = xcor;
    var y = ycor;
    console.log(y);
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
	if (nextx - r <= 0 || nextx + r >= xmax){
	    xvel *= -1;
	}
	if (nexty - r <= 0 || nexty + r >= ymax){
	    yvel *= -1;
	}
	x += xvel;
	y += yvel;
	nextx = x + xvel;
	nexty = y + yvel;
	c.setAttribute("cx", x);
	c.setAttribute("cy", y);	
    };
    
    var remove = function(){
	svg.removeChild(c);
    }
    
    var randomize = function(){
	r=getRadius()
	c.setAttribute("cx",Math.floor(Math.random() * (xmax - 2*r)) + r);
	c.setAttribute("cy",Math.floor(Math.random() * (ymax - 2*r)) + r);
    }
    var collision =function(){
	setXVel(xvel*-1);
	setYVel(yvel*-1);
    }
    return {
	getX: getX,
	getY: getY,
	getR: getRadius,
	move: move,
	remove: remove,
	setXVel: setXVel,
	setYVel: setYVel,
	randomize: randomize,
	collision: collision
    };
}

//for (var i = 0; i < 5; i ++){
var createBalls = function(){
    while(hallsOfBalls.length<5){
	var r = Math.floor(Math.random() * 50) + 5;
	var x = Math.floor(Math.random() * (xmax - 2*r)) + r;
	var y = Math.floor(Math.random() * (ymax - 2*r)) + r;
	var rx = Math.floor(Math.random() * 50);
	var ry = Math.floor(Math.random() * 50);
	var xv = Math.floor(Math.random() * 5) + 1;
	var yv = Math.floor(Math.random() * 5) + 1;
	if (rx % 2 == 0){
	    xv *= -1;
	}
	if (ry % 2 == 0){
	    yv *= -1;
	}
	//hallsOfBalls[i] = ball(x, y, r, xv, yv);
	hallsOfBalls.push(ball(x,y,r,xv,yv));
    }
}
createBalls();
var overLap = function(){
    for (var i = 0; i < hallsOfBalls.length; i ++){
	ball=hallsOfBalls[i]
	xlowerBound = ball.getX()-ball.getR()
	xupperBound = ball.getX()+ball.getR()
	ylowerBound = ball.getY()-ball.getR()
	yupperBound = ball.getY()+ball.getR()
	for (var j = 0; j < hallsOfBalls.length;j++){
	    if (i==j && i==hallsOfBalls.length){
	    	break;
	    }
	    else if (j==i){
		continue;
	     }
	    ball2=hallsOfBalls[j];
	    ball2x=ball2.getX();
	    ball2y=ball2.getY();
	    if (ball2x > xlowerBound && ball2x < xupperBound && ball2y > ylowerBound && ball2y < yupperBound){
		ball2.randomize()
	    }
	}
    }
}
overLap();

var collide = function(ball,ball2){
    xlowerBound = ball.getX()-ball.getR();
    xupperBound = ball.getX()+ball.getR();
    ylowerBound = ball.getY()-ball.getR();
    yupperBound = ball.getY()+ball.getR();
    edge1=[xlowerBound,xupperBound,ylowerBound,yupperBound];
    xlowerBound2 = ball2.getX()-ball2.getR();
    xupperBound2 = ball2.getX()+ball2.getR();
    ylowerBound2 = ball2.getY()-ball2.getR();
    yupperBound2 = ball2.getY()+ball2.getR();
    edge2=[xlowerBound2,xupperBound2,ylowerBound2,xupperBound2];
    for(var i =0; i<edge1.length;i++){
	for(var j=0; j<edge2.length;j++){
	    if (edge1[i]==edge2[j]){
		ball.collision();
		ball2.collision();
	    }
	}
    }
}
var goo = function(){
    var animate = function(){
        for (var i = 0 ; i < hallsOfBalls.length ; i++){
            hallsOfBalls[i].move();
	    //ball=hallsOfBalls[i]
	    //ball.move();
/*
	    for (var j = 0; j < hallsOfBalls.length;j++){
		if (i==j && i==hallsOfBalls.length){
	    	    break;
		}
		else if (j==i){
		    continue;
		}
		ball2=hallsOfBalls[j];
		collide(ball,ball2);
	    }*/
	}
    }
    interval = window.setInterval(animate, 25);
    console.log("going");
}
var stopp = function(){
    window.clearInterval(interval);
    console.log("stopping");
}

var go = document.getElementById("go");
go.addEventListener("click", goo);
var stop = document.getElementById("stop");
stop.addEventListener("click", stopp);

/* not really sure how to do the collision
tried doing this in animation then realized wouldn't work
            xlowerBound = ball.getX()-ball.getR()
	    xupperBound = ball.getX()+ball.getR()
	    ylowerBound = ball.getY()-ball.getR()
	    yupperBound = ball.getY()+ball.getR()
	    edge1=[xlowerBound,xupperBound,ylowerBound,yupperBound]
	    for (var j = 0; j < hallsOfBalls.length;j++){
		if (i==j && i==hallsOfBalls.length){
	    	    break;
		}
		else if (j==i){
		    continue;
		}
		ball2=hallsOfBalls[j];
		2xlowerBound = ball2.getX()-ball2.getR()
		2xupperBound = ball2.getX()+ball2.getR()
		2ylowerBound = ball2.getY()-ball2.getR()
		2yupperBound = ball2.getY()+ball2.getR()
		edge2=[2xlowerBound,2xupperBound,2ylowerBound,2xupperBound]
		if( ){
		    ball2.randomize()
		}
*/


