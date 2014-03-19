//joy - Zanotta
var joyModel;
var dom1D = INTERVALS(1)(32);
var dom2D = DOMAIN([[0,1],[0,1]])([30,30]);
var rodRadius = 0.5;
var heightRod = 24;
var depthStep = 0.5;
var plan_z = 5;
var lengthFirstStep = 12;
var translation_x_shelf = -1; //correzione asse, centro nello spazio
var translation_y_shelf = -1;
var heightFirstShelf = 4;
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

function createFirstShelf(length_x, height_y){
	plan = T([2])([-height_y])(CUBOID([plan_z, length_x , depthStep]));
	Sx = T([1,2])([length_x,-height_y])(CUBOID([plan_z, depthStep, height_y]));
	Dx = T([2])([-height_y])(CUBOID([plan_z, depthStep, height_y]));
	return STRUCT([Sx,Dx, plan]);
}

function creaScaffale(length_x, height_y){
	plan = T([2])([-height_y])(CUBOID([plan_z, length_x , depthStep]));
	Sx = T([1,2])([length_x,-height_y])(CUBOID([plan_z, depthStep, height_y]));
	return STRUCT([Sx,plan]);
}

function createRod(){
	return COLOR(black)(T([2])([-heightFirstShelf])(CYLINDER(rodRadius, heightRod)([24, 1])));
	}

function createAlternatingShelves(){
	var spacingStep = 1;
 	g1 = T([0,1])([translation_x_shelf,translation_y_shelf])(createFirstShelf(lengthFirstStep, heightFirstShelf));
 	g2 = R([0,1])([PI/2])(T([0,1])([translation_x_shelf,translation_y_shelf])(creaScaffale(lengthFirstStep+spacingStep, heightFirstShelf*1.9)));
 	g3 = R([0,1])([PI/2])(T([0,1])([translation_x_shelf,translation_y_shelf])(creaScaffale(lengthFirstStep+spacingStep*2, heightFirstShelf*3)));
 	g4 = T([0,1])([translation_x_shelf,translation_y_shelf])(creaScaffale(lengthFirstStep+spacingStep*3, heightFirstShelf*4));
	g5 = T([0,1])([translation_x_shelf,translation_y_shelf])(creaScaffale(lengthFirstStep+spacingStep*4, heightFirstShelf*5));
	g6 = R([0,1])([PI/2])(T([0,1])([translation_x_shelf,translation_y_shelf])(creaScaffale(lengthFirstStep+spacingStep*5, heightFirstShelf*6)));
	g7 = R([0,1])([PI/2])(T([0,1])([translation_x_shelf,translation_y_shelf])(creaScaffale(lengthFirstStep+spacingStep*6, heightFirstShelf*7)));

 	return COLOR(black)(STRUCT([g1,g2,g3,g4,g5,g6,g7]));
 	}

 function createShelf(){
	var spacingStep = 1;
 	g1 = T([0,1])([translation_x_shelf,translation_y_shelf])(createFirstShelf(lengthFirstStep, heightFirstShelf));
 	g2 = T([0,1])([translation_x_shelf,translation_y_shelf])(creaScaffale(lengthFirstStep+spacingStep, heightFirstShelf*1.9));
 	g3 = T([0,1])([translation_x_shelf,translation_y_shelf])(creaScaffale(lengthFirstStep+spacingStep*2, heightFirstShelf*3));
 	g4 = T([0,1])([translation_x_shelf,translation_y_shelf])(creaScaffale(lengthFirstStep+spacingStep*3, heightFirstShelf*4));
	g5 = T([0,1])([translation_x_shelf,translation_y_shelf])(creaScaffale(lengthFirstStep+spacingStep*4, heightFirstShelf*5));
	g6 = T([0,1])([translation_x_shelf,translation_y_shelf])(creaScaffale(lengthFirstStep+spacingStep*5, heightFirstShelf*6));
	g7 = T([0,1])([translation_x_shelf,translation_y_shelf])(creaScaffale(lengthFirstStep+spacingStep*6, heightFirstShelf*7));

 	return COLOR(redd)(STRUCT([g1,g2,g3,g4,g5,g6,g7]));
 	}	

function createJoy(){
	rodA = T([2])([-heightRod])(createRod());
	mobileA = STRUCT([rodA,createAlternatingShelves()]);
	mobileA = T([0,1])([25,-30])(mobileA);
	
	rodB = T([2])([-heightRod])(createRod());
	mobileB = STRUCT([rodB,createShelf()]); //Struct sulla libreria e sull'asta
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