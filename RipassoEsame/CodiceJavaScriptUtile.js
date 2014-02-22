  var dom1D = INTERVALS(1)(32)
  var dom2D = DOMAIN([[0,1],[0,1]])([30,30])


// Funzione cerchio
// var cerchio = Circum(0,2)
var Circum = function(h, r){
	var Circum0 = function(v){
		return [r*COS(v[0]), r*SIN(v[0]), h];
	}
	return Circum0;
}
 
function bezierMappata_2D(functions){
    var x = BEZIER(S1)(functions)
    return MAP(x)(dom2D)
  }



//Funzione cilindro
// var CYLINDER(0.13, 0.13)([24, 1])
var CYLINDER = function(r,h){
  function C0(l){
  var s = CYL_SURFACE([r,h])(l);
  var b1 = DISK(r)(l);
  var b2 = T([2])([h])(b1);
  return STRUCT([s,b1,b2]);
  }
  return C0;
}

//Funzione che crea un disco bucato, ho due raggi, uno interno, uno esterno. 
// var piano_superiore_struct = EXTRUDE([0.2])(arc(2*PI, 0, 6));
function arc (alpha, r, R) {
	var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
	
	var mapping = function (v) {
		var a = v[0];
		var r = v[1];

		return [r*COS(a), r*SIN(a)];
	}

	var model = MAP(mapping)(domain);
	return model;
} 

//Funzione utile in caso dovessi disegnare profili alari. 
function generateKnot(controlPoints){
  lun = controlPoints.length + 2 + 1;
  var nodeSeq = []
  nodeSeq[0] = 0;
  nodeSeq[1] = 0;
  nodeSeq[2] = 0;
  for (i = 3; i <= lun - 4 ; i++) {
    nodeSeq[i] = i-2;
  };
  nodeSeq[lun-1] = i-2
  nodeSeq[lun-2] = i-2
  nodeSeq[lun-3] = i-2
  return nodeSeq
}

var domain = DOMAIN([[0,1],[0,2*PI]])([20,20]);
var points11= [[0,0,0],[0,1,0],[3,1,0],[6,1,0],[6,0,0]]
var knots11 = generateKnot(points11)
var nubs11 = NUBS(S0)(2)(knots11)(points11); // Fin qui faccio solo la linea
var curve11 = MAP(nubs11)(domain);
var sur11 = BEZIER(S1)([nubs11,[3,0,0]]) //con questa riempio la superfice
var surface11 = MAP(sur11)(dom2D)

	
//Cono con la ROTATIONAL_SURFACE 
//La larghezza del cono dipende dalla dimensione del dominio1!

var profile = BEZIER(S0)([[0,0,0],[3,0,3],[5,0,5],[7,0,7]]);
var mapping = ROTATIONAL_SURFACE(profile);
var surface = MAP(mapping)(domain);
//DRAW(surface);


//Creo settore, alfa è la lunghezza
function annulus_sector (alpha, r, R) {
  var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}

//Curva di hermite
function curveHermite(controlPoints){
    var domainCurve=INTERVALS(1)(12);
    var curva = CUBIC_HERMITE(S0)(controlPoints)
    return MAP(curva)(domainCurve)
  
}
  
//Trianolo - no EXTRUDE
var domTRI = TRIANGLE_DOMAIN(32, [[1,0,0],[1,1,1],[0,0,1]]);
domTRI = EXTRUDE([3])(domTRI);
//DRAW(domTRI);

var points = [[0,0,0],[0,1,0],[1,0,0],[0,-1,0],[-1,0,0]];
var triStrip = TRIANGLE_FAN(points);
triStrip = EXTRUDE([3])(triStrip);
//DRAW(triStrip);

function creaTriangoloIsoscele2DBez(lato){
  var pntControlloLato1 = [[-lato,0,0],[lato,0,0]];
  lato1Bez =  BEZIER(S0)(pntControlloLato1);

  var pntControlloLato2 = [[lato,0,0],[0,lato,0]];
  lato2Bez = BEZIER(S0)(pntControlloLato2);

  var pntControlloLato3 = [[-lato,0,0],[0,lato,0]];
  lato3Bez = BEZIER(S0)(pntControlloLato3);

  c1 = bezierMappata_2D([lato2Bez,lato1Bez,lato3Bez]);
  return c1;
}

function creaTriangoloIsoscele3DBez(lato,profondita){
  lato = 1;
  profondita=3;

  //primo triangolo
  var pntControlloLato1 = [[-lato,0,0],[lato,0,0]];
  lato1Bez =  BEZIER(S0)(pntControlloLato1);

  var pntControlloLato2 = [[lato,0,0],[0,lato,0]];
  lato2Bez = BEZIER(S0)(pntControlloLato2);

  var pntControlloLato3 = [[-lato,0,0],[0,lato,0]];
  lato3Bez = BEZIER(S0)(pntControlloLato3);

  // secondo triangolo
  var pntControlloLato4 = [[-lato,0,profondita],[lato,0,profondita]];
  lato4Bez =  BEZIER(S0)(pntControlloLato4);

  var pntControlloLato5 = [[lato,0,profondita],[0,lato,profondita]];
  lato5Bez = BEZIER(S0)(pntControlloLato5);

  var pntControlloLato6 = [[-lato,0,profondita],[0,lato,profondita]];
  lato6Bez = BEZIER(S0)(pntControlloLato6);

  c1 = bezierMappata_2D([lato1Bez,lato2Bez,lato3Bez]);
  c2 = bezierMappata_2D([lato4Bez,lato5Bez,lato6Bez]);
  c3 = bezierMappata_2D([lato1Bez,lato4Bez]);
  c4 = bezierMappata_2D([lato2Bez,lato5Bez]);
  c5 = bezierMappata_2D([lato3Bez,lato6Bez]);

  curvaFinale = STRUCT([c1,c2,c3,c4,c5]);
  return curvaFinale;
}