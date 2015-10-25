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
        constructor(xpos, ypos, color, theta, size, speed, two, hmin, hmax, wmin, wmax){
	       
            //player variables
            this.xpos = xpos;
            this.ypos = ypos;
            this.color = color;
            this.theta = theta;
            this.size = size;
            this.speed = speed;
            this.numPoints = 3;
            this.two = two;
            this.hmin = hmin;
            this.hmax = hmax;
            this.wmin = wmin;
            this.wmax = wmax;
            this.init = false;
            this.aim = false;
            this.aimTheta = theta;
            this.aimDir = "";

            this.makeBody();
            this.makeCorridor();

            this.init = true;
            this.aimrendered = false;
            this.shoot = false;
            this.shootcd = 0;
                

	   }

       aimShot(){
            if(this.aimDir == "clockwise"){
                this.aimTheta -= .05;
            }

            if(this.aimDir == "counterclockwise"){
                this.aimTheta += .05;
            }

            this.drawAim();
       }

       clearAim(){
            if(this.aimrendered){
                this.two.remove(this.aimline);
                this.aimrendered = false;
            }
       }

       drawAim(){

            if(this.aimrendered){
                this.two.remove(this.aimline);
            }

            //calculate slope
            var tan = Math.tan(this.aimTheta);
            var b = this.ypos - (this.xpos * tan);

            var x1 = this.xpos;
            var x2 = this.xpos + this.size * 2 * Math.cos(this.aimTheta);
            var y1 = this.ypos;
            var y2 = this.ypos + this.size * 2 * Math.sin(this.aimTheta);

            this.aimline = this.two.makeLine(x1, y1, x2, y2);
            this.aimline.stroke = this.color;
            this.aimrendered = true;



       }

       setShoot(){
            this.shoot = true;
       }

       update(){

            if(this.aim){

                this.aimShot();
                if(this.shoot){
                    this.theta = this.aimTheta;
                    this.shoot = false;
                    this.shootcd = 100;
                }

            }
            else{
                this.clearAim();
                this.aimTheta = this.theta;
            }

            if(this.shootcd > 0){
                this.shootcd--;
            }
            
            this.move();
            this.makeCorridor();
       }

       setAim(isaim, aimdir){
            this.aim = isaim;
            this.aimDir = aimdir;
       }

       move(){
            this.xpos = (Math.cos(this.theta) * this.speed) + this.xpos;
            this.ypos = (Math.sin(this.theta) * this.speed) + this.ypos;
            this.makeBody();

       }

        score(){
            if(this.numPoints < 10){
                this.numPoints++;   
                this.makeBody();
            }
        }

        dethrone(){
            if(this.numPoints > 3){
                this.numPoints--;
                this.makeBody();
            }
        }

        makeCorridor(){

            if(this.init){
                this.two.remove(this.corridor);
            }

                if(this.theta == Math.PI/2 || this.theta == (3*Math.PI)/2){
                        this.corridor = this.two.makeLine(this.xpos, this.hmin, this.xpos, this.hmax);
                        this.corridor.stroke = this.color;
                }
                else{

                        //calculate slope
                        var tan = Math.tan(this.theta);
                        var b = this.ypos - (this.xpos * tan);

                        //first check agsint left and right walls for intersection
                        //easier in my head since its x...'
                        var yC = this.wmin * tan + b;
                        var yC2 = this.wmax *tan + b;

                        if(yC <= this.hmax && yC >= this.hmin && yC2 <= this.hmax && yC2 >= this.hmin){
                            this.corridor = this.two.makeLine(this.wmin, yC, this.wmax, yC2);
                        }
                        else{
                            var xC = (this.hmin - b)/tan;
                            var xC2 = (this.hmax - b)/tan;
                            this.corridor = this.two.makeLine(xC, this.hmin, xC2, this.hmax);

                        }

                        this.corridor.stroke = this.color;

                }

                
                

        }

        setTheta(th){
            this.theta = th;
            this.makeBody();
            this.makeCorridor();
        }

        getTheta(){
            return this.theta;
        }

        setX(x){
            this.xpos = x;
        }

        setY(y){
            this.ypos = y;
        }

        getX(){
            return this.xpos;
        }

        getY(){
            return this.ypos;
        }



        /**
         * Make the player body.
         */
        makeBody(){

            if(this.init){
                this.two.remove(this.lines);
            }

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

            this.lines = [];

        	for(i = 0; i < this.numPoints; i++){
        		var k = i + 1;

        		if( k >= this.numPoints){
        			k = 0;
        		}

        		this.lines[i] = this.two.makeLine(points[i].x, points[i].y, points[k].x, points[k].y);
        		this.lines[i].stroke = this.color;
        	}


        }

}