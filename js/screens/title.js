game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
	
		game.data.option = new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				// making a call to the super function
				this.font = new me.Font("Arial", 46, "white");
				// setting a font on the screen
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
				//its waiting for the mouse to be clicked down		//when mouse is clicked we call that new game function 	
			}, 

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
			},

			update: function(dt){
				return true;
			},

			newGame: function(){
				me.input.releasePointerEvent('pointerdown', game.data.option);
				me.save.add({exp: 0, exp1: 0, exp3: 0, exp4: 0});
				me.state.change(me.state.PLAY);
			}
		}));

		
		me.game.world.addchild(game.data.option)

		game.data.option2 = new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [380, 340, 250, 50]);
				// making a call to the super function
				this.font = new me.Font("Arial", 46, "white");
				// setting a font on the screen
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true)
				},
				//its waiting for the mouse to be clicked down		//when mouse is clicked we call that new game function 	

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
			},

			update: function(dt){
				return true;
			},


			newGame: function(){

				me.input.releasePointerEvent('pointerdown', game.data.option2);
				me.state.change(me.state.load);
				me.state.change(me.state.NEW);
			}
		}));	


		me.game.world.addChild(game.data.option2)	



	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});
