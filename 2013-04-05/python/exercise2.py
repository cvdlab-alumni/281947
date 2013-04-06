#Fella Davide - 281947
from pyplasm import *;


#Funzioni
GRID = COMP([INSR(PROD),AA(QUOTE)])


#Variabili

solaio = 0.74
altezzaPiano = 4



#Floor 0
parte1=GRID([ [2.06] , [-7.59,2.11] , [solaio] ])
parte2=GRID([ [-2.06,10.07] , [-3.30,6.4] , [solaio] ])
parte3=GRID([ [-12.13,0.5], [-4.65,5.05], [solaio]  ])
parte4=GRID([ [-12.63,0.5], [-5.98, 3.73], [solaio]  ])


floor0=STRUCT([parte1,parte2,parte3,parte4])





#Floor 1

balcone= CUBOID([1.60,1.60,solaio])
balcone = STRUCT([T([1,2])([-1.60,7.66]),(balcone)])


floor1=GRID([ [16.12], [9.70], [solaio] ])
floor1Completo=STRUCT([floor1,balcone])

bucoScale = STRUCT([T([1,2])([1.72,7.74]),(CUBOID([2.99,1.51,solaio]))])

floor1Completo = DIFFERENCE([floor1Completo,bucoScale ])


#Floor 2

floor2 = GRID([ [16.12], [9.70], [solaio] ])
bucoScaleF2 = STRUCT([T([1,2])([1.72,7.74]),(CUBOID([5.02,1.51,solaio]))])

floor2Completo = STRUCT([DIFFERENCE([floor2,bucoScaleF2 ])  ])


#Floor 3

floor3 = GRID([ [16.12], [9.70], [solaio] ])

bucoScaleF3 = STRUCT([T([1,2])([8.30,7.74]),(CUBOID([4.41,1.51,solaio]))])
bucoSolaio = STRUCT([T([1,2])([0.4,0.37]),(CUBOID([7.58,9.06,solaio]))])

floor3Completo = STRUCT([DIFFERENCE([floor3,bucoScaleF3,bucoSolaio  ])  ])


#Floor 4

floor4 = GRID([ [16.12], [9.70], [solaio] ])

bucoSolaioF4 = STRUCT([T([1,2])([0.4,0.37]),(CUBOID([7.58,7.35,solaio]))])
floor4Completo = STRUCT([DIFFERENCE([floor3,bucoSolaioF4])])


structure = STRUCT([floor0, 
	               T(3)(altezzaPiano),(floor1Completo), 
	               T(3)(altezzaPiano),(floor2Completo), 
	               T(3)(altezzaPiano),(floor3Completo), 
	               T(3)(altezzaPiano),(floor4Completo)])



VIEW(structure)