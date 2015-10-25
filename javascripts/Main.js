function Main(){
	w = $('#middle_pane').width();
	h = $('#middle_pane').height();
	var elem = document.getElementById('middle_pane');

    var two = new Two({
    	width: w,
    	height: h
    });

    two.appendTo(elem);
    var game = new Manatee(two, w, h);
	
	//var sound = new Howl({
	//	urls: ['paniq.mp3'],
	//	loop: true
	//})

	two.bind('update', function(frameCount){
		game.update();
	}).play();

}

