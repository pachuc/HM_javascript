"use strict";

/**
 * The main class represeting the game state.
 * Will hold 2 player objects, and reder all aspects of the game to the screen.
 */
class Manatee{

	//init game
	constructor(two, w, h){

		//hold our two.js instance.
		this.two = two;
		var game_arena = new Game_Arena(two, w, h, 'red');
		this.max_width = game_arena.getArenaWidth();
		this.max_height = game_arena.getArenaHeight();
		this.min_height = game_arena.getArenaHMin();
		this.min_width = game_arena.getArenaWMin();
		this.total_width = this.max_width - this.min_width;
		this.total_height = this.max_height - this.min_height;

		//calculate appropriate player size based on arena area
		var area = this.total_height * this.total_width;
		var player_size = area/250;
		player_size = Math.sqrt(player_size);

		//calculate player positions.
		this.player1_starting_X = this.min_width + 100;
		this.player1_starting_Y = this.min_height + 100;

		this.player2_starting_X = this.max_width - 100;
		this.player2_starting_Y = this.max_height - 100;

		//init players in desired location
		this.player1 = new Player(this.player1_starting_X, this.player1_starting_Y, 'red', Math.PI/2, player_size, 1, two, 
			this.min_height, this.max_height, this.min_width, this.max_width);
		this.player2 = new Player(this.player2_starting_X, this.player2_starting_Y, 'green', (3*Math.PI)/2, player_size, 1, two, 
			this.min_height, this.max_height, this.min_width, this.max_width);

		
	}

	reset() {

		this.player1.setX(this.player1_starting_X);
		this.player1.setY(this.player1_starting_Y);
		this.player1.setTheta(Math.PI/2);

		this.player2.setX(this.player2_starting_X);
		this.player2.setY(this.player2_starting_Y);
		this.player2.setTheta(3*Math.PI/2);

	}

	outofbounds(){
		var p1 = false;
		var p2 = false;

		var p1_x = this.player1.getX();
		var p1_y = this.player1.getY();
		var p2_x = this.player2.getX();
		var p2_y = this.player2.getY();

		var maxX = this.max_width;
		var maxY = this.max_height;
		var minX = this.min_width;
		var minY = this.min_height;

		if(p1_x > maxX || p1_x < minX || p1_y > maxY || p1_y < minY){
			p1 = true;
		}

		if(p2_x > maxX || p2_x < minX || p2_y > maxY || p2_y < minY){
			p2 = true;
		}

		if(p1){
			this.player1.dethrone();
			this.player2.score();
		}

		if(p2){
			this.player2.dethrone();
			this.player1.score();
		}

		if(p1 || p2){
			this.reset();
		}
		


	}

	checkControls(){
		kd.tick();

		if(kd.A.isDown()){
			this.player1.setAim(true, "clockwise")
		}
		else if(kd.D.isDown()){
			this.player1.setAim(true, "counterclockwise");
		}
		else{
			this.player1.setAim(false, "")
		}

		if(kd.LEFT.isDown()){
			this.player2.setAim(true, "clockwise")
		}
		else if(kd.RIGHT.isDown()){
			this.player2.setAim(true, "counterclockwise")
		}
		else{
			this.player2.setAim(false, "")
		}

		if(kd.W.isDown()){
			this.player1.setShoot();
		}

		if(kd.UP.isDown()){
			this.player2.setShoot();
		}

	}
	//update the game state.
	update(){

		//var current = this.player1.getTheta();
		//this.player1.setTheta(current + 0.1);
		//current = this.player2.getTheta();
		//this.player2.setTheta(current + 0.1);
		//
		//
		
		//check controls
		this.checkControls();

		this.player1.update();
		this.player2.update();

		this.outofbounds();
		
		
		//move players forward
		//check control input
		//
		//successful launch?
		//if so update corridor and heading.
		//
		//check collisions
		//player to corridor and stage
		//did a player die?
		//reset player positions
		//update player score
		//

	}
}