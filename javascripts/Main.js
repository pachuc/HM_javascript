function Main(){
	var w = $('#middle_pane').width();
	var h = $('#middle_pane').height();
	var elem = document.getElementById('middle_pane');
	var FRAMERATE = 60/1000;//60 fps

    var two = new Two({
    	width: w,
    	height: h
    });

    two.appendTo(elem);
    var game = new Manatee(two, w, h);

    var audio = new Audio('paniq.mp3');
	audio.play();

	two.bind('update', function(frameCount){
		game.update(frameCount);
	});

	setInterval(function() {
  		two.update();
	}, FRAMERATE);

}

