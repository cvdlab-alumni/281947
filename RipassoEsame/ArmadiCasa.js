		var dom2D = DOMAIN([[0,1],[0,1]])([30,30])
		var dom1D = INTERVALS(1)(32)

		var altezzaArmadio = 26.3;
		var larghezzaArmadio = 9.6;
		var profonditàArmadio = 6.2;
		var larghezzaSporgenze = 0.05;
		var profonditaSporgenza = 0.05;

		/* Occhi */
		var diametroOcchi = 1.3;
		var altezzaOcchiDaTerra = 12.1;
		var spazioSinistro = larghezzaArmadio/2 - diametroOcchi;
		var spazioDestro = diametroOcchi*2;
		var spazioTraGliOcchi = 1.7;
		var raggioCirconferenzaEsterno = diametroOcchi/(2*PI);
		var profonditaCirconferenza = 0.02;

		var diametroOcchiInterno = 0.75;
		var raggioCirconferenzaInterno = diametroOcchiInterno/(2*PI);

		/* Colori */  
		var redd =[1,0.5,0];
		var red = [1,0,0]; 
		var blue = [0,0,1]; 
		var green = [0,1,0]; 
		var yellow = [1,1,0]; 
		var black = [0.3,0.3,0.3]; 
		var white = [1,1,1]; 
		var dark_grey = [41/256,41/256,41/256]; 
		var gold = [205/256,173/256,0]; 
		var glass_color = [185/256,211/256,238/256,0.6]; 


		/* UTILITY */
		function arc (alpha, r, R) {
			var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
			
			var mapping = function (v) {
				var a = v[0];
				var r = v[1];
				return [r*COS(a), r*SIN(a)];
			}

			var model = MAP(mapping)(domain);
			return model;
		} 

		var CYLINDER = function(r,h){
		  function C0(l){
			  var s = CYL_SURFACE([r,h])(l);
			  var b1 = DISK(r)(l);
			  var b2 = T([2])([h])(b1);
			  return STRUCT([s,b1,b2]);
		  }
		  return C0;
		}

		function bezierMappata_1D(controlpoints){
			return BEZIER(S0)(controlpoints);
		}

		function bezierMappata_2D(functions){
			var x = BEZIER(S1)(functions)
		return MAP(x)(dom2D)
		}

		/* Funzioni per il progetto*/

		function CreaArmadio(){
			var armadio;
			strutturaArmadio = COLOR(white)(CUBOID([larghezzaArmadio,altezzaArmadio,profonditàArmadio]));
			occhio = T([0,1,2])([spazioSinistro,altezzaOcchiDaTerra,(profonditàArmadio+profonditaCirconferenza)])(creaOcchi());
			separatore = creaSeparatoreAnte();
			sporgenze = creaSporgenze();
			lingua = disegnaLingua();

			armadio = STRUCT([strutturaArmadio, occhio, separatore, sporgenze,lingua]);
			return armadio;
		}

		function creaOcchi(){
			circonferenzaEsternaSx = arc(2*PI,raggioCirconferenzaEsterno*0.95, raggioCirconferenzaEsterno);
			circonferenzaEsternaDx = arc(2*PI,raggioCirconferenzaEsterno*0.95, raggioCirconferenzaEsterno);
			circonferenzaEsternaDx = T([0])([spazioDestro])(circonferenzaEsternaDx); //spazio l'occhio destro

			occhioInternoSx = arc(2*PI,0,raggioCirconferenzaInterno);
			occhioInternoDx = arc(2*PI,0,raggioCirconferenzaInterno);
			
			/*Muovo gli occhi*/
			correzioneAssex = -0.065;
			correzioneAssey = -0.05;

			occhioInternoDx = T([0,1])([spazioDestro+correzioneAssex, correzioneAssey])(occhioInternoDx); //spazio l'occhio destro
			occhioInternoSx = T([0,1])([correzioneAssex,correzioneAssey])(occhioInternoSx);

			var occhio = STRUCT([circonferenzaEsternaSx,circonferenzaEsternaDx,occhioInternoSx,occhioInternoDx]);
			occhio = EXTRUDE([profonditaCirconferenza])(occhio);
			occhio = COLOR(red)(occhio);
			return occhio;
		}

		function creaSeparatoreAnte(){
			var separatore = CUBOID([0.01,altezzaArmadio,profonditaCirconferenza]);
			separatore = T([0,2])([larghezzaArmadio/2,profonditàArmadio])(separatore);
			separatore = COLOR(red)(separatore);
			return separatore;
		}

		function creaSporgenze(){
			var StrutturaSporgenzaSx = CUBOID([larghezzaSporgenze, altezzaArmadio, profonditaSporgenza]);
			var StrutturaSporgenzaDx = CUBOID([larghezzaSporgenze, altezzaArmadio, profonditaSporgenza]);


			var cilSx = CYLINDER(larghezzaSporgenze/2, altezzaArmadio)([24, 1]);
			cilSx = R([1,2])(-PI/2)(cilSx);
			cilSx = T([0,2])([larghezzaSporgenze/2, larghezzaSporgenze])(cilSx);
			var cilDx = CYLINDER(larghezzaSporgenze/2, altezzaArmadio)([24, 1]);
			cilDx = R([1,2])(-PI/2)(cilDx);
			cilDx = T([0,2])([larghezzaSporgenze/2, larghezzaSporgenze])(cilDx);
			

			var sporgenzaSx = STRUCT([cilSx,StrutturaSporgenzaSx]);
			sporgenzaSx = T([2])([profonditàArmadio])(sporgenzaSx);
			var sporgenzaDx = STRUCT([cilDx,StrutturaSporgenzaDx]);
			sporgenzaDx = T([0,2])([larghezzaArmadio,profonditàArmadio])(sporgenzaDx);

			var finalSporgenze = STRUCT([sporgenzaSx,sporgenzaDx]);

			return COLOR(red)(finalSporgenze);
		}


		function disegnaLingua(){
			var altezzaLabbro = 0.25;
			var lunghezzaLabbro = 5;
			var profondita = 2;
			var altezzaDaTerra = altezzaOcchiDaTerra*0.8;

			var altezzaLingua = -8;
			var larghezzaLingua = 2.5;
			var correzione = 0.5

			pntControlloC1 = [[0,altezzaLabbro/2,0],  [lunghezzaLabbro*0.025,0,0],  [lunghezzaLabbro*0.025,0,0], [lunghezzaLabbro*0.05,0,0],  [lunghezzaLabbro*0.05,0,0],  [lunghezzaLabbro*0.5,(-altezzaLabbro*0.2),0], [lunghezzaLabbro*0.95,0,0], [lunghezzaLabbro*0.95,0,0], [lunghezzaLabbro*0.98,0,0],  [lunghezzaLabbro*0.98,0,0],  [lunghezzaLabbro,altezzaLabbro/2,0]];
			bezierC1 = BEZIER(S0)(pntControlloC1);
			//mappedC1 = MAP(bezierC1)(dom1D);
			//DRAW(mappedC1); //--> per disegnarla1

			pntControlloC2 = [[0,altezzaLabbro/2,0],  [lunghezzaLabbro*0.025,altezzaLabbro,0],  [lunghezzaLabbro*0.025,altezzaLabbro,0],   [lunghezzaLabbro*0.05,altezzaLabbro,0],    [lunghezzaLabbro*0.05,altezzaLabbro,0],    [lunghezzaLabbro*0.5,altezzaLabbro*0.2,0],       [lunghezzaLabbro*0.95,altezzaLabbro,0],	 [lunghezzaLabbro*0.95,altezzaLabbro,0],    [lunghezzaLabbro*0.98,altezzaLabbro,0], [lunghezzaLabbro*0.98,altezzaLabbro,0], [lunghezzaLabbro,altezzaLabbro/2,0]];
			bezierC2 = BEZIER(S0)(pntControlloC2);
			
			pntControlloC3 = [[0,0,0], [0,altezzaLingua,0], [larghezzaLingua,altezzaLingua,0],[larghezzaLingua,0,0]];
			bezierC3 = BEZIER(S0)(pntControlloC3);

			pntControlloC4 = [[correzione,0,0], [correzione,altezzaLingua-correzione,0], [larghezzaLingua-correzione,altezzaLingua+correzione*2,0],[larghezzaLingua-correzione,0,0]];
			bezierC4 = BEZIER(S0)(pntControlloC4);

			c1 = bezierMappata_2D([bezierC1,bezierC2]);
			c2 = bezierMappata_2D([bezierC3,bezierC4]);
			c2 = T([0,1])([larghezzaLingua,0.12])(c2);

			var struttura = STRUCT([c1,c2]);
			struttura = T([0,1,2])([larghezzaArmadio/4, altezzaDaTerra, profonditàArmadio+0.01])(struttura);
			struttura = COLOR(red)(struttura);

			return struttura;
		}

		var armadio = CreaArmadio();

		//DRAW(armadio);


