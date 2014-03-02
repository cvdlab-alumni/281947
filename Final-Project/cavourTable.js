//Cavour table
var cavourTable;
var h_tav = 8
var l_tavolo=25;
var spessore_tavolo=0.5;
var prof_tavolo=10;
//var spazioTraGambe=8;
var cassetta_y=8;
var cassetta_h=3;
var dom1D = INTERVALS(1)(32);
var dom2D = DOMAIN([[0,1],[0,1]])([30,30]);
var glass_color = [185/256,211/256,238/256,0.6]; 
var redd =[1,0.5,0];

function bezierMappata_2D(functions){
	var x = BEZIER(S1)(functions)
	return MAP(x)(dom2D)
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

function createSingleLeg(){
	var spes_gamba = 0.5
	var l_gamba = 4;
	profondita = 0.5;

	pnt1=[0,0,0]; pnt2=[0,l_gamba,-h_tav]; pnt3=[0,l_gamba*1.1,-h_tav]; pnt4=[0,l_gamba*1.1,-h_tav]; pnt5=[0,l_gamba*1.3,-h_tav];
	pnt6=[0,l_gamba*5,-h_tav] ; pnt7=[0,l_gamba*5.15,-h_tav];
	pntControllo1 = [pnt1,pnt2,pnt3,pnt4,pnt5,pnt6,pnt7];

	pntControllo1Bex =  BEZIER(S0)(pntControllo1);

	pnt11=[0,spes_gamba,0]; pnt12=[0,l_gamba+spes_gamba,-h_tav+spes_gamba] ; pnt13=[0,l_gamba*1.1+spes_gamba,-h_tav+spes_gamba];
	pnt14=[0,l_gamba*1.3+spes_gamba,-h_tav+spes_gamba]; pnt15=[0,l_gamba*5+spes_gamba,-h_tav+spes_gamba];
	pntControllo2 = [pnt11,pnt12,pnt13,pnt14,pnt15];

	pntControllo2Bex =  BEZIER(S0)(pntControllo2);


	
	pnt1_x=[profondita,0,0]; pnt2_x=[profondita,l_gamba,-h_tav]; pnt3_x=[profondita,l_gamba*1.1,-h_tav]; pnt4_x=[profondita,l_gamba*1.1,-h_tav]; 
	pnt5_x=[profondita,l_gamba*1.3,-h_tav];	pnt6_x=[profondita,l_gamba*5,-h_tav] ; pnt7_x=[profondita,l_gamba*5.15,-h_tav];
	pntControllo1_x = [pnt1_x,pnt2_x,pnt3_x,pnt4_x,pnt5_x,pnt6_x,pnt7_x];

	pntControllo1Bex_x =  BEZIER(S0)(pntControllo1_x);

	pnt11_x=[profondita,spes_gamba,0]; pnt12_x=[profondita,l_gamba+spes_gamba,-h_tav+spes_gamba] ; pnt13_x=[profondita,l_gamba*1.1+spes_gamba,-h_tav+spes_gamba];
	pnt14_x=[profondita,l_gamba*1.3+spes_gamba,-h_tav+spes_gamba]; pnt15_x=[profondita,l_gamba*5+spes_gamba,-h_tav+spes_gamba];
	pntControllo2_x = [pnt11_x,pnt12_x,pnt13_x,pnt14_x,pnt15_x];

	pntControllo2Bex_x =  BEZIER(S0)(pntControllo2_x);
	
	//<----------------------------------------->

	pnt21=[0,3,-5]; pnt22=[0,17,-h_tav];
	pntControllo3 = [pnt21,pnt22];
	pntControllo3Bex =  BEZIER(S0)(pntControllo3);

	pnt31=[0,2.5,-4]; pnt32=[0,3.5,-5]; pnt33=[0,20.5,-h_tav+0.5];
	pntControllo4 = [pnt31,pnt32,pnt33];
	pntControllo4Bex =  BEZIER(S0)(pntControllo4);


	pnt21_x=[profondita,3,-5]; pnt22_x=[profondita,17,-h_tav];
	pntControllo3_x = [pnt21_x,pnt22_x];
	pntControllo3Bex_x =  BEZIER(S0)(pntControllo3_x);

	pnt31=[profondita,2.5,-4]; pnt32=[profondita,3.5,-5]; pnt33=[profondita, 20.5,-h_tav+0.5];
	pntControllo4_x = [pnt31,pnt32,pnt33];
	pntControllo4Bex_x =  BEZIER(S0)(pntControllo4_x);


	c1 = bezierMappata_2D([pntControllo1Bex,pntControllo2Bex]);
	c2 = bezierMappata_2D([pntControllo1Bex_x,pntControllo2Bex_x]);
	c3 = bezierMappata_2D([pntControllo1Bex,pntControllo1Bex_x]);
	c4 = bezierMappata_2D([pntControllo2Bex,pntControllo2Bex_x]);

	c5 = bezierMappata_2D([pntControllo3Bex,pntControllo4Bex]);
	c6 = bezierMappata_2D([pntControllo3Bex_x,pntControllo4Bex_x]);
	c7 = bezierMappata_2D([pntControllo3Bex,pntControllo3Bex_x]);
	c8 = bezierMappata_2D([pntControllo4Bex,pntControllo4Bex_x]);
	
	//c2 = bezierMappata_2D([pntControllo3Bex,pntControllo4Bex]);

	return STRUCT([c1,c2,c3,c4,c5,c6,c7,c8]);

}

function createLegs(){
	leg1 = createSingleLeg();
	leg2 = createSingleLeg();
	leg1 = R([1,0])([-PI/14])(leg1); 
	leg2 = R([1,0])([PI/14])(leg2);
	leg2 = T([0])([prof_tavolo])(leg2);

	cir = CYLINDER(0.2,1.5)([24, 1]);
	cir = T([1,2,0])([19,4.5,7.7])(cir);
	cir = R([0,2])([PI/2])(cir);

	sostegno1 = T([0,1,2])([4.1,17,-(cassetta_h*2+1.5)])(CYLINDER(0.2,1.5)([24, 1]));
	sostegno2 = T([0,1,2])([6.35,17,-(cassetta_h*2+1.5)])(CYLINDER(0.2,1.5)([24, 1]));
	
	leg = COLOR(redd)(STRUCT([leg1,leg2]));
	return STRUCT([leg,cir,sostegno1,sostegno2]);
}

function createPlan(){
	plan = T([1])([1])(CUBOID([prof_tavolo,l_tavolo,spessore_tavolo]));
	plan = COLOR(glass_color)(plan);
	return plan; 
}

function creaCassetta(){
	lato1 = CUBOID([prof_tavolo,cassetta_y,0.5]);
	lato2 = T([2])([-cassetta_h])(CUBOID([prof_tavolo,0.5,cassetta_h]));
	lato3 = T([1,2])([cassetta_y-0.5,-cassetta_h])(CUBOID([prof_tavolo,0.5,cassetta_h]));
	lato4 = T([0,2])([prof_tavolo-0.5,-cassetta_h])(CUBOID([0.5,cassetta_y,cassetta_h]));
	lato5 = T([2])([-1])(CUBOID([0.5, cassetta_y, 1]));

	lati = COLOR(redd)(STRUCT([lato1,lato2,lato3,lato4,lato5]));

	vetro = T([2])([-cassetta_h])(CUBOID([prof_tavolo, cassetta_y,0.2]));
	vetro = COLOR(glass_color)(vetro);

	return STRUCT([vetro, lati]);
}

function creaCassettoComodino(dx,dy,dz){
	return CUBOID([dx,dy,dz]);
}

function creaComodino(){
	comodino_y = cassetta_y*0.7;
	comodino_x = prof_tavolo*0.9;
	comodino_z = cassetta_h*2;
	comodino = CUBOID([comodino_x, comodino_y, comodino_z]);
	
	spostamentocassetto_y = (comodino_y - comodino_y*0.8)/2
	cassetto1 = T([0,1])([-0.5,spostamentocassetto_y])(creaCassettoComodino(0.5, comodino_y*0.8, 1.5));
	cassetto2 = T([0,1,2])([-0.5,spostamentocassetto_y,2])(creaCassettoComodino(0.5, comodino_y*0.8, 1.5));
	cassetto3 = T([0,1,2])([-0.5,spostamentocassetto_y,4])(creaCassettoComodino(0.5, comodino_y*0.8, 1.5));


	comodino = STRUCT([comodino, cassetto1,cassetto2,cassetto3]);

	return COLOR(redd)(comodino);
}

function creaGancio(){
	pnt1=[0,0,0]; pnt2=[0,-2,-3.5];
	pntControllo = [pnt1, pnt2];
	pntControlloBez =  BEZIER(S0)(pntControllo);

	pnt10=[0,-0.5,0]; pnt11=[0,-2.5,-3.5];
	pntControllo2 = [pnt11, pnt11];
	pntControlloBez2 =  BEZIER(S0)(pntControllo2);

	//<---------------------------------------------------->

	pnt20=[0.5,0,0]; pnt21=[0.5,-2,-3.5];
	pntControllo3 = [pnt20, pnt21];
	pntControlloBez3 =  BEZIER(S0)(pntControllo3);

	pnt30=[0.5,-0.5,0]; pnt31=[0.5,-2.5,-3.5];
	pntControllo4 = [pnt30, pnt31];
	pntControlloBez4 =  BEZIER(S0)(pntControllo4);


	c1 = bezierMappata_2D([pntControlloBez,pntControlloBez2,pntControlloBez3,pntControlloBez4]);
	//c2 = 

	return T([0])([0.5])(STRUCT([c1]));

}


function createCavourTable(){
	legs = createLegs();
	plan = T([2])([-h_tav-spessore_tavolo])(createPlan());
	cassetta = T([1,2])([-cassetta_y/1.3,-h_tav/2])(creaCassetta());
	comodino = T([1,2])([l_tavolo/1.5, -cassetta_h*2])(creaComodino());
	gancio = creaGancio();

	cavourTable = STRUCT([legs,plan,cassetta,comodino,gancio]);
}

function drawModel(){
	DRAW(cavourTable);
}

function hideModel(){
	HIDE(cavourTable);
}

createCavourTable();
drawModel();