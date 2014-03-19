//Gio Ponti's coffee table
//Variabili
var dom1D = INTERVALS(1)(32);
var dom2D = DOMAIN([[0,1],[0,1]])([30,30]);
var coffeeTableModel; 
var diameterTable = 10;
var depthBoard = 0.15;
var extrusionRadius = 1;
var widthLines = 0.1;
var lengthLines = Math.cos(PI/4)* (diameterTable/2) * (0.985);
var heightLeg = extrusionRadius * 3;
var radiusLegSup = widthLines;
var heightLegInf = heightLeg * 0.5;
var radiusLegInf = radiusLegSup * 0.5;
var diskRadius = radiusLegSup;
var heightDisk = 0.03;

/* Colori */  
var redd =[1,0.5,0];
var red = [1,0,0]; 
var blue = [0,0,1]; 
var green = [0,1,0]; 
var yellow = [1,1,0]; 
var black = [0.3,0.3,0.3]; 
var white = [1,1,1]; 
var dark_grey = [41/256,41/256,41/256]; 
var gold = [205/256,173/256,0]; 
var glass_color = [185/256,211/256,238/256,0.6]; 

//funzioni
function arc (alpha, r, R) {
	var domain = DOMAIN([[0,alpha],[r,R]])([100,1]);	
	var mapping = function (v) {
		var a = v[0];
		var r = v[1];
		return [r*COS(a), r*SIN(a)];
	}
	var model = MAP(mapping)(domain);
	return model;
} 

var CYLINDER = function(r,h){
	 function C0(l){
	  var s = CYL_SURFACE([r,h])(l);
	  var b1 = DISK(r)(l);
	  var b2 = T([2])([h])(b1);
	  return STRUCT([s,b1,b2]);
	 }
	 return C0;
}

function bezierMappata_2D(functions){
	var x = BEZIER(S1)(functions)
	return MAP(x)(dom2D)
}

function createLineBezier(length){
	var controlPntLowerRight = [[0,0,0],[length,0,0]];
	var controlPntTopRight = [[0,0,extrusionRadius],[length,0,extrusionRadius]];
	var controlPntLowerLeft = [[0,widthLines,0],[length,widthLines,0]];
	var controlPntUpLeft = [[0,widthLines,extrusionRadius],[length,widthLines,extrusionRadius]];

	var lowerSideRightBezier =  BEZIER(S0)(controlPntLowerRight);
	var topSideRightBezier   =  BEZIER(S0)(controlPntTopRight);
	var lowerSideLeftBezier  =  BEZIER(S0)(controlPntLowerLeft);
	var topSideLeftBezier    =  BEZIER(S0)(controlPntUpLeft);

	cDx = bezierMappata_2D([lowerSideRightBezier,topSideRightBezier]);
	cSx = bezierMappata_2D([lowerSideLeftBezier,topSideLeftBezier]);
	cLower = bezierMappata_2D([lowerSideRightBezier, lowerSideLeftBezier]);
	cTop = bezierMappata_2D([topSideRightBezier, topSideLeftBezier]);

	return 	STRUCT([cDx, cSx, cLower, cTop]);
}

function crateLine(length,dx,dy,dz){
	return T([0,1,2])([dx,dy,dz])(createLineBezier(length));
}

function createIntersections(){
	var spacingLines = diameterTable/4;
	//Lines 1-4
	var lengthLines = Math.cos(PI/4)* (diameterTable/2) * (0.985);
	//Lines 2-3
	var lengthLines2 = lengthLines*2.725;
	var correctionLine2 = 0;
	var line1_x = crateLine(lengthLines*2, -lengthLines,lengthLines, 0); //barra corta superiore
	var line1_y = R([0,1])([PI/2])(crateLine(lengthLines*2, -lengthLines, -lengthLines, 0)); //barra corta a destra
	
	var line2_x = crateLine(lengthLines2, -lengthLines2/2, -(spacingLines/2), 0); //barra lunga inferiore
	var line2_y = R([0,1])([PI/2])(crateLine(lengthLines2, -lengthLines2/2, -(spacingLines/2), 0)); //barra lunga destra
	
	var line3_x = crateLine(lengthLines2, -lengthLines2/2, spacingLines/2, 0); //barra lunga superiore
	var line3_y = R([0,1])([PI/2])(crateLine(lengthLines2,  -lengthLines2/2, spacingLines/2, 0)); //barra lunga sinistra
	
	var line4_x = crateLine(lengthLines*2, -lengthLines, -lengthLines, 0); //barra corta inferiore
 	var line4_y = R([0,1])([PI/2])(crateLine(lengthLines*2, -lengthLines,lengthLines, 0)); //barra corta sinistra

 	var linesX = STRUCT([line1_x,line2_x,line3_x,line4_x]);
 	var linesY = STRUCT([line1_y,line2_y,line3_y,line4_y]);

	return STRUCT([linesX,linesY]);
}

function createCircumference(){
	return EXTRUDE([extrusionRadius])(arc(2*PI, (diameterTable/2)-depthBoard, diameterTable/2));
}

function createSingleLeg(){
	legSup = CYLINDER(radiusLegSup,heightLeg)([24, 1]);
	legInf = T([2])([heightLeg])(CYLINDER(radiusLegInf, heightLegInf)([24, 1]));
	disco =  T([2])([heightLeg+heightLegInf])(CYLINDER(diskRadius,heightDisk)([24, 1]));
	leg = STRUCT([legSup,legInf,disco]);
	return leg;
}

function createLegs(){
	lengthLines = Math.cos(PI/4)* (diameterTable/2);
	translation_x =  lengthLines*0.965;
	translation_y = lengthLines*0.992;

	leg1 = T([0,1])([  translation_x,  translation_y])(createSingleLeg());
	leg2 = T([0,1])([ -translation_x, -translation_y])(createSingleLeg());
	leg3 = T([0,1])([  translation_x, -translation_y])(createSingleLeg());
	leg4 = T([0,1])([ -translation_x,  translation_y])(createSingleLeg()); 

	return STRUCT([leg1,leg2,leg3,leg4]);
}

function createTableCofee(){
	circumference = createCircumference();
	intersections =  createIntersections();
	legs = createLegs();
	coffeeTableModel = T([2])([-(heightLeg+heightLegInf+heightDisk)])(STRUCT([circumference,intersections,legs]));
}

function drawModel(){
	DRAW(coffeeTableModel);
}

function hideModel(){
	HIDE(coffeeTableModel);
}

createTableCofee();
drawModel();