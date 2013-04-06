#Fella Davide - 281947
from pyplasm import *;

#Funzioni
def pilastroQuadrato(lato, altezza):
	return CUBOID([lato,lato,altezza])

def pilastroCilindrico(raggio,altezza):
	return CYLINDER([raggio,altezza])(36)

def ROTN (args):
   	alpha, n = args
    n = UNITVECT(n)
    qx = UNITVECT((VECTPROD([[0,0,1], n])))
    qz = UNITVECT(n)
    qy = VECTPROD([qz,qx])
    Q = MATHOM([qx, qy, qz])
    if n[0]==0 and n[1]==0:
        return R([1, 2])(alpha)
    else:
        return COMP([MAT(TRANS(Q)),R([1,2])(alpha),MAT(Q)])


#Costanti

altezzaPilastri = 4
latoColonnaQuadrata = 0.37
raggioColonnaSferica = 0.185
distanzaAssePrimaFila = 3.94
distanzaAssePrimaSecondaFila = 7.2
solaio = 0.74
altezzaComplessiva = solaio+altezzaPilastri



pilQuadrato = pilastroQuadrato(latoColonnaQuadrata, altezzaPilastri) #Definisco un pilastro quadrato
pilCilindrico = pilastroCilindrico(raggioColonnaSferica, altezzaPilastri) #Definisco un pilastro sferico

#cilindroRuotato = ROTN([PI/2, [0,0,1]])(pilCilindrico)
#altraTrasl = [R([1,2])(PI/4),(traslazioneColonneQuadrateP0)]

#pillar-Floor1 (P0 - pillars0)

colonnaTraslataDietroP0 = T(2)(distanzaAssePrimaSecondaFila)(pilQuadrato) #Traslo la colonna quadrata

filaColonneSfericheP0 = STRUCT(NN(5)([T(1)(distanzaAssePrimaFila),(pilCilindrico)])) #ripeto la traslazione per il numero di colonne cilindriche
filaColonneQuadrateP0 = STRUCT(NN(4)([T(1)(distanzaAssePrimaFila),(colonnaTraslataDietroP0)])) #ripeto la traslazione per il numero di colonne quadrate


#Unisco i pilastri, aggiungendo il primo pilastro cilindrico della fila dietro e li aggiungo a building
pillars0 = STRUCT([filaColonneSfericheP0, T(1)(distanzaAssePrimaFila),(filaColonneQuadrateP0), T([2])([distanzaAssePrimaSecondaFila]),(pilCilindrico)])
building = STRUCT([pillars0])


#pillar - Floor2

colonnaTraslataDietroP1 = T(2)(distanzaAssePrimaSecondaFila)(pilQuadrato)

filaColonneQuadrateAvantiP1 = STRUCT(NN(5)([T(1)(distanzaAssePrimaFila),(pilQuadrato)]))
filaColonneQuadrateDietroP1 = STRUCT(NN(3)([T(1)(distanzaAssePrimaFila),(colonnaTraslataDietroP1)]))

pillars1 = (STRUCT([ filaColonneQuadrateAvantiP1, filaColonneQuadrateDietroP1, 
	                 T([1,2])([distanzaAssePrimaFila*4, distanzaAssePrimaSecondaFila])(pilCilindrico), 
	                 T([1,2])([distanzaAssePrimaFila*5, distanzaAssePrimaSecondaFila])(pilQuadrato)]))


building = STRUCT([building,T(3)(altezzaComplessiva),(pillars1)])


#Pillar - Floor3



filaColonneQuadrateDietroP2 = STRUCT(NN(5)([T(1)(distanzaAssePrimaFila),(colonnaTraslataDietroP0)]))
filaColonneAvantiP2 =  STRUCT(NN(2)([T(1)(distanzaAssePrimaFila),(pilQuadrato)]))

pillars2 = (STRUCT([ filaColonneAvantiP2, filaColonneQuadrateDietroP2, T(1)(distanzaAssePrimaFila*5),(pilQuadrato)]))

building = STRUCT([building,T(3)(altezzaComplessiva*2),(pillars2)])

#pillar - Floor4

colonnaQuadrataPiccola = T(2)(distanzaAssePrimaSecondaFila)(pilastroQuadrato(latoColonnaQuadrata/2,altezzaPilastri))
colonnaQuadrataTraslataDietroP3 = T(2)(distanzaAssePrimaSecondaFila)(pilQuadrato)


filaColonneAvantiP3 = STRUCT([T(1)(distanzaAssePrimaFila*3),(pilQuadrato), T(1)(distanzaAssePrimaFila*2),(pilQuadrato)])
filaColonnePiccoleP3= STRUCT([T(1)(distanzaAssePrimaFila),(colonnaQuadrataPiccola), T(1)(distanzaAssePrimaFila),(colonnaQuadrataPiccola)])
filaColonneGrandiP3 = STRUCT([T(1)(distanzaAssePrimaFila*3),(colonnaQuadrataTraslataDietroP3 ),
                             T(1)(distanzaAssePrimaFila),(colonnaQuadrataTraslataDietroP3 ),
                             T(1)(distanzaAssePrimaFila),(colonnaQuadrataTraslataDietroP3 ),
	                        ])



pillars3 = STRUCT([filaColonneAvantiP3,filaColonnePiccoleP3,filaColonneGrandiP3])


building = STRUCT([building,T(3)(altezzaComplessiva*3),(pillars3)])


building = STRUCT([T(1)(-distanzaAssePrimaFila),(building)])
VIEW(building)









