/**
 * The main class represeting the game state.
 * Will hold 2 player objects, and reder all aspects of the game to the screen.
 */
class Manatee{

	//init game
	constructor(two){

		//hold our two.js instance.
		this.two = two;
		this.player1 = new Player(500, 250, 'red', 5, 100, 5);
		this.player2 = new Player(500, 250, 'red', 5, 100, 5);

		//init players in desired location
	}

	//update the game state.
	update(){
		
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