function sumArr(arr) {
	var sum = 0;
  for (var i = 0; i < arr.length; i++) {
  	sum = add(arr[i], sum);
  }
  return sum;
}

function add(number, sum) {
	return (number + sum);
}

console.log(sumArr([5,3,2]));

function dialog(speaker) {
	return function(speech) {
  	return "\"" + speech + "\" - " + speaker;
  }
}

var JFK = { name: "John F Kennedy" };
JFK.speak = dialog(JFK.name);
console.log(JFK.speak("Ich bin ein Berliner (I am a jelly doughnut)"));