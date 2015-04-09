game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		me.levelDirector.loadLevel("level01");
		//displays level

		this.resetPlayer(0, 420);
		
		var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
		me.game.world.addChild(gameTimerManager, 0);

		var HeroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
		me.game.world.addChild(HeroDeathManager, 0);

		var ExperienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
		me.game.world.addChild(ExperienceManager, 0);

		var SpendGold = me.pool.pull("SpendGold", 0, 0, {});
		me.game.world.addChild(SpendGold, 0);

		game.data.MiniMap = me.pool.pull("minimap", 10, 10, {});
		me.game.world.addChild(game.data.MiniMap, 30);

		me.input.bindKey(me.input.KEY.B, "buy");
		me.input.bindKey(me.input.KEY.Q, "skill");
		me.input.bindKey(me.input.KEY.W, "skill2");
		me.input.bindKey(me.input.KEY.R, "skill3");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.UP, "jump");
		me.input.bindKey(me.input.KEY.A, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
		me.audio.playTrack("whoopwhoop");
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},

	resetPlayer: function(x, y){
		game.data.player = me.pool.pull("player", 0, 420, {});
		me.game.world.addChild(game.data.player, 5);

		game.data.MiniPLayerLocation = me.pool.pull("miniplayer", 10, 10, {});
		me.game.world.addChild(game.data.MiniPLayerLocation, 31);
	},


});