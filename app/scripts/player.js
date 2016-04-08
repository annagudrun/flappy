window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 0; // * 10 pixels per second
	var HEIGHT = 5;
	var GRAVITY = 80;
//	var INITIAL_POSITION_X = 30;
//	var INITIAL_POSITION_Y = 25;
//	var MIDX = (this.game.WORLD_WIDTH / 2)-5;
//	var MIDY = this.game.WORLD_HEIGHT / 2;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = this.game.WORLD_WIDTH/2 - 10;
		this.pos.y = this.game.WORLD_HEIGHT / 2;
		SPEED = 0;
	};

	Player.prototype.onFrame = function(delta) {

		if(Controls.keys.space ||  Controls.mouse.mouseClick) {
			SPEED = 30;
			
			if(!Controls.getSoundMuted()) {

				var jumpingSound = document.getElementById('jump');
       			jumpingSound.play(); 

			}
		}

		this.pos.y -= delta * SPEED;
		SPEED -= GRAVITY * delta;


		this.checkCollisionWithBounds();

		// Update UI
		//með því að bæta við translateZ þá er þetta element með sér layer á skjákortinu
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.y < 0 || this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			
			return this.game.gameover();
		}
	};

	return Player;

})();
