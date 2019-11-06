// found some help from online resources
var deepEqual = function(obj1, obj2) {
	// if both objects type and value are the same return true
	// assignment documentation implies use === as first check
	if (obj1 === obj2) {
		return true;
	}
	
	// if obj1 is an object and not null
	// AND obj2 is an object and not null
	else if ((typeof(obj1) == "object" && obj1 != null) &&
		(typeof(obj2) == "object" && obj2 != null)) {
			// check if the arrays returned by object.keys have the same length 
			if (Object.keys(obj1).length != Object.keys(obj2).length) {
				return false;
			}
			// check the property of each item inside obj1 
			for (var p in obj1) {
				// if obj2 has the same property
				if (obj2.hasOwnProperty(p)) {
					// use recursion to compare the values of the matching properties
					if (!deepEqual(obj1[p], obj2[p])) {
						return false;
					}
				}
				else {
					return false;
				}
				
			}
			return true;
		}
		
	// fall through for values with no equivalences
	else {
		return false;
	}
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// ? true
console.log(deepEqual(obj, {here: 1, object: 2}));
// ? false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// ? true