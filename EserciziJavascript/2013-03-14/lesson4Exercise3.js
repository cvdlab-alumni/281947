/*
exercise03

exercise03a

write a function that given a word return it capitalized

exercise03b

write a function that capitalize each word of the following text:

"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
*/

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

