//Cavour Table

var dom1D = INTERVALS(1)(32);
var dom2D = DOMAIN([[0,1],[0,1]])([30,30]);
var cavourTable;
var h_tav = 8
var l_table=25;
var depth_table=0.5;
var table_z=10;
var box_y=8;
var box_h=3;
var glass_color = [185/256,211/256,238/256,0.6]; 
var redd =[1,0.5,0];

function bezierMappata_2D(functions){
	var x = BEZIER(S1)(functions);
	return MAP(x)(dom2D);
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
	var depth_leg = 0.5;
	var l_leg = 4;
	var depth = 0.5;

	pnt1=[0,0,0]; pnt2=[0,l_leg,-h_tav]; pnt3=[0,l_leg*1.1,-h_tav]; pnt4=[0,l_leg*1.1,-h_tav]; pnt5=[0,l_leg*1.3,-h_tav];
	pnt6=[0,l_leg*5,-h_tav] ; pnt7=[0,l_leg*5.15,-h_tav];
	controlPnt1 = [pnt1,pnt2,pnt3,pnt4,pnt5,pnt6,pnt7];
	controlPnt1Bex =  BEZIER(S0)(controlPnt1);


	pnt11=[0,depth_leg,0]; pnt12=[0,l_leg+depth_leg,-h_tav+depth_leg] ; pnt13=[0,l_leg*1.1+depth_leg,-h_tav+depth_leg];
	pnt14=[0,l_leg*1.3+depth_leg,-h_tav+depth_leg]; pnt15=[0,l_leg*5+depth_leg,-h_tav+depth_leg];
	controlPnt2 = [pnt11,pnt12,pnt13,pnt14,pnt15];
	controlPnt2Bex = BEZIER(S0)(controlPnt2);


	pnt1_x=[depth,0,0]; pnt2_x=[depth,l_leg,-h_tav]; pnt3_x=[depth,l_leg*1.1,-h_tav]; pnt4_x=[depth,l_leg*1.1,-h_tav]; 
	pnt5_x=[depth,l_leg*1.3,-h_tav];	pnt6_x=[depth,l_leg*5,-h_tav] ; pnt7_x=[depth,l_leg*5.15,-h_tav];
	controlPnt1_x = [pnt1_x,pnt2_x,pnt3_x,pnt4_x,pnt5_x,pnt6_x,pnt7_x];
	controlPnt1Bex_x = BEZIER(S0)(controlPnt1_x);


	pnt11_x=[depth,depth_leg,0]; pnt12_x=[depth,l_leg+depth_leg,-h_tav+depth_leg] ; pnt13_x=[depth,l_leg*1.1+depth_leg,-h_tav+depth_leg];
	pnt14_x=[depth,l_leg*1.3+depth_leg,-h_tav+depth_leg]; pnt15_x=[depth,l_leg*5+depth_leg,-h_tav+depth_leg];
	controlPnt2_x = [pnt11_x,pnt12_x,pnt13_x,pnt14_x,pnt15_x];
	controlPnt2Bex_x = BEZIER(S0)(controlPnt2_x);
	
	//<----------------------------------------->

	pnt21=[0,3,-5]; pnt22=[0,17,-h_tav];
	controlPnt3 = [pnt21,pnt22];
	controlPnt3Bex = BEZIER(S0)(controlPnt3);


	pnt31=[0,2.5,-4]; pnt32=[0,3.5,-5]; pnt33=[0,20.5,-h_tav+0.5];
	controlPnt4 = [pnt31,pnt32,pnt33];
	controlPnt4Bex =  BEZIER(S0)(controlPnt4);


	pnt21_x=[depth,3,-5]; pnt22_x=[depth,17,-h_tav];
	controlPnt3_x = [pnt21_x,pnt22_x];
	controlPnt3Bex_x = BEZIER(S0)(controlPnt3_x);


	pnt31=[depth,2.5,-4]; pnt32=[depth,3.5,-5]; pnt33=[depth, 20.5,-h_tav+0.5];
	controlPnt4_x = [pnt31,pnt32,pnt33];
	controlPnt4Bex_x = BEZIER(S0)(controlPnt4_x);


	c1 = bezierMappata_2D([controlPnt1Bex,controlPnt2Bex]);
	c2 = bezierMappata_2D([controlPnt1Bex_x,controlPnt2Bex_x]);
	c3 = bezierMappata_2D([controlPnt1Bex,controlPnt1Bex_x]);
	c4 = bezierMappata_2D([controlPnt2Bex,controlPnt2Bex_x]);
	c5 = bezierMappata_2D([controlPnt3Bex,controlPnt4Bex]);
	c6 = bezierMappata_2D([controlPnt3Bex_x,controlPnt4Bex_x]);
	c7 = bezierMappata_2D([controlPnt3Bex,controlPnt3Bex_x]);
	c8 = bezierMappata_2D([controlPnt4Bex,controlPnt4Bex_x]);
	
	return STRUCT([c1,c2,c3,c4,c5,c6,c7,c8]);
}

