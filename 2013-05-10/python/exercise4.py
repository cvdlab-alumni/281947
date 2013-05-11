from pyplasm import *

domC = PROD([INTERVALS(2*PI)(36),INTERVALS(1)(36)])


def Circle(altezza,raggio):
	def Circle0(v):
		return [raggio*COS(v[0]),raggio*SIN(v[0]),altezza]
	return Circle0


def creaVolante():
	c1 = Circle(0,1)
	c2 = Circle(0.3,1)
	c3 = Circle(0,0.5)
	c4 = Circle(0.3,0.5)
	#
	fBezVolante = MAP(BEZIER(S2)([c1,c2]))(domC)
	#
	return STRUCT([fBezVolante])

VIEW(creaVolante())