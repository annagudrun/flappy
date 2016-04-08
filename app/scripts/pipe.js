window.Pipe = (function() {
    'use strict';

    var GAP = 17;
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
            this.position = this.pipeID * position - 70;
        }else {
            this.positipn = this.pipeID * position - 140;
        }
    };

    Pipe.prototype.onFrame = function(delta) {

        this.position -= delta * 10;
        //hérna ath ég hvort við seum komin út af skjánum
    /*    if(this.postion < 0) {
            console.log('inní loope');
            this.randGap();
            this.postion = this.game.WORLD_WIDTH;
        }*/
        this.checkCollision();
        this.el.css('transform', 'translateZ(0) translate3d(' + this.position + 'em, 0em, 0) ');
    };

    Pipe.prototype.randGap = function() {
      //set random hæð á neðri pípuna (passa að hús sé ekki minni en 8)
        this.bHeight = Math.floor((Math.random() * (this.game.WORLD_HEIGHT - 8)) - GAP);
        if(this.bHeight < 8) {
            this.bHeight = 8;
        }
      //set svo hæðina á eftir pípu sem sem totalhæð - neðripípa - gatið
		this.tHeight = this.game.WORLD_HEIGHT - (this.bHeight + GAP);
    //kem að lokum hæðinni til skila
		$('.topPipe' + this.pipeID).height(this.tHeight + 'em');
		$('.bottomPipe' + this.pipeID).height(this.bHeight + 'em');
    };

    Pipe.prototype.checkCollision = function() {
      console.log('checkþcolision ');
      if(nextID === this.id) {
					++this.game.score;
					$('#score').text(this.game.score);
					nextID++;
					if(nextID === 4) {
						nextID = 1;
					}
				}

    };

    return Pipe;
})();
