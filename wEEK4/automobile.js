// Tucker Lavell
// CS290-Spring 2018
// Vehicle Sorter
function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
    /*your code here*/
    var sorted = [].concat(array);
    
	// bubble sort from: https://stackoverflow.com/questions/7502489/bubble-sort-algorithm-javascript
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < sorted.length-1; i++) {
            if (comparator(sorted[i+1], sorted[i])) {
                var temp = sorted[i];
                sorted[i] = sorted[i+1];
                sorted[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    
    return sorted;

}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    /* your code here*/
	return (auto1.year > auto2.year);
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    /* your code here*/
    var make1 = auto1.make.toLowerCase();
    var make2 = auto2.make.toLowerCase();
    
	return (make1 < make2);
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    /* your code here*/
    var type1 = auto1.type.toLowerCase();
    var type2 = auto2.type.toLowerCase();
    
    switch (type1) {
    	case 'roadster': type1 = 4;
      	break;
      case 'pickup': type1 = 3;
      	break;
      case 'suv': type1 = 2;
      	break;
      case 'wagon': type1 = 1;
      	break;
      default: type1 = 0;
      	break;
    }
    
    switch (type2) {
    	case 'roadster': type2 = 4;
      	break;
      case 'pickup': type2 = 3;
      	break;
      case 'suv': type2 = 2;
      	break;
      case 'wagon': type2 = 1;
      	break;
      default: type2 = 0;
      	break;
    }
    
    if (type1 > type2) {
    	return true;
    }
    else if (type1 < type2) {
    	return false;
    }
    else {
		// gives the one with the greater year if they are same type
		if (yearComparator(auto1, auto2)) {
			return true;
		}
		else {
		  return false
		}
	}
}

function printArr(array){

    for(var i = 0; i < array.length; i++) {
        var vehicle = array[i];

        console.log(vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model + ' ' + vehicle.type);  
    }
}

 

console.log('*****');
console.log('The cars sorted by year are:');
var yearSort = sortArr(yearComparator, automobiles);
printArr(yearSort);
console.log('');

console.log('The cars sorted by make are:');
var makeSort = sortArr(makeComparator, automobiles);
printArr(makeSort);
console.log('');

console.log('The cars sorted by type are:');
var typeSort = sortArr(typeComparator, automobiles);
printArr(typeSort);
console.log('*****');


