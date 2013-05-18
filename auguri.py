from pyplasm import *

altezzaLettere = 8
distanzaLettere = 3

def traslaSuAsseX(valoreTraslazione, oggettoTraslazione):
	return STRUCT([T(1)(valoreTraslazione), (oggettoTraslazione)])

def traslaSuAsseY(valoreTraslazione, oggettoTraslazione):
	return STRUCT([T(2)(valoreTraslazione), (oggettoTraslazione)])

def traslaSuAsseZ(valoreTraslazione, oggettoTraslazione):
	return STRUCT([T(3)(valoreTraslazione), (oggettoTraslazione)])


#Make A
def creaA():
	c1 = CUBOID([1,1,5])
	c2 = CUBOID([1,1,5])
	c2 = traslaSuAsseX(4,c2)
	c3 = CUBOID([4,1,1])
	c3 = traslaSuAsseZ(4,c3)
	c4 = CUBOID([4,1,1])
	c4= traslaSuAsseZ(2,c4)
	A = STRUCT([c1,c2,c3,c4])
	return A


#Make U
def creaU():
	c1 = CUBOID([1,1,5])
	c2 = CUBOID([1,1,5])
	c2 = traslaSuAsseX(4,c2)
	c3 = CUBOID([5,1,1])
	U = STRUCT([c1,c2,c3])
	return U

#Make G
def creaG():
	c1 = CUBOID([1,1,5])
	c2 = CUBOID([5,1,1])
	c3 = CUBOID([1,1,2.5])
	c3 = traslaSuAsseX(4,c3)
	c4 = CUBOID([2,1,1]) #stanghetta sotto
	c4 = traslaSuAsseX(3,c4)
	c4 = traslaSuAsseZ(2,c4)
	c5 = CUBOID([2,1,1]) #stanghetta
	c5 = traslaSuAsseX(1,c5)
	c5 = traslaSuAsseZ(4,c5)
	G = STRUCT([c1,c2,c3,c4,c5])
	return G

#Make R
def creaR():
	c1 = CUBOID([1.5,1,5])
	c2 = CUBOID([5,1,2.5])
	c2 = traslaSuAsseZ(2.5,c2)
	c2Buco = CUBOID([2,1,1])
	c2Buco = traslaSuAsseX(2,c2Buco)
	c2Buco = traslaSuAsseZ(3.2,c2Buco)
	c2 = DIFFERENCE([c2,c2Buco])
	c3 = CUBOID([1,1,2.5])
	c3 = traslaSuAsseX(2.5,c3)
	c4 = CUBOID([2,1,3]) #stanghetta
	c4 = traslaSuAsseX(1,c4)
	c4 = ROTN([PI/2,[1,1,0]])(c4)
	R = STRUCT([c1,c2,c3])
	return R

#Make I
def creaI():
	return CUBOID([1,1,5])

#Make S
def creaS():
	c1 = CUBOID([5,1,1.5]) #Primo segmento basso
	c2 = CUBOID([1.5,1,2.5])
	c2 = traslaSuAsseX(3.5,c2)
	c3 = CUBOID([5,1,1.5])
	c3 = traslaSuAsseZ(2,c3)
	c4 = CUBOID([1,1,2.5])
	c4 = traslaSuAsseZ(2,c4)
	c5 = CUBOID([5,1,1])
	c5 = traslaSuAsseZ(4,c5)
	S = STRUCT([c1,c2,c3,c4,c5])
	return S

#Make B
def creaB():
	c1 = CUBOID([5,1,5])
	c2 = CUBOID([2,1,1])
	c2 = traslaSuAsseX(2.5,c2)
	c2 = traslaSuAsseZ(3,c2)
	c3 = CUBOID([2,1,1])
	c3 = traslaSuAsseX(2.5,c3)
	c3 = traslaSuAsseZ(1,c3)
	B = DIFFERENCE([c1,c2,c3])
	return B

#Make F
def creaF():
	c1 = CUBOID([1.5,1,5])
	c2 = CUBOID([5,1,1])
	c2 = traslaSuAsseZ(4,c2)
	c3 = CUBOID([4,1,1])
	c3 = traslaSuAsseZ(2,c3)
	F = STRUCT([c1,c2,c3])
	return F

#Make O
def creaO():
	c1 = CUBOID([5,1,5])
	c2 = CUBOID([2,1,2])
	c2 = traslaSuAsseX(1.5,c2)
	c2 = traslaSuAsseZ(1.5,c2)
	O = DIFFERENCE([c1,c2])
	return O

#Make T
def creaT():
	c1=CUBOID([5,1,2])
	c1=traslaSuAsseZ(3,c1)
	c2=CUBOID([2,1,5])
	c2=traslaSuAsseX(1.5,c2)
	T = STRUCT([c1,c2])
	return T

A=creaA()
A=traslaSuAsseZ(altezzaLettere,A)

U=creaU()
U=traslaSuAsseZ(altezzaLettere,U)
U=traslaSuAsseX(distanzaLettere*2,U)

G=creaG()
G=traslaSuAsseZ(altezzaLettere,G)
G=traslaSuAsseX(distanzaLettere*4,G)

U2 = creaU()
U2=traslaSuAsseZ(altezzaLettere,U2)
U2=traslaSuAsseX(distanzaLettere*6,U2)

R = creaR()
R = traslaSuAsseZ(altezzaLettere,R)
R = traslaSuAsseX(distanzaLettere*8,R)

I = creaI()
I = traslaSuAsseZ(altezzaLettere,I)
I = traslaSuAsseX(distanzaLettere*10,I)

S = creaS()

B = creaB()
B = traslaSuAsseX(distanzaLettere*2,B)

A2 = creaA()
A2 = traslaSuAsseX(distanzaLettere*4,A2)

F= creaF()
F = traslaSuAsseX(distanzaLettere*6,F)

F2 = creaF()
F2 = traslaSuAsseX(distanzaLettere*8,F2)

O = creaO()
O = traslaSuAsseX(distanzaLettere*10,O)

TL = creaT()
TL = traslaSuAsseZ(altezzaLettere*2,TL)

A3 = creaA()
A3 = traslaSuAsseZ(altezzaLettere*2,A3)
A3 = traslaSuAsseX(distanzaLettere*2,A3)

fraseFinale = STRUCT([A,U,G,U2,R,I,S,B,A2,F,F2,O])

VIEW(fraseFinale)