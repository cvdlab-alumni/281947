/*
Exercise 2

A lake can be obtained by adding a colored parallelepiped (green-water) to a digital terrain model, in such a way that the height of the parallelepiped gets higher than the altitude
of the bottom-valley pattern. A suitable lake model should be added to the mountains defined by the previous exercise.

Fella Davide, 281947 (esercizio 2)

*/

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


//Esercizio 2
function checkPairs(a,b){
	a0 = a[0];
	a1 = a[1];

	b0 = b[0];
	b1 = b[1];

	return (a0===b0 && a1===b1);
}

//Get coor z by the x and y
function getZByXY(xy){
	for(i=0; i<this.pointOnMap.length; i++)
		{
			obj = this.pointOnMap[i];
			if(checkPairs(obj.pxy, xy))
				{
				return obj.pz;
				}
		}
}

function translates(value, obj){
	obj = T([0,1,2])([value[0],value[1],value[2]])(obj)
	return obj;
}


function makeLake(){
	//l = COLOR(lakeColor)(CUBOID([4,2,0.01]));
	l =  COLOR(lakeColor)(DISK(2)(50));
	return l;
}

lake = makeLake();
z = getZByXY([8,4]);
lake = translates([8,4,z],lake);

terrain = STRUCT([lake,terrain])
DRAW(terrain)