function createLegs(){
	leg1 = createSingleLeg();
	leg1 = R([1,0])([-PI/14])(leg1); 

	leg2 = createSingleLeg();
	leg2 = R([1,0])([PI/14])(leg2);
	leg2 = T([0])([table_z])(leg2);

	cir = CYLINDER(0.2,1.5)([24, 1]);
	cir = T([1,2,0])([19,4.5,7.7])(cir);
	cir = R([0,2])([PI/2])(cir);

	support1 = T([0,1,2])([4.1,17,-(box_h*2+1.5)])(CYLINDER(0.2,1.5)([24, 1]));
	support2 = T([0,1,2])([6.35,17,-(box_h*2+1.5)])(CYLINDER(0.2,1.5)([24, 1]));
	
	leg = COLOR(redd)(STRUCT([leg1,leg2]));
	return STRUCT([leg,cir,support1,support2]);
}

function createPlan(){
	plan = T([1])([1])(CUBOID([table_z,l_table,depth_table]));
	plan = COLOR(glass_color)(plan);
	return plan; 
}

function creabox(){
	lato1 = CUBOID([table_z,box_y,0.5]);
	lato2 = T([2])([-box_h])(CUBOID([table_z,0.5,box_h]));
	lato3 = T([1,2])([box_y-0.5,-box_h])(CUBOID([table_z,0.5,box_h]));
	lato4 = T([0,2])([table_z-0.5,-box_h])(CUBOID([0.5,box_y,box_h]));
	lato5 = T([2])([-1])(CUBOID([0.5, box_y, 1]));

	lati = COLOR(redd)(STRUCT([lato1,lato2,lato3,lato4,lato5]));

	vetro = T([2])([-box_h])(CUBOID([table_z, box_y,0.2]));
	vetro = COLOR(glass_color)(vetro);

	return STRUCT([vetro, lati]);
}

function createBoxTable(dx,dy,dz){
	return CUBOID([dx,dy,dz]);
}

function createBox(){
	comodino_y = box_y*0.7;
	comodino_x = table_z*0.9;
	comodino_z = box_h*2;
	comodino = CUBOID([comodino_x, comodino_y, comodino_z]);
	
	spostamentocassetto_y = (comodino_y - comodino_y*0.8)/2
	cassetto1 = T([0,1])([-0.5,spostamentocassetto_y])(createBoxTable(0.5, comodino_y*0.8, 1.5));
	cassetto2 = T([0,1,2])([-0.5,spostamentocassetto_y,2])(createBoxTable(0.5, comodino_y*0.8, 1.5));
	cassetto3 = T([0,1,2])([-0.5,spostamentocassetto_y,4])(createBoxTable(0.5, comodino_y*0.8, 1.5));

	comodino = STRUCT([comodino, cassetto1,cassetto2,cassetto3]);

	return COLOR(redd)(comodino);
}

