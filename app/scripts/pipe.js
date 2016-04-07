window.Pipe = (function() {
    'use strict';

    var GAP = 15;
  //  var SPEED = 10;
    var nextID = 1;
    var position = 102.5;

    var Pipe = function(el, game, pipeID) {
      console.log('er að búa til pípu!');
        this.el = el;
        this.game = game;
        this.pipeID = pipeID;
        this.position = 0;
        this.tHeight = 0;
        this.bHeight = 0;
    };

    Pipe.prototype.reset = function() {
      console.log('resetar inní pípu!');
        this.randGap();
        nextID = 1;
        if( this.pipeID === 1) {
            this.position = this.pipeID * position;
        }else if(this.pipeID === 2) {
            this.position = this.pipeID * position - 75;
        }else {
            this.positipn = this.pipeID * position - 145;
        }
    };

    Pipe.prototype.onFrame = function(delta) {
      console.log('on frame fallið');
        this.position -= delta * 10;
        this.checkOutOfScreen();
        this.el.css('transform', 'translate3d(' + this.position + 'em, 0em, 0) ');
    };

    Pipe.prototype.checkOutOfScreen = function() {
        if(this.postion < 0) {
            this.randGap();
            this.postion = this.game.WORLD_WIDTH;
        }
    };

    Pipe.prototype.randGap = function() {
        this.tHeight = Math.floor((Math.random() * (this.game.WORLD_HEIGHT - 10)) - GAP);
		if(this.tHeight < 10) {
			this.tHeight = 10;
		}
		this.bHeight = this.game.WORLD_HEIGHT - (this.tHeight + GAP);
		$('.topPipe' + this.pipeID).height(this.tHeight + 'em');
		$('.bottomPipe' + this.pipeID).height(this.bHeight + 'em');
    };


    Pipe.prototype.checkCollision = function() {

    };

    return Pipe;
})();
