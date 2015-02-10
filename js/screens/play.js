game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		me.levelDirector.loadLevel("level01");
		//displays level

		var player = me.pool.pull("player", 0,420, {});
		me.game.world.addChild(player, 5);

		var gamemanager = me.pool.pull("GameMAnager", 0, 0, {})
		me.game.world.addChild(player, 0);

		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.BindKey(me.input.KEY.LEFT, "left");
		me.input.BindKey(me.input.KEY.SPACE, "jump");
		me.input.bindKey(me.input.Key.A, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}

});

});

