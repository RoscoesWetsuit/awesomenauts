game.GameTimerManager = Object.extend({
	// this is an object but we still need and init function
	init: function(x, y, settings) {
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
	},


	update: function() {
		 this.now = new Date().getTime();
		 this.goldTimerCheck();
		 this.creepTimerCheck

		 if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)) {
		 	// checking to see if we have multiples of ten
		 	// this.now - .. makes sure the spawn isnt repeating
		 	this.lastCreep = this.now;
		 	var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
		 	me.game.world.addChild(creepe, 5);

		 };
		 return true;
	},

	goldTimerCheck: function(){
		 if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)) {
		 	game.data.gold += 1;
		 	console.log("current gold: " + game.data.gold);
		}

	},

	creepTimerCheck: function(){
	 if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)) {
		 	// checking to see if we have multiples of ten
		 	// this.now - .. makes sure the spawn isnt repeating
		 	this.lastCreep = this.now;
		 	var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
		 	me.game.world.addChild(creepe, 5);

		 };		
	},

});



game.HeroDeathManage = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
	},

	update: function(){
		if(gmae.data.plaer.dead){
			me.game.world.removeChild(gmae.data.player);
			me.state.current().resetPlayer(10, 0);
		}
	},
});



game.experienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		this.gameOver = false;
	},

	update: function(){
		if(game.data.win === true && !this.gameOver){
			game.data.exp += 10;
			this.gameOver = true;
		}else if(game.data.win === false && !this.gameOver){
			game.data.exp += 1;
		}
		console.log(game.data.exp);

		return true;
	}
})