function createHookDx(){
	dx = 0.2;//spessore del tubo
	dy = -2;
	dz = -2.70
	curvatura = 3.8;

	pnt1=[0,0,0]; pnt2=[curvatura,dy,dz];
	pntControllo = [pnt1, pnt2];
	pntControlloBez =  BEZIER(S0)(pntControllo);


	pnt10=[0,-dx,0]; pnt11=[curvatura,dy-dx, dz];
	controlPnt2 = [pnt10, pnt11];
	pntControlloBez2 =  BEZIER(S0)(controlPnt2);

	//<---------------------------------------------------->

	pnt20=[dx,0,0]; pnt21=[dx+curvatura,dy,dz];
	controlPnt3 = [pnt20, pnt21];
	pntControlloBez3 =  BEZIER(S0)(controlPnt3);


	pnt30=[dx,-dx,0]; pnt31=[dx+curvatura,-dx+dy,dz];
	controlPnt4 = [pnt30, pnt31];
	pntControlloBez4 =  BEZIER(S0)(controlPnt4);


	c1 = bezierMappata_2D([pntControlloBez,pntControlloBez2]);
	c2 = bezierMappata_2D([pntControlloBez3,pntControlloBez4]);
	c3 = bezierMappata_2D([pntControlloBez,pntControlloBez3]);
	c4 = bezierMappata_2D([pntControlloBez2,pntControlloBez4]);

	return T([0,1,2])([0.52+dx,1,-1])(STRUCT([c1,c2,c3,c4]));
}

function createHookSx(){
	dx = 0.2;//spessore del tubo
	dy = -2;
	dz = -2.7
	curvatura = 3.8;

	pnt1=[0,0,0]; pnt2=[-curvatura,dy,dz];
	pntControllo = [pnt1, pnt2];
	pntControlloBez =  BEZIER(S0)(pntControllo);


	pnt10=[0,-dx,0]; pnt11=[-curvatura,dy-dx, dz];
	controlPnt2 = [pnt10, pnt11];
	pntControlloBez2 =  BEZIER(S0)(controlPnt2);

	//<---------------------------------------------------->

	pnt20=[dx,0,0]; pnt21=[dx-curvatura,dy,dz];
	controlPnt3 = [pnt20, pnt21];
	pntControlloBez3 =  BEZIER(S0)(controlPnt3);


	pnt30=[dx,-dx,0]; pnt31=[dx-curvatura,-dx+dy,dz];
	controlPnt4 = [pnt30, pnt31];
	pntControlloBez4 =  BEZIER(S0)(controlPnt4);


	c1 = bezierMappata_2D([pntControlloBez,pntControlloBez2]);
	c2 = bezierMappata_2D([pntControlloBez3,pntControlloBez4]);
	c3 = bezierMappata_2D([pntControlloBez,pntControlloBez3]);
	c4 = bezierMappata_2D([pntControlloBez2,pntControlloBez4]);

	return T([0,1,2])([0.52+dx,1,-1])(STRUCT([c1,c2,c3,c4]));
}

function createCentralSupport(){
	support = CUBOID([table_z*0.2, 0.2,0.2]);
	return support;
}

function createSupports(){
	supportDx = createHookDx();
	supportSx = T([0])([table_z-1.1])(createHookSx());
	supportC = T([0,1,2])([4.2,-1, -3.5])(createCentralSupport());

	return STRUCT([supportDx, supportSx, supportC]);
}

function createCavourTable(){
	legs = createLegs();
	plan = T([2])([-h_tav-depth_table])(createPlan());
	box = T([1,2])([-box_y/1.3,-h_tav/2])(creabox());
	comodino = T([1,2])([l_table/1.5, -box_h*2])(createBox());
	support = createSupports();

	cavourTable = STRUCT([legs,plan,box,comodino,support]);
}

function drawModel(){
	DRAW(cavourTable);
}

function hideModel(){
	HIDE(cavourTable);
}

createCavourTable();
drawModel();