//joy - Zanotta

var joyModel;
var dom1D = INTERVALS(1)(32);
var dom2D = DOMAIN([[0,1],[0,1]])([30,30]);

var raggioAsta = 0.5;
var altezzaAsta = 24;

var spessoreGradini = 0.5;
var profonditaPiano = 5;
var lunghezzaPrimoGradino = 12;
var trasla_x_scaffale = -1; //correzione asse, centro nello spazio
var trasla_y_scaffale = -1;

var altezzaPrimoScaffale = 4;

/* Colori */  
var black = [0.3,0.3,0.3];
var redd =[1,0.5,0]; 

var CYLINDER = function(r,h){
 function C0(l){
  var s = CYL_SURFACE([r,h])(l);
  var b1 = DISK(r)(l);
  var b2 = T([2])([h])(b1);
  return STRUCT([s,b1,b2]);
  }
 return C0;
}

function creaPrimoScaffale(lunghezza_x, altezza_y){
	piano = T([2])([-altezza_y])(CUBOID([profonditaPiano, lunghezza_x , spessoreGradini]));
	Sx = T([1,2])([lunghezza_x,-altezza_y])(CUBOID([profonditaPiano, spessoreGradini, altezza_y]));
	Dx = T([2])([-altezza_y])(CUBOID([profonditaPiano, spessoreGradini, altezza_y]));
	return STRUCT([Sx,Dx, piano]);
}

function creaScaffale(lunghezza_x, altezza_y){
	piano = T([2])([-altezza_y])(CUBOID([profonditaPiano, lunghezza_x , spessoreGradini]));
	Sx = T([1,2])([lunghezza_x,-altezza_y])(CUBOID([profonditaPiano, spessoreGradini, altezza_y]));
	return STRUCT([Sx,piano]);
}

function creaAsta(){
	return COLOR(black)(T([2])([-altezzaPrimoScaffale])(CYLINDER(raggioAsta, altezzaAsta)([24, 1])));
	}

function creaScaffaliAlternati(){
	var spaziaturagradini = 1;
 	g1 = T([0,1])([trasla_x_scaffale,trasla_y_scaffale])(creaPrimoScaffale(lunghezzaPrimoGradino, altezzaPrimoScaffale));
 	g2 = R([0,1])([PI/2])(T([0,1])([trasla_x_scaffale,trasla_y_scaffale])(creaScaffale(lunghezzaPrimoGradino+spaziaturagradini, altezzaPrimoScaffale*1.9)));
 	g3 = R([0,1])([PI/2])(T([0,1])([trasla_x_scaffale,trasla_y_scaffale])(creaScaffale(lunghezzaPrimoGradino+spaziaturagradini*2, altezzaPrimoScaffale*3)));
 	g4 = T([0,1])([trasla_x_scaffale,trasla_y_scaffale])(creaScaffale(lunghezzaPrimoGradino+spaziaturagradini*3, altezzaPrimoScaffale*4));
	g5 = T([0,1])([trasla_x_scaffale,trasla_y_scaffale])(creaScaffale(lunghezzaPrimoGradino+spaziaturagradini*4, altezzaPrimoScaffale*5));
	g6 = R([0,1])([PI/2])(T([0,1])([trasla_x_scaffale,trasla_y_scaffale])(creaScaffale(lunghezzaPrimoGradino+spaziaturagradini*5, altezzaPrimoScaffale*6)));
	g7 = R([0,1])([PI/2])(T([0,1])([trasla_x_scaffale,trasla_y_scaffale])(creaScaffale(lunghezzaPrimoGradino+spaziaturagradini*6, altezzaPrimoScaffale*7)));

 	return COLOR(black)(STRUCT([g1,g2,g3,g4,g5,g6,g7]));
 	}

 function creaScaffali(){
	var spaziaturagradini = 1;
 	g1 = T([0,1])([trasla_x_scaffale,trasla_y_scaffale])(creaPrimoScaffale(lunghezzaPrimoGradino, altezzaPrimoScaffale));
 	g2 = T([0,1])([trasla_x_scaffale,trasla_y_scaffale])(creaScaffale(lunghezzaPrimoGradino+spaziaturagradini, altezzaPrimoScaffale*1.9));
 	g3 = T([0,1])([trasla_x_scaffale,trasla_y_scaffale])(creaScaffale(lunghezzaPrimoGradino+spaziaturagradini*2, altezzaPrimoScaffale*3));
 	g4 = T([0,1])([trasla_x_scaffale,trasla_y_scaffale])(creaScaffale(lunghezzaPrimoGradino+spaziaturagradini*3, altezzaPrimoScaffale*4));
	g5 = T([0,1])([trasla_x_scaffale,trasla_y_scaffale])(creaScaffale(lunghezzaPrimoGradino+spaziaturagradini*4, altezzaPrimoScaffale*5));
	g6 = T([0,1])([trasla_x_scaffale,trasla_y_scaffale])(creaScaffale(lunghezzaPrimoGradino+spaziaturagradini*5, altezzaPrimoScaffale*6));
	g7 = T([0,1])([trasla_x_scaffale,trasla_y_scaffale])(creaScaffale(lunghezzaPrimoGradino+spaziaturagradini*6, altezzaPrimoScaffale*7));

 	return COLOR(redd)(STRUCT([g1,g2,g3,g4,g5,g6,g7]));
 	}	

function createJoy(){
	astaA = T([2])([-altezzaAsta])(creaAsta());
	mobileA = STRUCT([astaA,creaScaffaliAlternati()]);
	mobileA = T([0,1])([25,-30])(mobileA);
	
	astaB = T([2])([-altezzaAsta])(creaAsta());
	mobileB = STRUCT([astaB,creaScaffali()]); //Struct sulla libreria e sull'asta
	mobileB = R([0,1])([-PI/2])(mobileB);
	mobileB = T([0,1])([10,30])(mobileB);

	joyModel = STRUCT([mobileA, mobileB]);
	}

function drawModel(){
	DRAW(joyModel);
	}

function hideModel(){
	HIDE(joyModel);
	}


createJoy();
drawModel();