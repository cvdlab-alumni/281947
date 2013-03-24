/*
write a script exercise01.js that prints in console the following multiplication table, then commit it and push it:
*/

var matrix = "";

for(var i=1; i<11; i++){
	for(var j=1; j<11; j++){
		matrix += (i*j) + '\t';
		}
	matrix += '\n';
}

console.log(matrix);
