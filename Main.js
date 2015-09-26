function Main(){
	w = $('#middle_pane').width();
	h = $('#middle_pane').height();
	var elem = document.getElementById('middle_pane');

    var two = new Two({
    	width: w,
    	height: h
    });

    two.appendTo(elem);
    line = two.makeLine(0, 0, two.width, two.height);

	//var player1 = new Player(500, 250, 'red', 5, 100, 5);
	//player1.draw(two);

	two.update();

}

