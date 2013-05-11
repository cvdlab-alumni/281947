#Exercise 3
#Generate a model of a racing car wheels (see, e.g. here), and mount four wheel instances in the 2.5D car mock-up.
#Fella davide, 281947
from pyplasm import *

domcir = PROD([INTERVALS(2*PI)(36),INTERVALS(1)(36)])
dom2D = PROD([INTERVALS(1)(20),INTERVALS(1)(20)])


def Circle(altezza,raggio):
	def Circle0(v):
		return [raggio*COS(v[0]),raggio*SIN(v[0]),altezza]
	return Circle0

def creaCopertone(coloreCopertone,ColoreCerchio):
	c1 = Circle(0,0.5)
	c2 = Circle(0.3,0.6)
	c3 = Circle(0.15,0.3) #rientranza
	#
	fBezCopertone = MAP(BEZIER(S2)([c1,c2,c3]))(domcir)
	#
	cer1 = Circle(0.15,0.3)
	cer2 = Circle(0.15,0.28)
	#
	fBezCerchioneInterno = MAP(BEZIER(S2)([cer1,cer2]))(domcir)
	#
	cerchioInterno1 = Circle(0.15,0.01)
	cerchioInterno2 = Circle(0.15,0.1)
	#
	fBezCerchioInt = MAP(BEZIER(S2)([cerchioInterno1,cerchioInterno2]))(domcir)
	#
	return  STRUCT([COLOR(coloreCopertone)(fBezCopertone),COLOR(ColoreCerchio)(fBezCerchioInt),COLOR(ColoreCerchio)(fBezCerchioneInterno)])

def aggiungiDecorazioni(copertone):
	decorazione1 = T(3)(0.15)(CUBOID([0.2,0.3,0]))
	decorazione1 = T(1)(-0.1)(decorazione1)
	decorazione2 = T(3)(0.15)(CUBOID([0.2,0.3,0]))
	decorazione2 = T(1)(-0.1)(decorazione2)
	decorazione2 = T(2)(-0.3)(decorazione2)
	decorazione3 = T(3)(0.15)(CUBOID([0.3,0.2,0]))
	decorazione3 = T(1)(0.1)(decorazione3)
	decorazione3 = T(2)(-0.1)(decorazione3)
	decorazione4 = T(3)(0.15)(CUBOID([0.3,0.2,0]))
	decorazione4 = T(1)(-0.3)(decorazione4)
	decorazione4 = T(2)(-0.1)(decorazione4)
	decorazioni = STRUCT([decorazione1,decorazione2,decorazione3,decorazione4,copertone])
	return STRUCT([copertone,decorazioni])



copertone = aggiungiDecorazioni(creaCopertone(BLACK,WHITE))

VIEW(copertone)
