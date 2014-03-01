//Gio Ponti's coffee table

//Variabili
var dom1D = INTERVALS(1)(32);
var dom2D = DOMAIN([[0,1],[0,1]])([30,30]);

var coffeeTableModel; 

var diametroTavolino = 10;
var spessoreBordo = 0.15;
var estrusioneRaggio = 1;

var larghezzaLinee = 0.1;
var lungh_linea = Math.cos(PI/4)* (diametroTavolino/2) * (0.985);

var altezzaGambaSup = estrusioneRaggio * 3;
var raggioGambaSup = larghezzaLinee;
var altezzaGambaInf = altezzaGambaSup * 0.5;
var raggioGambaInf = raggioGambaSup * 0.5;
var raggioDisco = raggioGambaSup;
var altezzaDisco = 0.03;

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

function createLineBezier(lunghezza){
	var pntControlloLatoInfDx = [[0,0,0],[lunghezza,0,0]];
	var pntControlloLatoSupDx = [[0,0,estrusioneRaggio],[lunghezza,0,estrusioneRaggio]];
	var pntControlloLatoInfSx = [[0,larghezzaLinee,0],[lunghezza,larghezzaLinee,0]];
	var pntControlloLatoSupSx = [[0,larghezzaLinee,estrusioneRaggio],[lunghezza,larghezzaLinee,estrusioneRaggio]];

	var latoInfBezDx =  BEZIER(S0)(pntControlloLatoInfDx);
	var latoSupBezDx =  BEZIER(S0)(pntControlloLatoSupDx);
	var latoInfBezSx =  BEZIER(S0)(pntControlloLatoInfSx);
	var latoSupBezSx =  BEZIER(S0)(pntControlloLatoSupSx);

	cDx = bezierMappata_2D([latoInfBezDx,latoSupBezDx]);
	cSx = bezierMappata_2D([latoInfBezSx,latoSupBezSx]);
	cInf = bezierMappata_2D([latoInfBezDx, latoInfBezSx]);
	cSup = bezierMappata_2D([latoSupBezDx, latoSupBezSx]);

	curvaFinale = STRUCT([cDx, cSx, cInf, cSup]);

	return curvaFinale;
}

function crateLine(lunghezza,dx,dy,dz){
	return T([0,1,2])([dx,dy,dz])(createLineBezier(lunghezza));
}

function createIntersections(){
	var spaziaturaTraLinee = diametroTavolino/4;
	
	//Lines 1-4
	var lungh_linea = Math.cos(PI/4)* (diametroTavolino/2) * (0.985);

	//Lines 2-3
	var lungh_linea2 = lungh_linea*2.725;
	var correzione_linea2 = 0;

	var line1_x = crateLine(lungh_linea*2, -lungh_linea, lungh_linea, 0); //barra corta superiore
	var line1_y = R([0,1])([PI/2])(crateLine(lungh_linea*2,  -lungh_linea, -lungh_linea, 0)); //barra corta a destra
 
	var line2_x = crateLine(lungh_linea2, -lungh_linea2/2, -(spaziaturaTraLinee/2), 0); //barra lunga inferiore
	var line2_y = R([0,1])([PI/2])(crateLine(lungh_linea2,  -lungh_linea2/2, -(spaziaturaTraLinee/2), 0)); //barra lunga destra

	var line3_x = crateLine(lungh_linea2, -lungh_linea2/2, spaziaturaTraLinee/2, 0); //barra lunga superiore
	var line3_y = R([0,1])([PI/2])(crateLine(lungh_linea2,  -lungh_linea2/2, spaziaturaTraLinee/2, 0)); //barra lunga sinistra

	var line4_x = crateLine(lungh_linea*2, -lungh_linea, -lungh_linea, 0); //barra corta inferiore
 	var line4_y = R([0,1])([PI/2])(crateLine(lungh_linea*2, -lungh_linea, lungh_linea, 0)); //barra corta sinistra

 	var linesX = STRUCT([line1_x,line2_x,line3_x,line4_x]);
 	var linesY = STRUCT([line1_y,line2_y,line3_y,line4_y]);

	intersection = STRUCT([linesX,linesY]);
	return intersection;
}

function createCircumference(){
	circ = EXTRUDE([estrusioneRaggio])(arc(2*PI, (diametroTavolino/2)-spessoreBordo, diametroTavolino/2));
	return circ;
}

function createSingleLeg(){
	legSup = CYLINDER(raggioGambaSup, altezzaGambaSup)([24, 1]);
	legInf = T([2])([altezzaGambaSup])(CYLINDER(raggioGambaInf, altezzaGambaInf)([24, 1]));
	disco =  T([2])([altezzaGambaSup+altezzaGambaInf])(CYLINDER(raggioDisco, altezzaDisco)([24, 1]));
	leg = STRUCT([legSup,legInf,disco]);
	return leg;

}

function createLegs(){
	lungh_linea = Math.cos(PI/4)* (diametroTavolino/2);
	tralsazione_x =  lungh_linea*0.965;
	tralsazione_y = lungh_linea*0.992;

	leg1 = T([0,1])([  tralsazione_x,  tralsazione_y])(createSingleLeg());
	leg2 = T([0,1])([ -tralsazione_x, -tralsazione_y])(createSingleLeg());
	leg3 = T([0,1])([  tralsazione_x, -tralsazione_y])(createSingleLeg());
	leg4 = T([0,1])([ -tralsazione_x,  tralsazione_y])(createSingleLeg()); 

	legs = STRUCT([leg1,leg2,leg3,leg4]);
	return legs;
}

function createTableCofee(){
	circumference = createCircumference();
	intersections =  createIntersections();
	legs = createLegs();

	coffeeTableModel = T([2])([-(altezzaGambaSup+altezzaGambaInf+altezzaDisco)])(STRUCT([circumference,intersections,legs]));
}

function drawModel(){

	DRAW(coffeeTableModel);
}

function hideModel(){
	HIDE(coffeeTableModel);
}


//richiamo delle funzioni
createTableCofee();
drawModel();

