function function_capitalizeFirstLetter(s){
	var primoCarattereDown = s.substring(0,1)
	var primoCarattereUp = s.substring(0,1);

	primoCarattereUp = primoCarattereUp.toUpperCase();

	s = s.replace(primoCarattereDown,primoCarattereUp);

	return s;
}


function upAllWords(s){
	var arraySplittato = s.split(' ');
	var arrayConcatenato = "";

	for(var i=0;i<arraySplittato.length;i++){
		 arraySplittato[i] = function_capitalizeFirstLetter(arraySplittato[i]);
		 var stringaDaConcatenare = arraySplittato[i] + " ";
		 arrayConcatenato = arrayConcatenato.concat(stringaDaConcatenare);

	}

	return arrayConcatenato;

}

