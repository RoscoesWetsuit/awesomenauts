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
		 this.creepTimerCheck();

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
		 	game.data.gold += (game.data.exp1+1);
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



game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
	},

	update: function(){
		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			me.state.current().resetPlayer(10, 0);
		}
	},
});



game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		this.gameover = false;
	},

	update: function(){
		if(game.data.win === true && !this.gameover){
			this.gameOver(true);
		}else if(game.data.win === false && !this.gameover){
			this.gameOver(false);
		}
		

		return true;
	},

	gameOver: function(win){
		if(win){
			game.data.exp += 10;
		}else{
			game.data.exp += 1;
		}

		this.gameover = true;
		me.save.exp = game.data.exp;
	}
});

game.SpendGold = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastBuy = new Date()
		this.pause = false;
		this.alwaysUpdate = true;
		this.updateWhenPaused = true;
		this.buying = false;
	},

	update: function(){
		if(me.input.isKeyPressed("buy") && this.now-this.lastbuy >=1000){
			this.lastBuy = this.now;
			if(!this.buying){
				this.startBuying();
			}else{
				this.stopBuying();
			}
		}

		this.checkBuyKeys();

		return true;
	},

	startBuying: function(){
		this.buying = true;
		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		game.data.buyscreen.updateWhenPaused = true;
		game.data.buyscreen.setOpacity(0.8);
		me.game.world.addChild(game.data.buyscreen, 34);
		game.data.player.body.setVelocity(0,0);
		me.state.pause(me.state.PLAY);
		me.input.bindKey(me.input.KEY.F1, "F1", true);
		me.input.bindKey(me.input.KEY.F2, "F2", true);
		me.input.bindKey(me.input.KEY.F3, "F3", true);
		me.input.bindKey(me.input.KEY.F4, "F4", true);
		me.input.bindKey(me.input.KEY.F5, "F5", true);
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		this.setBuyText();

	},

	setBuyText: function() {
	game.data.buytext = new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				// making a call to the super function
				this.font = new me.Font("Arial", 26, "white");
				// setting a font on the screen
				this.updateWhenPaused = true;
				this.alwaysUpdate = true;
			}, 

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT. Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "skill 1: increase damage. Current Level: " + game.data.skill1 + " cost: " + ((game.data.skill1+1)*10), this.pos.x, this.pos.y + 40);
				this.font.draw(renderer.getContext(), "skill 2: run faster! current level: " + game.data.skill2 + " cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y + 80);
				this.font.draw(renderer.getContext(), "skill 3: increase health. current level: " + game.data.skill3 + " cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y + 120);
				this.font.draw(renderer.getContext(), "Q ability: sanic burst. current level: "  + game.data.ability1 + " cost: " + ((game.data.ability1+1)*10), this.pos.x, this.pos.y + 160);
				this.font.draw(renderer.getContext(), "W ability: beneficial cannibalism. current level: " + game.data.ability2 + " cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "E ability: YEET! current level: " + game.data.ability3 + " cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y + 240);

			},

		}));
	me.game.world.addChild(game.data.buytext, 35);
	},

	stopBuying: function(){
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
		me.game.world.removeChild(game.data.buyscreen)
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true);	
		me.game.world.removeChild(game.data.buytext);
	},

	checkBuyKeys: function(){
		if(me.input.isKeyPressed("F1")){
			if(this.checkCost(1)){
				this.makePurchase(1);
			}
		}else if(me.input.isKeyPressed("F2")){
			if(this.checkCost(2)){
				this.makePurchase(2);
			}
		}else if(me.input.isKeyPressed("F3")){
			if(this.checkCost(3)){
				this.makePurchase(3);
			}
		}else if(me.input.isKeyPressed("F4")){
			if(this.checkCost(4)){
				this.makePurchase(4);
			}
		}else if(me.input.isKeyPressed("F5")){
			if(this.checkCost(5)){
				this.makePurchase(5);
			}
		}else if(me.input.isKeyPressed("F6")){
			if(this.checkCost(6)){
				this.makePurchase(6);
			}
		}
	},

	checkCost: function(skill){
		if(skill===1 && (game.data.gold >= ((game.data.skill1+1)*10))){
			return true;
		}else if(skill===2 && (game.data.gold >= ((game.data.skill2+1)*10))){
			return true;
		}else if(skill===3 && (game.data.gold >= ((game.data.skill3+1)*10))){
			return true;
		}else if(skill===4 && (game.data.gold >= ((game.data.ability1+1)*10))){
			return true;
		}else if(skill===5 && (game.data.gold >= ((game.data.ability2+1)*10))){
			return true;
		}else if(skill===6 && (game.data.gold >= ((game.data.ability3+1)*10))){
			return true;
		}else{
			return false;
		}
	},

	makePurchase: function(skill){
		if(skil===1){
			game.data.gold -= ((game.data.skill1+1)* 10);
			game.data.skill1 += 1;
			game.data,player.attack += 1;
		}else if(skill ===2){
			game.data.gold -= ((game.data.skill2+1)* 10);
			game.data.skill2 += 1;
		}else if(skill ===3){
			game.data.gold -= ((game.data.skill3+1)* 10);
			game.data.skill3 += 1;
		}else if(skill ===4){
			game.data.gold -= ((game.data.ability1+1)* 10);
			game.data.ability1 += 1;
		}else if(skill ===5){
			game.data.gold -= ((game.data.ability2+1)* 10);
			game.data.ability2 += 1;
		}else if(skill ===6){
			game.data.gold -= ((game.data.ability3+1)* 10);
			game.data.ability3 += 1;
		}
	},


})