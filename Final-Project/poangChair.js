//PoangChair
var poangChair;
var width = 34;
var deep = 41; 
var height = 50;
var widthAxis = 2;
var h_Axis = 1;
var z_Axis = 2.1;
var width_handle = 35
var l_seat=4; //width asse del sedile (z)
var h_seat=1; //height asse sedile (y)
var x_seat=width;
var pillow_color =[255/255,255/255,204/255];
var dom1D = INTERVALS(1)(32);
var dom2D = DOMAIN([[0,1],[0,1]])([30,30]);
var chair_color = [222/255,184/255,135/255];

function bezierMappata_2D(functions){
	var x = BEZIER(S1)(functions)
	return MAP(x)(dom2D)
}

var sphere = function(r) {
	var domain = DOMAIN([[0, PI], [0, 2*PI]])([50,50]);
	var mapping = function(v) {
		var a = v[0];
		var b = v[1];
		var u = r*SIN(a)*COS(b);
		var v = r*SIN(a)*SIN(b);
		var w = r*COS(a);
		return [u,v,w];
	}
	return MAP(mapping)(domain)
}

function createProfile(){
	h_backrest = height*0.7;
	cor1 = 5
	h_cor1 = h_backrest*0.8;
	corr2 = -10
	h_cor2 = h_backrest*0.1;
	corr3 = 20
	h_cor3 = h_backrest*0.20;

	pA_1=[0,h_backrest,0];	  pA_2=[0,h_cor1,cor1];
	pA_3=[0,h_cor2,corr2]; 	  pA_4=[0,h_cor3,corr3];
	pA_5=[0,h_Axis*0.9,0];

	pB_1=[widthAxis,h_backrest,0];	pB_2=[widthAxis,h_cor1,cor1];
	pB_3=[widthAxis,h_cor2,corr2]; 	pB_4=[widthAxis,h_cor3,corr3];
	pB_5=[widthAxis,h_Axis*0.9,0];   

	pointA = [pA_1,pA_2,pA_3,pA_4,pA_5];
	pointB = [pB_1,pB_2,pB_3,pB_4,pB_5];
	
	pC_1=[0,h_backrest,z_Axis];		pC_2=[0,h_cor1,cor1+z_Axis];
	pC_3=[0,h_cor2,corr2+z_Axis]; 	pC_4=[0,h_cor3,corr3+z_Axis];
	pC_5=[0,0,z_Axis];														

	pD_1=[widthAxis,h_backrest,z_Axis];		pD_2=[widthAxis,h_cor1,cor1+z_Axis];
	pD_3=[widthAxis,h_cor2,corr2+z_Axis]; 		pD_4=[widthAxis,h_cor3,corr3+z_Axis];
	pD_5=[widthAxis,0,z_Axis];

	pointC2 = [pC_1,pC_2,pC_3,pC_4,pC_5];
	pointD2 = [pD_1,pD_2,pD_3,pD_4,pD_5];
	
	pointABez = BEZIER(S0)(pointA);
	pointBBez = BEZIER(S0)(pointB);	
	pointCBez = BEZIER(S0)(pointC2);
	pointDBez = BEZIER(S0)(pointD2);

	c1 = bezierMappata_2D([pointABez,pointBBez]);
	c2 = bezierMappata_2D([pointCBez,pointDBez]);
	c3 = bezierMappata_2D([pointABez,pointCBez]);
	c4 = bezierMappata_2D([pointBBez,pointDBez]);
 
	return STRUCT([c1,c2,c3,c4]);
}

function createHorizontalAxis(){
		return CUBOID([width,widthAxis*0.6,h_Axis]);
}

function createsHorizontalAxes(){
	axis1 = T([0,1,2])([1, height*0.95,1.4])(createHorizontalAxis());
	axis2 = T([0,1,2])([1, height*0.8, 1.6])(createHorizontalAxis());
	axis3 = T([0,1,2])([1, height*0.65, 1.8])(createHorizontalAxis());
	axis4 = T([0,1,2])([1, height*0.50, 3.8])(createHorizontalAxis());
	return STRUCT([axis1, axis2,axis3, axis4]);
}

