game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
	
		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				// making a call to the super function
				this.font = new me.Font("Arial", 42, "white");
				// setting a font on the screen
 	
			}, 

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString, this.pos.x + 150, this.pos.y + 50);
				this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PRODUCTION" + game.data.exp.toString, this.pos.x + 200, this.pos.y + 100);
				this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD " + game.data.exp.toString, this.pos.x + 250, this.pos.y + 150);
				this.font.draw(renderer.getContext(), "F3: INCREASE DAMAGE " + game.data.exp.toString, this.pos.x + 300, this.pos.y + 200);											
				this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH" + game.data.exp.toString, this.pos.x + 350, this.pos.y + 250);
			},

		})));


	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});
