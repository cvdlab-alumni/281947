/**
A digital terrain model (DTM) is normally defined as a map that associates the vertices of a simplicial decomposition of a 2D rectangle (corresponding to a geographical map)
with three coordinate functions x(u,v), y(u,v), z(u,v), where x(u,v) and y(u,v) are the selectors of the first and second coordinate of the vertices, and z(u,v) provides the 
height (altitude) of vertices. This one can be obtained by adding or subtracting a (relatively small) random number to the altitude values. HINT: To provide the initial values 
of altitude it is recommended to use either some mathematical function of two variables, or a surface generated from a few control points. The random correction of altitude must
 obviously be executed in a second computing stage.

 Produce a model of mountainous terrain using the approach described above.	*/

// Fella davide - 281947 


//Esercizio 1
 var TerrainColor = [205/255,133/255,63/255];
 var lakeColor = [0/255,0/255,128/255];
 var pointOnMap = new Array();


function getZ (v) {
	return Math.floor((Math.random()*10))*0.04; //normalizzato, altrimenti vengono picchi troppo alti e distanziati
}

function addPoint(v){
	this.pointOnMap.push(v);
}

var mapping = function (v) { 
	x = v[0];
	y = v[1];
	z = getZ();

	var point = {pxy:[x,y], pz:z}
	addPoint(point);

	return [x,y,z]
};

var dom = PROD1x1([INTERVALS(20)(50),INTERVALS(20)(50),INTERVALS(20)(50)])
var terrain = COLOR(TerrainColor)(MAP(mapping)(dom));

DRAW(terrain)