function creaAsseSedile(){
	corr_y = 0;
	pE_1=[0,0,0];       pE_2=[x_seat,0,0];		   pE_3=[x_seat/2,corr_y, 0]; //basso a sinistra
	pF_1=[0,0,l_seat];  pF_2=[x_seat,0,l_seat];    pF_3=[x_seat/2,corr_y, l_seat]; //basso a destra
	
	pointE = [pE_1, pE_3, pE_2];
	pointF = [pF_1, pF_3, pF_2];

	pG_1=[0,h_seat,0];		  pG_2=[x_seat,h_seat,0];			 pG_3=[x_seat/2, h_seat+corr_y, 0]; //alto a sinistra
	pH_1=[0,h_seat,l_seat];   pH_2=[x_seat,h_seat,l_seat];		 pH_3=[x_seat/2, h_seat+corr_y, l_seat]; //alto a destra

	pointG = [pG_1,pG_3,pG_2];
	pointH = [pH_1,pH_3,pH_2];

	pointEBez = BEZIER(S0)(pointE);
	pointFBez = BEZIER(S0)(pointF);
	pointGBez = BEZIER(S0)(pointG);
	pointHBez = BEZIER(S0)(pointH);

	c10 = bezierMappata_2D([pointEBez,pointFBez]);
	c20 = bezierMappata_2D([pointGBez,pointHBez]);
	c30 = bezierMappata_2D([pointEBez,pointGBez]);
	c40 = bezierMappata_2D([pointFBez,pointHBez]);
	return STRUCT([c10,c20,c30,c40]);
}

