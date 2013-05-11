#Generate the 2D profile curves of the car envelope in the three coordinate directions, 
#embed them in 3D (in the x=0, y=0 and z=0 planes, respectively, with the reference frame 
#origin set approximately at the car centroid) and mount them together in a "two-and-a-half-dimensional" 
#(2.5D) or "pseudo-3D" model.
#Fella davide, 281947

from pyplasm import *
import sys
sys.path.append("C:\Users\Dvidi\Documents\Sviluppo\GitHub\larpy")
from lar import *

domain = INTERVALS(1)(20)
profonditaMacchina = 3.5

First = 1.3 #inizioMacchinaFinoAPrimaruota
dR1R2 = 4.5 #distanzaTraLeDueRuote
h_R = 1 #altezza ruota
l_R = 1.5 #larghezza ruota
final= 0.8 #tratto dopo la seconda ruota



##############################################################
#Piano con y = 0
##############################################################
def creaProfiloBasso_xz():
	puntiTrattoUno=[[0,0,0.1],[First,0,0]]	#tratto fino alla ruota anteriore, impostato a 1,5		
	puntiRuotaAnteriore=[[First,0,0],[First,0,0], [First,0,h_R],[First,0,h_R], [First+l_R,0,h_R],[First+l_R,0,h_R], [First+l_R,0,0],[First+l_R,0,0]]
	puntiTrattoCentrale=[[First+l_R,0,0],[dR1R2+First+l_R,0,0]] #tratto centrale, impostato a 4.5
	puntiRuotaPosteriore=[[dR1R2+First+l_R,0,0],[dR1R2+First+l_R,0,0], [dR1R2+First+l_R,0,h_R],[dR1R2+First+l_R,0,h_R], [dR1R2+First+l_R*2,0,h_R],[dR1R2+First+l_R*2,0,h_R], [dR1R2+First+l_R*2,0,0],[dR1R2+First+l_R*2,0,0]]
	puntiParteFinale=[[dR1R2+First+l_R*2,0,0],[dR1R2+First+l_R*2+final,0,0]]
	puntiInizioCofano=[[dR1R2+First+l_R*2+final,0,0],[dR1R2+First+l_R*2+final,0,0.6]]
	#
	fbezTrattoUno = BEZIER(S1)(puntiTrattoUno)
	fbezTrattoDue = BEZIER(S1)(puntiTrattoCentrale)
	fbezRuotaAnteriore = BEZIER(S1)(puntiRuotaAnteriore)
	fbezRuotaPosteriore = BEZIER(S1)(puntiRuotaPosteriore)
	fbezParteFinale = BEZIER(S1)(puntiParteFinale)
	fbezInizioCofano=BEZIER(S1)(puntiInizioCofano)
	#
	fMap1 = MAP(fbezTrattoUno)(domain)
	fMap2 = MAP(fbezTrattoDue)(domain)
	fMap3 = MAP(fbezRuotaAnteriore)(domain)
	fMap4 = MAP(fbezRuotaPosteriore)(domain)
	fMap5 = MAP(fbezParteFinale)(domain)
	fMap6 = MAP(fbezInizioCofano)(domain)
	#
	return STRUCT([fMap1,fMap2,fMap3,fMap4,fMap5,fMap6])

def creaCofano_xz():
	#punto inizio z=0.2, parte piu piccola alta 0.6, cofano lungo 2.1 e alto 1.5
	puntiCofano = [[0,0,0.1],[0,0,0.6],[0,0,0.6],[0.5,0,0.6],[1,0,0.8],[1.3,0,0.9],[1.5,0,1],[1.7,0,1.2],[1.9,0,1.4],[2.1,0,1.5]]
	#
	fBezCofano=BEZIER(S1)(puntiCofano)
	#
	fMapCofano=MAP(fBezCofano)(domain)
	return STRUCT([fMapCofano])

def creaAbitacolo_xz():
	#punto iniziale [2.1,0,1.5]
	puntiAbitacolo = [[2.1,0,1.5],[3.5,0,3.2],[8.6,0,1.5]]
	#
	fBezAbitacolo=BEZIER(S1)(puntiAbitacolo)
	#
	fMapAbitacolo=MAP(fBezAbitacolo)(domain)
	return STRUCT([fMapAbitacolo])

def creaBagaglio_xz():
	puntiFinale = [[8.6,0,1.5],[8.8,0,0.9],[9.6,0,0.6]]
	#
	fBezFinale=BEZIER(S1)(puntiFinale)
	#
	fMapFinale=MAP(fBezFinale)(domain)	
	#
	return STRUCT([fMapFinale])

def creaXZ():
	profiloBasso=creaProfiloBasso_xz()
	cofano=creaCofano_xz()
	abitacolo=creaAbitacolo_xz()
	bagaglio = creaBagaglio_xz()
	return STRUCT([profiloBasso,cofano,abitacolo,bagaglio])

profiloy0 = creaXZ()
#VIEW(profiloy0)

##############################################################
#Piano con x = 0
##############################################################
altezzaParteVerticale = 0.6

def creaParteVerticale_yz():
	puntiverticaliSx= [[0,0,0.1],[0,0,altezzaParteVerticale]]
	puntiverticaliDx=[[0,profonditaMacchina,0.1],[0,profonditaMacchina,altezzaParteVerticale]]
	#
	fBezPVerticaliSx = BEZIER(S1)(puntiverticaliSx)
	fBezPVerticaliDx = BEZIER(S1)(puntiverticaliDx)
	#
	fMapPVerticaliSx = MAP(fBezPVerticaliSx)(domain)
	fMapPVerticaliDx = MAP(fBezPVerticaliDx)(domain)
	#
	return STRUCT([fMapPVerticaliSx,fMapPVerticaliDx])

