	//Umbrella
	var raggio = 3; //raggioAsta
	var altezza = 120; //altezzaAsta
	var a = 5; // parametro bottomSpring
	var b = 2; // parametro bottomSpring
	var ribLenght = altezza*0.33;
	var dom2D = DOMAIN([[0,1],[0,1]])([30,30])
	var dom1D = INTERVALS(1)(32)

	//Funzioni di appoggio
	function creaCilindro(r,h){
		cyl = EXTRUDE([h])(DISK(r)(100));
		return cyl;
	}

	//ex 1
	function creaAstaManico(r,h){
		var astaCentrale = creaCilindro(r,h,5);
		var parteFinale = creaCilindro(r*1.2,altezza*0.05,5);
		var bottomSpring = creaBottomSpring();
		bottomSpring = T([0,2])([raggio,altezza*0.2])(bottomSpring);
		var strutturaFinale = STRUCT([astaCentrale,parteFinale,bottomSpring]);
		return strutturaFinale;
	}

	function creaBottomSpring(){
		var bottomSpring = TRIANGLE_DOMAIN(32, [[0,0,0],[b,0,0],[0,0,a]]);
		return bottomSpring;
	}


	//ex 3 
	function creaRibSingolo(){
		var pntControlloRib1 = [[0,0,0],[ribLenght/2,0,0],[ribLenght,0,-altezza*0.2]];
		var bezierRib1 = BEZIER(S0)(pntControlloRib1);
		mappedRib1 = MAP(bezierRib1)(dom1D);
		//mappedRib1 = T([0,2])([raggio, altezza*0.9])(mappedRib1);
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
		var bezierRib1 = BEZIER(S0)(pntControlloStret1);
		mappedRib1 = MAP(bezierRib1)(dom1D);

		stretcher = T([0,2])([raggio, altezza*0.75])(mappedRib1);

		return stretcher;
	}

	function creaStrutturaStretcher(){
		var pntControlloStret1 = [[0,0,0],[ribLenght*0.71,0,altezza*0.1]];
		var bezierRib1 = BEZIER(S0)(pntControlloStret1);
		mappedRib1 = MAP(bezierRib1)(dom1D);



	}



	function creaParteSup(){
		ribs = creaStrutturaRibs();
		strs = creaStrutturaStretcher();
		return STRUCT([rib,strs]);

	}


	manico = creaAstaManico(raggio,altezza);
	stretcher = creaParteSup();

	handle = STRUCT([manico,stretcher]);

	DRAW(handle);

