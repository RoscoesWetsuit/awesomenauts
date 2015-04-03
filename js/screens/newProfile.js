game.newProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
		

		document.getElementById("input").style.visibility = "visible";
		document.getElementById("register").style.visibility = "visible";


		me.input.bindKey(me.input.KEY.B);
		me.input.bindKey(me.input.KEY.Q);
		me.input.bindKey(me.input.KEY.E);
		me.input.bindKey(me.input.KEY.W);
		me.input.bindKey(me.input.KEY.A);
		var exp1 = cost = ((game.data.exp1) + 10);


		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				// making a call to the super function
				this.font = new me.Font("Arial", 26, "white");
				// setting a font on the screen
 	
			}, 

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "PICK A USERNAME AND PASSWORD MANE", this.pos.x, this.pos.y);

		})));


	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		document.getElementById("input").style.visibility = "hidden";
		document.getElementById("register"),style.visibility = "hidden";

	}
});
