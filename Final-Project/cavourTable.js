//Cavour table
var cavourTable;
var altezzaTavolino = 8

function bezierMappata_2D(functions){
	var x = BEZIER(S1)(functions)
	return MAP(x)(dom2D)
}

function createLegDx(){
	pntControllo1 = [[0,0,0],[0,altezzaTavolino,0]];
	pntControllo1Bex =  BEZIER(S0)(pntControllo1);

	pntControllo2 = [[0,0,2],[0,altezzaTavolino,2]];
	pntControllo2Bex =  BEZIER(S0)(pntControllo2);

	c = bezierMappata_2D([pntControllo1Bex,pntControllo2Bex]);

	return c;

}


function createLegs(){
	leg1 = createLegDx(); 

	return leg1;
}

function createCavourTable(){
	legs = createLegs();

	cavourTable = STRUCT([legs]);
}

function drawModel(){
	DRAW(cavourTable);
}

function hideModel(){
	HIDE(coffeeTableModel);
}

createCavourTable();
drawModel();