function createPillow(){
	l_backrest = 31.91;
	h_backrest = height*0.7;
	endPillow = -30.5
	deepPillow = 1.3;

	corr4 = -1;	
	cor1 = 5//Punto più alto - 20
	h_cor1 = h_backrest*0.8;
	corr2 = -10 //-20
	h_cor2 = h_backrest*0.1;
	corr3 = 20 //30
	h_cor3 = h_backrest*0.20;

	pA_1=[0,h_backrest,0];					 pA_2=[0,h_cor1,cor1];
	pA_3=[0,h_cor2,corr2]; 					 pA_4=[0,h_cor3,corr3];
	pA_5=[0,h_Axis*1.5+deepPillow,0];	 pA_6=[0,h_Axis*1.5+deepPillow,endPillow];
	pA_7=[0,deepPillow+h_Axis*1.5,endPillow+z_Axis+corr4];

	pB_1=[l_backrest,h_backrest,0];						pB_2=[l_backrest,h_cor1,cor1];
	pB_3=[l_backrest,h_cor2,corr2]; 						pB_4=[l_backrest,h_cor3,corr3];
	pB_5=[l_backrest,h_Axis*1.5+deepPillow,0]; 	   pB_6=[l_backrest,h_Axis*1.5+deepPillow,endPillow];
	pB_7=[l_backrest,deepPillow+h_Axis*1.5,endPillow+z_Axis+corr4];

	pointA = [pA_1,pA_2,pA_3,pA_4,pA_5,pA_5,pA_5,pA_6,pA_7];
	pointB = [pB_1,pB_2,pB_3,pB_4,pB_5,pB_5,pB_5,pB_6,pB_7];

		
	pC_1=[0,h_backrest,z_Axis];	   pC_2=[0,h_cor1,cor1+z_Axis];
	pC_3=[0,h_cor2,corr2+z_Axis]; 	pC_4=[0,h_cor3,corr3+z_Axis];
	pC_5=[0,deepPillow,z_Axis];		pC_6=[0,deepPillow,z_Axis+endPillow+corr4];					

	pD_1=[l_backrest,h_backrest,z_Axis];			pD_2=[l_backrest,h_cor1,cor1+z_Axis];
	pD_3=[l_backrest,h_cor2,corr2+z_Axis]; 		pD_4=[l_backrest,h_cor3,corr3+z_Axis];
	pD_5=[l_backrest,deepPillow,z_Axis];			pD_6=[l_backrest,deepPillow,z_Axis+endPillow+corr4];

	pointC2 = [pC_1,pC_2,pC_3,pC_4,pC_5,pC_5,pC_5,pC_6];
	pointD2 = [pD_1,pD_2,pD_3,pD_4,pD_5,pD_5,pD_5,pD_6];
	
	pointABez = BEZIER(S0)(pointA);
	pointBBez = BEZIER(S0)(pointB);	
	pointCBez = BEZIER(S0)(pointC2);
	pointDBez = BEZIER(S0)(pointD2);

	c1 = bezierMappata_2D([pointABez,pointBBez]);
	c2 = bezierMappata_2D([pointCBez,pointDBez]);
	c3 = bezierMappata_2D([pointABez,pointCBez]);
	c4 = bezierMappata_2D([pointBBez,pointDBez]);
 	
 	pillow = T([0,1,2])([2.05,15,-1.6])(COLOR(pillow_color)(STRUCT([c1,c2,c3,c4])));

 	correction = 0;
	pillow_x = 32;
	pillow_y = 0.5;
	pillow_z = 30.4;

	pnt1=[0,0,0]; pnt2=[pillow_x,0,0]; pnt3 = [pillow_x/2,correction,0]
	pnt10=[0,0,pillow_z]; pnt11=[pillow_x,0,pillow_z]; pnt12 = [pillow_x/2,correction,pillow_z]
	pnt20=[0,pillow_y,0]; pnt21=[pillow_x,pillow_y,0]; pnt22=[pillow_x/2,pillow_y+correction,0];
	pnt30=[0,pillow_y,pillow_z]; pnt31=[pillow_x,pillow_y,pillow_z]; pnt32=[pillow_x/2,pillow_y+correction,pillow_z]; 

	point1 = [pnt1,pnt3, pnt2];
	point10 = [pnt10,pnt12, pnt11];
	point20 = [pnt20,pnt22, pnt21];
	point30 = [pnt30,pnt32, pnt31];

	point1Bez = BEZIER(S0)(point1);
	point10Bez = BEZIER(S0)(point10);
	point20Bez = BEZIER(S0)(point20);
	point30Bez = BEZIER(S0)(point30);
	
	c10 = bezierMappata_2D([point1Bez,point10Bez]);
	c20 = bezierMappata_2D([point20Bez,point30Bez]);
	c30 = bezierMappata_2D([point1Bez,point20Bez]);
	c40 = bezierMappata_2D([point10Bez,point30Bez]);

	pillow = STRUCT([pillow]);
	return pillow;
}

function makebackrest(){
	p1 = T([1])([height*0.3])(createProfile());
	p2 = T([0,1])([width,height*0.3])(createProfile());
	c1 = T([1,2])([height*0.3,-width_handle+2])(CUBOID([widthAxis,1.5,width_handle]));
	c2 = T([0,1,2])([width, height*0.3,-width_handle+2])(CUBOID([widthAxis,1.5,width_handle]));
	
	Axis = createsHorizontalAxes();
	a1 =  T([0,1,2])([1,height*0.3,-2])(creaAsseSedile());
	a2 = T([0,1,2])([1,height*0.3,-(width_handle+l_seat)/2.5])(creaAsseSedile());
	a3 = T([0,1,2])([1,height*0.3,-width_handle+l_seat])(creaAsseSedile());

	return STRUCT([p1,p2,c1,c2,Axis,a1,a2,a3]);
}

