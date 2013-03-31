/*
Write a constructor function Point2D
that create a 2D point given its x and y coordinates.
*/
function Point2D(x, y){
	this.x = x;
	this.y = y;
	this.getX = function(){return this.x;}
	this.getY = function(){return this.y;}

}


/*Write a contructor function Edge
that create an edge given its two vertices (i.e. two points).*/
function Edge(point2DA, point2DB){
	this.pointA = point2DA;
	this.pointB = point2DB;
	this.getPointA = function(){return this.pointA;}
	this.getPointB = function(){return this.pointB;}
}

/*Write a method length for Edge
that compute the length of the edge.*/
function lengthEdge(edge){
	var lengthEdge;

	var x1 = edge.getPointA().getX();
	var x2 = edge.getPointB().getX();

	var y1 = edge.getPointA().getY();
	var y2 = edge.getPointB().getY();

	lengthEdge = Math.sqrt((Math.pow((x1-x2),2) + Math.pow((y1-y2),2)),2);

	return lengthEdge;
}

/*Write a constructor function Trinagle
that create a triangle given its three edges.*/
function Triangle(edgeA, edgeB, edgeC){
	this.edgeA = edgeA;
	this.edgeB = edgeB;
	this.edgeC = edgeC;

	this.getEdgeA = function(){return this.edgeA;} 
	this.getEdgeB = function(){return this.edgeB;} 
	this.getEdgeC = function(){return this.edgeC;} 
}



/*
Write a method perimeter for Triangle
that compute the perimeter of the triangle.
*/
function Perimeter(triangle){
	var trianglePerimeter;

	var lengthEdgeA = lengthEdge(triangle.getEdgeA());
	var lengthEdgeB = lengthEdge(triangle.getEdgeB());
	var lengthEdgeC = lengthEdge(triangle.getEdgeC());

	trianglePerimeter = lengthEdgeA + lengthEdgeB + lengthEdgeC;

	return trianglePerimeter;

}


/*
var p1 = new Point2D(1,1);
var p2 = new Point2D(2,2);
var p3 = new Point2D(3,3);

var edgeA = new Edge(p1,p2);
var edgeB = new Edge(p2,p3);
var edgeC = new Edge(p3,p1);

var tri = new Triangle(edgeA, edgeB, edgeC);

var per = Perimeter(tri);

*/