//PoangChair
var poangChair;
var larghezza = 34;
var profondita = 41; 
var altezza = 50;
var larAsse = 2;
var h_Asse = 1;
var profAsse = 2.1;
var lunghezzaBraccio = 35

var l_sedile=4; //larghezza asse del sedile (z)
var h_sedile=1; //altezza asse sedile (y)
var x_sedile=larghezza;

var redd =[1,0.5,0];
var dom1D = INTERVALS(1)(32);
var dom2D = DOMAIN([[0,1],[0,1]])([30,30]);
//222,184,135
var chair_color = [222/255,184/255,135/255];

function bezierMappata_2D(functions){
	var x = BEZIER(S1)(functions)
	return MAP(x)(dom2D)
}


function creaProfilo(){
	h_schienale = altezza*0.7;
	
	cor1 = 5//Punto più alto - 20
	h_cor1 = h_schienale*0.8;

	corr2 = -10 //-20
	h_cor2 = h_schienale*0.1;

	corr3 = 20 //30
	h_cor3 = h_schienale*0.20;

	pA_1=[0,h_schienale,0];					pA_2=[0,h_cor1,cor1];
	pA_3=[0,h_cor2,corr2]; 					pA_4=[0,h_cor3,corr3];
	pA_5=[0,h_Asse*0.9,0];

	pB_1=[larAsse,h_schienale,0];			pB_2=[larAsse,h_cor1,cor1];
	pB_3=[larAsse,h_cor2,corr2]; 			pB_4=[larAsse,h_cor3,corr3];
	pB_5=[larAsse,h_Asse*0.9,0];   

	pointA = [pA_1,pA_2,pA_3,pA_4,pA_5];
	pointB = [pB_1,pB_2,pB_3,pB_4,pB_5];

	
	
	pC_1=[0,h_schienale,profAsse];					 pC_2=[0,h_cor1,cor1+profAsse];
	pC_3=[0,h_cor2,corr2+profAsse]; 				pC_4=[0,h_cor3,corr3+profAsse];
	pC_5=[0,0,profAsse];														

	pD_1=[larAsse,h_schienale,profAsse];			  pD_2=[larAsse,h_cor1,cor1+profAsse];
	pD_3=[larAsse,h_cor2,corr2+profAsse]; 			pD_4=[larAsse,h_cor3,corr3+profAsse];
	pD_5=[larAsse,0,profAsse];

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

function creaAsseOrizzontale(){
		return CUBOID([larghezza,larAsse*0.6,h_Asse]);
}

function creaAssiOrizzontali(){
	asse1 = T([0,1,2])([1, altezza*0.95,1.4])(creaAsseOrizzontale());
	asse2 = T([0,1,2])([1, altezza*0.8, 1.6])(creaAsseOrizzontale());
	asse3 = T([0,1,2])([1, altezza*0.65, 1.8])(creaAsseOrizzontale());
	asse4 = T([0,1,2])([1, altezza*0.50, 3.8])(creaAsseOrizzontale());

	return STRUCT([asse1, asse2,asse3, asse4]);

}

function creaAsseSedile(){
	correzione_y = -2;

	pE_1=[0,0,0];        	pE_2=[x_sedile,0,0];			   pE_3=[x_sedile/2,correzione_y, 0]; //basso a sinistra
	pF_1=[0,0,l_sedile]; 	pF_2=[x_sedile,0,l_sedile];   pF_3=[x_sedile/2,correzione_y, l_sedile]; //basso a destra
	
	pointE = [pE_1, pE_3, pE_2];
	pointF = [pF_1, pF_3, pF_2];


	pG_1=[0,h_sedile,0];				pG_2=[x_sedile,h_sedile,0];				 pG_3=[x_sedile/2, h_sedile+correzione_y, 0]; //alto a sinistra
	pH_1=[0,h_sedile,l_sedile];   pH_2=[x_sedile,h_sedile,l_sedile];		 pH_3=[x_sedile/2, h_sedile+correzione_y, l_sedile]; //alto a destra

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

function creaCuscino(){
	correzione = -3;
	cuscino_x = 32;
	cuscino_y = 0.4;
	cuscino_z = 35;

	pnt1=[0,0,0]; pnt2=[cuscino_x,0,0]; pnt3 = [cuscino_x/2,correzione,0]
	pnt10=[0,0,cuscino_z]; pnt11=[cuscino_x,0,cuscino_z]; pnt12 = [cuscino_x/2,correzione,cuscino_z]
	pnt20=[0,cuscino_y,0]; pnt21=[cuscino_x,cuscino_y,0]; pnt22=[cuscino_x/2,cuscino_y+correzione,0];
	pnt30=[0,cuscino_y,cuscino_z]; pnt31=[cuscino_x,cuscino_y,cuscino_z]; pnt32=[cuscino_x/2,cuscino_y+correzione,cuscino_z]; 

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

	structure = COLOR(redd)(T([0,1,2])([2,altezza*0.325,-32])(STRUCT([c10,c20,c30,c40])));
	return structure;

}

function makeSchienale(){
	p1 = T([1])([altezza*0.3])(creaProfilo());
	p2 = T([0,1])([larghezza,altezza*0.3])(creaProfilo());
	
	c1 = T([1,2])([altezza*0.3,-lunghezzaBraccio+2])(CUBOID([larAsse,1.5,lunghezzaBraccio]));
	c2 = T([0,1,2])([larghezza, altezza*0.3,-lunghezzaBraccio+2])(CUBOID([larAsse,1.5,lunghezzaBraccio]));
	
	assi = creaAssiOrizzontali();
	
	a1 =  T([0,1,2])([1,altezza*0.3,-2])(creaAsseSedile());
	a2 = T([0,1,2])([1,altezza*0.3,-(lunghezzaBraccio+l_sedile)/2.5])(creaAsseSedile());
	a3 = T([0,1,2])([1,altezza*0.3,-lunghezzaBraccio+l_sedile])(creaAsseSedile());

	return STRUCT([p1,p2,c1,c2,assi,a1,a2,a3]);
}

function creaProfiloLaterale(){
	lungh_z = -lunghezzaBraccio*0.75;
	corrPrimoAngolo = -4;

	la_y = 1;
	la_z = larAsse;
	la_x = 3;

	pI_9 =[0,-la_y*30 ,lungh_z-la_z];  pI_8 =[0,-la_y*30,lungh_z-la_z]; pI_7 =[0,-la_y,lungh_z-la_z]; pI_6 =[0,0,lungh_z-la_z];	 pI_5=[0, 0,lungh_z];								   	pI_3=[0, -la_y/2,0];			pI_1=[0,0,0];		pI_2=[0,la_y*4,0]; 		//basso a sinistra
	pL_6=[0,-la_y*30, lungh_z]; pL_5=[0,-la_y, lungh_z];	pL_4=[0,-la_y, 0];	pL_3=[0,-la_y,la_z/2];	pL_1=[0,0,la_z];	pL_2=[0,la_y*4,la_z]; 	//in basso a destra

	pointI = [pI_9, pI_9, pI_8, pI_7, pI_7,pI_7,pI_7,		pI_6, pI_5,		 pI_3, pI_1, pI_2];
	pointL = [pL_6, pL_5, pL_5, pL_5,pL_5, pL_4, pL_3, pL_1, pL_2];

	

	pM_9 =[la_x,-la_y*30,lungh_z-la_z]; pM_8 =[la_x,-la_y*30,lungh_z-la_z]; pM_7 =[la_x,-la_y,lungh_z-la_z]; pM_6 =[la_x,0,lungh_z-la_z];		   		pM_5=[la_x,0 ,lungh_z];											pM_3=[la_x, -la_y/2, 0];			pM_1=[la_x,0,0];		pM_2=[la_x,la_y*4,0]; //alto a sinistra
	pN_6=[la_x,-la_y*30,lungh_z]; pN_5=[la_x,-la_y,lungh_z];		pN_4=[la_x,-la_y, 0];   pN_3=[la_x,-la_y,la_z/2];	pN_1=[la_x,0,la_z];	pN_2=[la_x,la_y*4,la_z]; //alto a destra


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

	curva1 = STRUCT([cIL,cMN,cIM,cLN]);

	
	pI_10 = [0,-la_y*30-la_z ,lungh_z]; pI_11 =[0,-la_y*30-la_z ,0]; pI_12 =[0,-la_y*30 ,lungh_z-la_z]; pI_13 =[0,-la_y*30-la_z,lungh_z-la_z]; pI_14 =[0,-la_y*30-la_z,-lungh_z/2];
	pL_10 = [0,-la_y*30, lungh_z]; pL_11 = [0,-la_y*30, 0]; pL_12 = [0,-la_y*30, -lungh_z/2]; 

	pM_10 =[la_x,-la_y*30-la_z,lungh_z]; pM_11 =[la_x,-la_y*30-la_z,0]; pM_12 =[la_x,-la_y*30,lungh_z-la_z]; pM_13 =[la_x,-la_y*30-la_z,lungh_z-la_z]; pM_14 =[la_x,-la_y*30-la_z,-lungh_z/2];
	pN_10=[la_x,-la_y*30,lungh_z]; 	pN_11=[la_x,-la_y*30,0]; pN_12=[la_x,-la_y*30,-lungh_z/2];


	
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

	curva2 = STRUCT([cIL2,cMN2,cIM2,cLN2]);

	return STRUCT([curva1, curva2]);
}

function sostegno1(){
  var c1 = T([1,2])([0.5,12.11])(CUBOID([larghezza*1.07,larAsse,larAsse]));
  return c1; 
}

function sostegno2(){
  var c2 = T([1,2])([8,-27.25])(CUBOID([larghezza*1.07,larAsse,larAsse]));
  return c2; 
}


function makeModel(){
	schienale = makeSchienale();
	profLaterleDx = T([0,1,2])([-3,altezza*0.65,1])(creaProfiloLaterale());
	profLaterleSx = T([0,1,2])([larghezza+larAsse,altezza*0.65,1])(creaProfiloLaterale());
	sostegni = STRUCT([sostegno1(),sostegno2()]);
	poangChair = COLOR(chair_color)(STRUCT([schienale,profLaterleDx,profLaterleSx,sostegni]));
	copertura = creaCuscino();
	poangChair = STRUCT([poangChair, copertura]);
}

function drawModel(){
	DRAW(poangChair);
} 

function hideModel(){
	HIDE(poangChair);
}

makeModel();
drawModel();
