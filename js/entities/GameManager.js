	game.GameManager = Object.extend({
	// this is an object but we still need and init function
	init: function(x, y, settings) {
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
	},
	update: function() {
		 this.now = new Date().getTime();

		 if(game.data.player.dead) {
		 	me.game.world.removeChild(game.data.player);
		 	me.state.current().resetPlayer(10, 0);
		 }

		 if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)) {
		 	game.data.gold += 1;
		 	console.log("current gold: " + game.data.gold);
		 }


		 if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)) {
		 	// checking to see if we have multiples of ten
		 	// this.now - .. makes sure the spawn isnt repeating
		 	this.lastCreep = this.now;
		 	var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
		 	me.game.world.addChild(creepe, 5);

		 };
		 return true;
	}

});