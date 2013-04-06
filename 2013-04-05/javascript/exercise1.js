//Costanti

var altezzaPilastri = 4
var latoColonnaQuadrata = 0.37
var raggioColonnaSferica = 0.185
var distanzaAssePrimaFila = 3.94
var distanzaAssePrimaSecondaFila = 7.2
var solaio = 0.74
var altezzaComplessiva = solaio+altezzaPilastri



function pilastroQuadrato(lato, altezza){
	return CUBOID([lato,lato,altezza]);}

function pilastroCilindrico(r,h){
	return CYL_SURFACE([r,h])([100,1]);}

var pilQuadrato = pilastroQuadrato(latoColonnaQuadrata, altezzaPilastri) 
var pilCilindrico = pilastroCilindrico(raggioColonnaSferica, altezzaPilastri) 


var colonnaTraslataDietroP0 = T([2])([distanzaAssePrimaSecondaFila])(pilQuadrato)