def creaParteSuperioreTonda():
	puntiSuperioriDx=[[0,0,altezzaParteVerticale],[0,0.2,altezzaParteVerticale+0.4],[0,0.5,altezzaParteVerticale+0.4],[0,0.5,altezzaParteVerticale+0.4]]
	puntiSuperioriSx=[[0,profonditaMacchina,altezzaParteVerticale],[0,profonditaMacchina-0.2,altezzaParteVerticale+0.4],[0,profonditaMacchina-0.5,altezzaParteVerticale+0.4]]
	#
	fBezParteSuperioreDx = BEZIER(S1)(puntiSuperioriDx)
	fBezParteSuperioreSx = BEZIER(S1)(puntiSuperioriSx)
	#
	fMapParteSuperioreDx = MAP(fBezParteSuperioreDx)(domain)
	fMapParteSuperioreSx = MAP(fBezParteSuperioreSx)(domain)
	#
	return STRUCT([fMapParteSuperioreDx,fMapParteSuperioreSx])

def creaMuso_yz():
	puntiMuso = [[0,0,0.1],[0,0,0],[0,profonditaMacchina,0],[0,profonditaMacchina,0.1]]
	#
	fBezMuso = BEZIER(S1)(puntiMuso)
	#
	fMapMuso=MAP(fBezMuso)(domain)
	return STRUCT([fMapMuso])

def creaAbitacolo_yz():
	puntiAbitacoloSx = [[0,0.5,altezzaParteVerticale+0.4],[0,0.7,altezzaParteVerticale+1.2]]
	puntiAbitacoloDx = [[0,profonditaMacchina-0.5,altezzaParteVerticale+0.4],[0,profonditaMacchina-0.7,altezzaParteVerticale+1.2]]
	#
	fBezAbitacoloSx = BEZIER(S1)(puntiAbitacoloSx)
	fBezAbitacoloDx = BEZIER(S1)(puntiAbitacoloDx)
	#
	fMapAbitacoloSx= MAP(fBezAbitacoloSx)(domain)
	fMapAbitacoloDx = MAP(fBezAbitacoloDx)(domain)
	#
	return STRUCT([fMapAbitacoloDx,fMapAbitacoloSx])

def creaParteSuperioreAbitacolo():
	puntiAbitacoloSuperiore = [[0,profonditaMacchina-0.7,altezzaParteVerticale+1.2],[0,0.7,altezzaParteVerticale+1.2]]
	#
	fBezSuperiore = BEZIER(S1)(puntiAbitacoloSuperiore)
	#
	fMapSuperiore =  MAP(fBezSuperiore)(domain)
	#
	return STRUCT([fMapSuperiore])

def creaYZ():
	muso = creaMuso_yz()
	parteVerticale = creaParteVerticale_yz()
	parteSuperiore = creaParteSuperioreTonda()
	abitacolo = creaAbitacolo_yz()
	parteSuperiorePiatta = creaParteSuperioreAbitacolo()
	return STRUCT([parteVerticale,muso,parteSuperiore,abitacolo,parteSuperiorePiatta])

profilox0 = creaYZ()
#VIEW(STRUCT([profiloy0,profilox0]))

##############################################################
#Piano con z = 0
##############################################################
def creaArcoSinistra():
	parteSinistra = [[0.1,0.3,0],[-0.1,(profonditaMacchina-0.3)/2,0],[0.1,(profonditaMacchina-0.3),0]]
	#
	fBezSx = BEZIER(S1)(parteSinistra)
	#
	fMapSx =  MAP(fBezSx)(domain)
	return STRUCT([fMapSx])

def creaCompletamentoArcoSinistra():
	puntiSx = [[0.1,0.3,0],[0.1,0,0],[0.5,0,0]]
	puntiDx = [[0.1,(profonditaMacchina-0.3),0],[0.1,profonditaMacchina,0],[0.5,profonditaMacchina,0]]
	#
	fBezSx = BEZIER(S1)(puntiSx)
	fBezDx = BEZIER(S1)(puntiDx)
	#
	fMapSx =  MAP(fBezSx)(domain)
	fMapDx =  MAP(fBezDx)(domain)
	return STRUCT([fMapSx,fMapDx])

def creaParteCentrale():
	puntiParteSup = [[0.5,profonditaMacchina,0],[((dR1R2+First+l_R*2+final)-0.5)/2,profonditaMacchina-0.2,0],[dR1R2+First+l_R*2+final,profonditaMacchina,0]]
	puntiParteInf = [[0.5,0,0],[((dR1R2+First+l_R*2+final)-0.5)/2,0.2,0],[dR1R2+First+l_R*2+final,0,0]]
	#
	fBezSup = BEZIER(S1)(puntiParteSup)
	fBezInf = BEZIER(S1)(puntiParteInf)
	#
	fMapSx =  MAP(fBezInf)(domain)
	fMapDx =  MAP(fBezSup)(domain)
	#
	return STRUCT([fMapSx,fMapDx])

def creaParteFinale():
	p1Inf = [[(dR1R2+First+l_R*2+final),0,0],[dR1R2+First+l_R*2+final,profonditaMacchina,0]]
	#
	fBezP1 = BEZIER(S1)(p1Inf)
	#
	fMapInf = MAP(fBezP1)(domain)
	return STRUCT([fMapInf])

def creaXY():
	arcoSinistra=creaArcoSinistra()
	arcoSinistraCompletamento = creaCompletamentoArcoSinistra()
	centrale = creaParteCentrale()
	parteFinale = creaParteFinale()
	return STRUCT([parteFinale,arcoSinistra,arcoSinistraCompletamento,centrale])


profiloz0 = creaXY()

VIEW(STRUCT([profiloz0]))



#VIEW(STRUCT([profiloz0,profilox0,profiloy0]))