function createLateralProfile(){
	lungh_z = -width_handle*0.75;
	corrFirstAngle = -4;

	la_y = 1;
	la_z = widthAxis;
	la_x = 3;

	pI_9 =[0,-la_y*30 ,lungh_z-la_z];    pI_8 =[0,-la_y*30,lungh_z-la_z];    pI_7 =[0,-la_y,lungh_z-la_z]; 
	pI_6 =[0,0,lungh_z-la_z];	          pI_5=[0, 0,lungh_z];					 pI_3=[0, -la_y/2,0];			
	pI_1=[0,0,0];		                   pI_2=[0,la_y*4,0]; 		//basso a sinistra
	
	pL_6=[0,-la_y*30, lungh_z];          pL_5=[0,-la_y, lungh_z];	           pL_4=[0,-la_y, 0];	
	pL_3=[0,-la_y,la_z/2];	             pL_1=[0,0,la_z];                     pL_2=[0,la_y*4,la_z]; 	//in basso a destra

	pointI = [pI_9, pI_9, pI_8, pI_7, pI_7,pI_7,pI_7,pI_6, pI_5,pI_3, pI_1, pI_2];
	pointL = [pL_6, pL_5, pL_5, pL_5,pL_5, pL_4, pL_3, pL_1, pL_2];

	
	pM_9 =[la_x,-la_y*30,lungh_z-la_z];     pM_8 =[la_x,-la_y*30,lungh_z-la_z];    pM_7 =[la_x,-la_y,lungh_z-la_z]; 
	pM_6 =[la_x,0,lungh_z-la_z];		       pM_5=[la_x,0 ,lungh_z];					 pM_3=[la_x, -la_y/2, 0];			
	pM_1=[la_x,0,0];		                   pM_2=[la_x,la_y*4,0]; //alto a sinistra
	
	pN_6=[la_x,-la_y*30,lungh_z];           pN_5=[la_x,-la_y,lungh_z];		       pN_4=[la_x,-la_y, 0];   
	pN_3=[la_x,-la_y,la_z/2];	             pN_1=[la_x,0,la_z];	                   pN_2=[la_x,la_y*4,la_z]; //alto a destra


	pointM = [pM_9, pM_8, pM_7,pM_7,pM_7,pM_7, pM_6,		pM_5,			      pM_3, pM_1,pM_2];
	pointN = [pN_6, pN_5, pN_5, pN_5,pN_5, pN_4, pN_3, pN_1,pN_2];
	
	pointIBez = BEZIER(S0)(pointI);
	pointLBez = BEZIER(S0)(pointL);	
	pointMBez = BEZIER(S0)(pointM);
	pointNBez = BEZIER(S0)(pointN);

	cIL = bezierMappata_2D([pointIBez,pointLBez]);
	cMN = bezierMappata_2D([pointMBez,pointNBez]);
	cIM = bezierMappata_2D([pointIBez,pointMBez]);
	cLN = bezierMappata_2D([pointLBez,pointNBez]);

	curve1 = STRUCT([cIL,cMN,cIM,cLN]);

	
	pI_10 = [0,-la_y*30-la_z ,lungh_z];         pI_11 =[0,-la_y*30-la_z ,0];            pI_12 =[0,-la_y*30 ,lungh_z-la_z]; 
	pI_13 =[0,-la_y*30-la_z,lungh_z-la_z];      pI_14 =[0,-la_y*30-la_z,-lungh_z/2];

	pL_10 = [0,-la_y*30, lungh_z];              pL_11 = [0,-la_y*30, 0];                pL_12 = [0,-la_y*30, -lungh_z/2]; 

	pM_10 =[la_x,-la_y*30-la_z,lungh_z];        pM_11 =[la_x,-la_y*30-la_z,0];          pM_12 =[la_x,-la_y*30,lungh_z-la_z]; 
	pM_13 =[la_x,-la_y*30-la_z,lungh_z-la_z];   pM_14 =[la_x,-la_y*30-la_z,-lungh_z/2];

	pN_10=[la_x,-la_y*30,lungh_z];              pN_11=[la_x,-la_y*30,0];                pN_12=[la_x,-la_y*30,-lungh_z/2];
	
	pointI2 = [pI_12,pI_13,pI_13,pI_10,pI_11,pI_14];
	pointL2 = [pL_10,pL_11,pL_12];
	pointM2 = [pM_12,pM_13,pM_13,pM_10, pM_11,pM_14];
	pointN2 = [pN_10, pN_11,pN_12];

	pointI2Bez = BEZIER(S0)(pointI2);
	pointL2Bez = BEZIER(S0)(pointL2);	
	pointM2Bez = BEZIER(S0)(pointM2);
	pointN2Bez = BEZIER(S0)(pointN2);

	cIL2 = bezierMappata_2D([pointI2Bez,pointL2Bez]);
	cMN2 = bezierMappata_2D([pointM2Bez,pointN2Bez]);
	cIM2 = bezierMappata_2D([pointI2Bez,pointM2Bez]);
	cLN2 = bezierMappata_2D([pointL2Bez,pointN2Bez]);

	curve2 = STRUCT([cIL2,cMN2,cIM2,cLN2]);
	c1 = T([0,1,2])([0,-32,12.62])(CUBOID([3,2,0.5]));

	return STRUCT([curve1,curve2,c1]);
}

