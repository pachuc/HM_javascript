"use strict";

/**
 * The player class.
 */

class Player {

        /**
         * Contructor
         * @param  int xpos x-position of the player
         * @param  int ypos y-position of the player
         * @param  text color color of the player
         * @param  radians theta heading of the player
         * @param  int size size of the player
         * @param  int speed speed of the player
         */
        constructor(xpos, ypos, color, theta, size, speed){
	       
                //player variables
                this.xpos = xpos;
                this.ypos = ypos;
                this.color = color;
                this.theta = theta;
                this.size = size;
                this.speed = speed;
                this.numPoints = 3;
                

	}

        /**
         * Update the player object
         * @param  int tick number of game ticks
         */
        update(tick){

        	//move in the heading direction.
        	var movement = this.speed * tick;
        	this.xpos = movement * cos(this.theta) + this.xpos;
        	this.ypos = movement * sin(this.theta) + this.ypos;

        	
        }

        /**
         * Increment the number of sides i.e update the score.
         */
        score(){
        	this.numPoints++;
        }

        /**
         * Decrement score, loose a side
         */
        dethrone(){
        	this.numPoints--;
        }

        /**
         * Draw the player object to the canvas
         * @param  Canvas c the canvas to draw to
         */
        draw(two){

        	var points = [];
        	var PI = Math.PI;
        	var angleInc = (2*PI)/this.numPoints;
        	var starting = this.theta;

        	for(var i = 0; i < this.numPoints; i++){
        		var x = this.size * Math.cos(starting) + this.xpos;
        		var y = this.size * Math.sin(starting) + this.ypos;
        		points[i] = {x: x, y: y};
        		starting = starting + angleInc;

        	}

        	for(i = 0; i < this.numPoints; i++){
        		var k = i + 1;

        		if( k >= this.numPoints){
        			k = 0;
        		}

        		var line = two.makeLine(points[i].x, points[i].y, points[k].x, points[k].y);
        		line.stroke = this.color;
        	}




        }

}