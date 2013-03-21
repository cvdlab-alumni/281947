function function_capitalizeFirstLetter(s){
	var primoCarattereDown = s.substring(0,1)
	var primoCarattereUp = s.substring(0,1);

	primoCarattereUp = primoCarattereUp.toUpperCase();

	console.log(primoCarattereDown);
    console.log(primoCarattereUp);

	s = s.replace(primoCarattereDown,primoCarattereUp);

	return s;
}


