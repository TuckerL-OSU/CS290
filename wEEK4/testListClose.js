function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + list[i];
        result.push( function(i) {
        	return function() { 
          	alert(item + ' ' + list[i]) }
        } (i));
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();

// I got it to display item3 1, item3 2, and item3 3
// but I could not figure out how to combine it for item1 1, etc.
// I did end up googling it and it wasn't much different
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
    	(function(i) {
      	 var item = 'item' + list[i];
         result.push( function() {
         	alert(item + ' ' + list[i]);
         })
      })(i);
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();