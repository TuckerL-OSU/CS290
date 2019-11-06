// Tucker Lavell
// CS290 - Spring 2018
// Week5 - DOM and Events
// style sheet - https://www.w3.org/wiki/Dynamic_style_-_manipulating_CSS_with_JavaScript
var sheet = document.createElement("style")
sheet.innerHTML = ".activeCell {border-style: solid; border-width: thick;}";
document.body.appendChild(sheet);
sheet.innerHTML += ".marked {background-color: yellow;}";
document.body.appendChild(sheet);

// build table -
// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
function buildTable() {
	// create table and parts
	var table = document.createElement("table");
	var tableHead = document.createElement("thead");
	var tableBody = document.createElement("tbody");

	for (var i = 0; i < 4; i++) {	
		var row = document.createElement("tr");
			for (var j = 0; j < 4; j++) {
				var cell;
				var cellText;
				if (i == 0) {
					cell = document.createElement("th");
					cellText = document.createTextNode("Header " + (j + 1));
				}
				else {
					cell = document.createElement("td");
					// may be wrong
					cellText = document.createTextNode((j + 1) + ", " + i)
				}
				cell.appendChild(cellText);
				row.appendChild(cell);
		}
		if (i == 0) {
			tableHead.appendChild(row);
		}
		else {
			tableBody.appendChild(row);
		}
	}

	// create the table based off what we just created
	table.appendChild(tableHead);  
	table.appendChild(tableBody);

	// insert the table to the proper div
	document.getElementById("TheTable").appendChild(table);

	table.setAttribute("border", "2");
	
	// set the cell that says 1,1 to the default activeCell
	setActive(table, currentCol, currentRow);
	
	return table;
}

// create buttons and uses the string from btnFunction as the displayed name on the button
function createButton(btnFunction) {
	 var btn = document.createElement("button");
	 var btnDisplay = document.createTextNode(btnFunction);
	 btn.appendChild(btnDisplay);
	 
	 switch (btnFunction) {
		 case "Up":
			document.getElementById("BtnUp").appendChild(btn);
			break;
		 case "Down":
			document.getElementById("BtnDown").appendChild(btn);
			break;
		 case "Left":
			document.getElementById("BtnLeft").appendChild(btn);
			break;
		 case "Right":
			document.getElementById("BtnRight").appendChild(btn);
			break;
		 case "Mark Cell":
			document.getElementById("BtnMarkCell").appendChild(btn);
			break;
		 default:
			break;
	 }
}

// adds the activeCell class to a cell, so that the cell is highlighted
function setActive(table, col, row) {
	table.rows[row].cells[col].className += " activeCell";
}

// unsets activeCell from a cells class list
function setNotActive(table, col, row) {
	table.rows[row].cells[col].classList.remove("activeCell");
}

// change activeCell
function move(table, nextCol, nextRow) {
	currentCol += nextCol;
	currentRow += nextRow;
	
	// bounds check
	if (currentCol < 0 || currentCol > 3) {
		currentCol -= nextCol;
	}
	if (currentRow < 1 || currentRow > 3) {
		currentRow -= nextRow;
	}
	// unset old activeCell and set new one
	// basically resets same cell if there was a movement error
	setNotActive(table, (currentCol - nextCol), (currentRow - nextRow));
	setActive(table, currentCol, currentRow);		
}

// adds the marked class to a cell, which allows its bg-color to be changed
function mark(table, col, row) {
	table.rows[row].cells[col].className += " marked";
}

// starting col and row
var currentCol = 0;
var currentRow = 1;
var tbl = buildTable();
var btnUp = createButton("Up");
var btnDown = createButton("Down");
var btnLeft = createButton("Left");
var btnRight = createButton("Right");
var btnMarkCell = createButton("Mark Cell");

// listen for the <div> buttons to be pressed, and do the related action)
//------------col,row
// up
document.getElementById("BtnUp").addEventListener("click", function() {
	move(tbl, 0, -1);
});
// down
document.getElementById("BtnDown").addEventListener("click", function() {
	move(tbl, 0, 1);
});
// left
document.getElementById("BtnLeft").addEventListener("click", function() {
	move(tbl, -1, 0);
});
// right
document.getElementById("BtnRight").addEventListener("click", function() {
	move(tbl, 1, 0);
});

// mark cell
document.getElementById("BtnMarkCell").addEventListener("click", function() {
	mark(tbl, currentCol, currentRow);
});