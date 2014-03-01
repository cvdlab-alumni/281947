	//Umbrella
	var raggio = 3; //raggioAsta
	var altezza = 120; //altezzaAsta
	var a = 5; // parametro bottomSpring
	var b = 2; // parametro bottomSpring
	var ribLenght = altezza*0.33;
	var dom2D = DOMAIN([[0,1],[0,1]])([30,30])
	var dom1D = INTERVALS(1)(32);
	var altezzaRunner = 10; //distanza da terra


	//Funzioni di appoggio

		function bezierMappata_1D(controlpoints){
			return BEZIER(S0)(controlpoints);
		}

		function bezierMappata_2D(functions){
			var x = BEZIER(S1)(functions)
		return MAP(x)(dom2D)
		}


	function creaCilindro(r,h){
		cyl = EXTRUDE([h])(DISK(r)(100));
		return cyl;
	}

	function arc (alpha, beta, r, R) {
		var domain = DOMAIN([[alpha,beta],[r,R]])([36,1]);
		var mapping = function (v) {
			var a = v[0];
			var r = v[1];
			return [r*COS(a), r*SIN(a)];
		}
		var model = MAP(mapping)(domain);
	return model;
	}

	var Circum = function(h, r){
		var Circum0 = function(v){
			return [r*COS(v[0]), r*SIN(v[0]), h];
	}
	return Circum0;
}

	//ex 1
	function creaAstaManico(r,h){
		var astaCentrale = creaCilindro(r,h,5);
		var parteFinale = creaCilindro(r*1.2,altezza*0.02,5);
		var bottomSpring = creaBottomSpring();
		bottomSpring = T([0,2])([raggio,altezza*0.2])(bottomSpring);

		var manico = creaManico();

		var strutturaFinale = STRUCT([astaCentrale,parteFinale,bottomSpring,manico]);
		return strutturaFinale;
	}

	function creaBottomSpring(){
		var bottomSpring = TRIANGLE_DOMAIN(32, [[0,0,0],[b,0,0],[0,0,a]]);
		return bottomSpring;
	}

	function creaManico(){
		var dim = raggio*1.7;
		var cub = CUBOID([dim,dim,6]);
		cub = T([0,1,2])([-dim/2,-dim/2,-dim])(cub);
		var arco =  EXTRUDE([5])(arc(-PI/2,PI/2,4,9));
		arco = R([0,2])([PI/2])(arco)
		arco = T([0,1,2])([-2,6.3,-4])(arco);
		return STRUCT([arco,cub]);
	}


	//ex 3 
	function creaRibSingolo(){
		var pntControlloRib1 = [[0,0,0],[ribLenght/2,0,0],[ribLenght,0,-altezza*0.2]];
		var bezierRib1 = BEZIER(S0)(pntControlloRib1);
		mappedRib1 = MAP(bezierRib1)(dom1D);
		return mappedRib1;

	}

	function creaStrutturaRibs(){
		var correzioneAltezzaStretcher = 0.95; //posiziono lo stretcher

		rib1 = T([0,2])([raggio, altezza*correzioneAltezzaStretcher])(creaRibSingolo());
		rib2 = T([0,2])([raggio, altezza*correzioneAltezzaStretcher])(creaRibSingolo());
		rib2 = ROTATE([0,1])(PI)(rib2);

		return STRUCT([rib1,rib2]);
	}

	function creaStretcherSingolo(){
		var pntControlloStret1 = [[0,0,0],[ribLenght*0.71,0,altezza*0.1]];
		var bezierStret1 = BEZIER(S0)(pntControlloStret1);
		stretcher = MAP(bezierStret1)(dom1D);
		return stretcher;
	}

	function creaStrutturaStretcher(){
		stretcher1 = T([0,2])([raggio,altezza*0.75])(creaStretcherSingolo());
		stretcher2 = T([0,2])([raggio,altezza*0.75])(creaStretcherSingolo());
		stretcher2 = ROTATE([0,1])(PI)(stretcher2);

		return STRUCT([stretcher1,stretcher2]);

	}

	function creaRunner(){
		var parteCilindricaInf = creaCilindro(raggio*1.2,altezzaRunner*0.8);
		var parteCilindricaSup = T([2])([altezzaRunner*0.8])(creaCilindro(raggio*1.4,altezzaRunner*0.2));

		return STRUCT([parteCilindricaInf,parteCilindricaSup]);
	}

	function creaTopSpring(){
		var topSpring = TRIANGLE_DOMAIN(32, [[0,0,0],[-b,0,a],[0,0,a]]);
		return topSpring;
	}

	function creaParteSup(){
		ribs = creaStrutturaRibs();
		strs = creaStrutturaStretcher();
		runner = T([2])([altezza*0.666])(creaRunner());
		topSpring = T([0,2])([-raggio,altezza*0.6])(creaTopSpring());
		creaTopNotch = creaTopNotch();
		punta = creaPunta();
		return STRUCT([ribs,strs,runner,topSpring,creaTopNotch,punta]);
	}

	function creaPunta(){
		var punta; 
		return STRUCT([punta]);

	}

	function creaTopNotch(){
		var cilindro = T([2])([altezza*0.925])(creaCilindro(raggio*1.2,2));
		return cilindro;
	}

	manico = creaAstaManico(raggio,altezza);
	parteSuperiore = creaParteSup();

	handle = STRUCT([manico,parteSuperiore]);

	DRAW(handle);

