hProof();

function hProof() {
		document.getElementById("hoistProof").textContent = "This function was called before it was declared! Hoisting Proved QED";
};

// breaks script which proves that it doesn't work
// if you delete this part the varFunc("Does Not") will display properly
varFunc("DOES");

var varFunc = function(printString) {
	document.getElementById("varFuncP").textContent = printString;
};

varFunc("DOES NOT");