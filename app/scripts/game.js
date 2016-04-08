
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.isPlaying = false;

		this.pipe1 = new window.Pipe(this.el.find('.PipeCombo1'), this, 1);
		this.pipe2 = new window.Pipe(this.el.find('.PipeCombo2'), this, 2);
		this.pipe3 = new window.Pipe(this.el.find('.PipeCombo3'), this, 3);


		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);

		this.Score = 0;
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.pipe1.onFrame(delta);
		this.pipe2.onFrame(delta);
		this.pipe3.onFrame(delta);
		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;

		$('.Ground').css('-webkit-animation-play-state', 'running');
		$('.Candy').css('-webkit-animation-play-state', 'running');
		$('.IceCream').css('-webkit-animation-play-state', 'running');
		$('.Wings').css('-webkit-animation-play-state', 'running');
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.pipe1.reset();
		this.pipe2.reset();
		this.pipe3.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		if(!Controls.getSoundMuted()) {

			var over = document.getElementById('gameover');
			over.play();
		}

	//	var ground = this.el.find('.Ground');
		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});

		$('.Scoreboard-Score>span').html(this.Score);

		$('.Ground').css('-webkit-animation-play-state', 'paused');
		$('.Candy').css('-webkit-animation-play-state', 'paused');
		$('.IceCream').css('-webkit-animation-play-state', 'paused');
		$('.Wings').css('-webkit-animation-play-state', 'paused');
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();
