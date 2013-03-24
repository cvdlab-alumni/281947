/*
Write a function select(data, key, values) that given an array of objects data, a string key and an array of values values, 
returns the array of objects where the property key is equal to one of the values in values. For example:

var data = [
  {id:'01', name:'duffy'},
  {id:'02', name:'michey'},
  {id:'03', name:'donald'},
  {id:'04', name:'goofy'},
  {id:'05', name:'minnie'},
  {id:'06', name:'scrooge'}
];
var key = 'name';
var values = ['goofy', 'scrooge'];

select(data, key, values)
// [ { id:'04', name:'goofy' }, { id:'06', name:'scrooge' } ]

*/

function function_select(data, key, values){
	var arrayFiltrato = [];

	data.forEach(function(itemData, index, array){  
		values.forEach(function(itemValori, index, array){
			if(itemData[key]===itemValori)
				arrayFiltrato.push(itemData);
		});
	});

	return arrayFiltrato;

}