function createEndHandle(){
	b1 = T([0,1,2])([0,17.5+height*0.65,0])(CUBOID([2,0.01,2.1]));
	b2 = T([0,1,2])([width+widthAxis-2,17.5+height*0.65,0])(CUBOID([2,0.01,2.1]));
	b3 = T([0,1,2])([-3,height*0.65+4,1])(CUBOID([3,0.01,2]));
	b4 = T([0,1,2])([36,height*0.65+4,1])(CUBOID([3,0.01,2]));
	b =  COLOR(chair_color)(STRUCT([b1,b2,b3,b4]));
	b5 = COLOR(pillow_color)(T([0,1,2])([2.1,50,-1.6])(CUBOID([31.87,0.1,2.1])));
	b6 = COLOR(pillow_color)(T([0,1,2])([2,16.1,-31])(CUBOID([31.96,1.7,0.01])));
	return STRUCT([b,b5,b6]);
}

function createSupport1(){
  var c1 = T([1,2])([0.5,12.11])(CUBOID([width*1.07,widthAxis,widthAxis]));
  return c1; 
}

function createSupport2(){
  var c2 = T([1,2])([8,-27.25])(CUBOID([width*1.07,widthAxis,widthAxis]));
  return c2; 
}

function createSingleScrew(){
	radius = 0.2;
	return sphere(radius);
}

function createScrews(){
	s1 = T([0,1,2])([-3.05,16.2,-26.4])(createSingleScrew());
	s2 = T([0,1,2])([39,16.2,-26.2])(createSingleScrew());
	s3 = T([0,1,2])([-3.05,35,1.7])(createSingleScrew());
	s4 = T([0,1,2])([39,35,1.7])(createSingleScrew());
	return STRUCT([s1,s2,s3,s4]);
}

function makeModel(){
	backrest = makebackrest();
	profDx = T([0,1,2])([-3,height*0.65,1])(createLateralProfile());
	profSx = T([0,1,2])([width+widthAxis,height*0.65,1])(createLateralProfile());
	supports = STRUCT([createSupport1(),createSupport2()]);
	poangChair = COLOR(chair_color)(STRUCT([backrest,profDx,profSx,supports]));
	pillow = createPillow();
	viti = createScrews();
	bra = createEndHandle();
	poangChair = STRUCT([poangChair, pillow, viti, bra]);
}

function drawModel(){
	DRAW(poangChair);
} 

function hideModel(){
	HIDE(poangChair);
}

makeModel();
drawModel();
