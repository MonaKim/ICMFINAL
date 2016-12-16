//guesture
window.addEventListener("load",function(){
	initHammer();
});
var initHammer = function(){
	var worldCanvas = document.getElementById('defaultCanvas0');
	var mc = new Hammer.Manager(worldCanvas);
	// create a pinch and rotate recognizer
// these require 2 pointers
	var pinch = new Hammer.Pinch();
	//add to the Manager
	mc.add([pinch]);
	mc.on("pinch", function(ev) {
	    // alert(ev.type);
	});
}

