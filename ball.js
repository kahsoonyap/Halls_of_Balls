console.log("hello");

var ball = function(x, y, r){
    var radius = r;
    var xcor = x;
    var ycor = y;
    var xspd = 0;
    var yspd = 0;
    
    var s = document.getElementById("hall");
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx", xcor);
    c.setAttribute("cy", ycor);
    c.setAttribute("r", r);
    c.setAttribute("fill", "red");
    c.setAttribute("stroke", "black");
    s.appendChild(c);
    
    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };

    var getRadius = function() {
        return r;
    };

    return {
	getX: getX,
	getY: getY,
	getR: getRadius
    }
}
