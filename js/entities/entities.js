
game.PlayerEntity = me.Entity.extend({
	init:function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "player",
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			getShape: function() {
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);

		//changes the characters Y position
		this.body.setVelocity(5, 20);
		this.facing = "right";
		this.now = new Date().getTime();
		this.lastHit = this.now;
		//sets hit delay
		this.lastAttack = new Date().getTime();
		

		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80)

		this.renderable.setCurrentAnimation("idle");
	},	


	update: function(delta) {
		//keeps timer up to date
		this.now = new Date().getTime();
		if(me.input.isKeyPressed("right")) {
//adds to the position of my x by the velocity defined above
//in setVelocity and by multiplying by me.timer.tick.
//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x + me.timer.tick;
			this.facing = "right";
			this.flipX(true);
		}else if(me.input.isKeyPressed("left")){
			this.facing = "left";
			this.body.vel.x -=this.body.accel.x = me.time.tick
			this.flipX(false);
		}else{
			this.body.vel.x = 0;
		}

		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
			this.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}

		

		if(me.input.isKeyPressed("attack")) {
			if(!this.renderable.isCurrentAnimation("attack")) {
				console.log(!this.renderable.isCurrentAnimation("attack"))
				//sets the current animation to the attack and once that is over
				//goes back to the idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				//makes it so that the nnect time we star this sequence we begin
				//from the first animation, not wherevere we keft off when we
				//switched to a another animation
				this.renderable.setAnimationFrame();
			}
		}

		else if(this.body.vel.x !== 0 77 !this.renderable.isCurrentAnimation("attack")) {
			if(!this.renderable.isCurrentAnimation("walk")) {
				this.renderable.setCurrentAnimation("walk");
			}
		}else if(!this.renderable.isCurrentAnimation("attack")){
			this.renderable.setCurrentAnimation("idle");
		}


		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);
		
		this._super(me.Entity, "update", [delta]);
		return true;

	},
	collideHandler: function(response) {
		if(response.b.type==='EnemyBaseEntity'){
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;

			console.log("xdif " + xdif + " ydif " + ydif);

			if(ydif<-40 && xdif< 70 && xdif>-35 ) {
				this.body.falling = false;
				this.body.vel.y = -1;
			}

			else if (xdif>-35 && this.facing=== 'right' && (xdif<0)){
				this.body.vel.x = 0;
				// stops the player from moving
				this.pos.x = this.pos.x -1;
				// slighty turns the character
			}
			else if (xdif<70 && this.facing=== 'left' && xdif>0) {
				this.body.vel.x = 0;
				// stops the player from moving
				this.pos.x = this.pos.x +1;
				// cant walk into castle from left or right
			}
													//checks if it has been 400 milliseconds
													//the player can attack again
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000){
				console.log("tower Hit");
				//once it is done, it is gonna update the last hit variable so 
				//player can attack again
				this.lastHit = this.now;
				response.b.losehealth();
				//function that makes the tower lose health
				//if we are attacking or in contact with the base the tower will 
				//lose health
			}

		}
		// this is going to determine what happens when we hit the enemy entity
	}
});
//setting the properties to the player's tower
game.PlayerBaseEntity = me.Entity.extend({
	init:function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.rect(0, 0, 100)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
		this.type = "PlayerBase";
		//we are setting animation for tower
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("borken", [1]);
		this.renderable.setCurrentAnimation("idle");

	},
	//basically if the tower's health is less then 0 then, its dead
	update:function(){
		if(this.health<=0) {
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true
	},
	// makes our base lose a little bit of 
	//health everytime it is damaged
	loseHealth: function(damage) {
		this.health = this.health - damage;
	}

	onCollision: function(){

	}

});
//just copied and pasted the other but changed a couple
//thingsto make the enemy tower
game.enemyBaseEntity = me.Entity.extend({
	init:function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.rect(0, 0, 100, 70)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "EnemybaseEntity";
		//we are setting enemy tower animation
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("borken", [1]);
		this.renderable.setCurrentAnimation("idle");

	},

	update:function(){
		if(this.health<=0) {
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);
	},

	onCollision: function(){
		
	},

	loseHealth: function() {
		this.health--;
	}

});
//creating a new class
game.EnemyCreep = me.Entity.extend({ 
	init: function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image:"creep1";
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",
			getShape:; function() {
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}
		}]);
		this.health = 10;
		this.alwaysUpdate = true;
		//this.attacking lets us know if the enemy is currently attacking
		this.attacking = false;
		//keeps trackof when our creep last attacks anything
		this.lastAttacking = new Date().getTime();
		//keep track of the last time our creep hit anything
		this.lastHit = new Date().getTime();
		this.now = new Date().getTime();
		this.body.setVelocity(3, 20);

		this.type = "EnemyCreep";

		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");
	},

	update: function(delta){
		this.now = Date().getTime();

		this.body.vel.x -= this.accel.x * me.timer.tick

		me.collision..check(thid, true, this.collideHandler.bind(this), true);


		this.body.update(delta);


		this._super(me.Entity, "update", [delta]);

		return true
	},

	collideHandler: function(response) {
		if(response.b.type==='PlayerBase') {
			this.attacking=true;
			//this.lastAttacking=this.now;
			this.body.vel.x = 0;
			//keeps moving the creep to the right to maintain its position
			this.pos.x = this.pos.x + 1;
			//checks that is has been at lelast 1 second since the creep hit a base
			if((this.now-this.lastHit >= 1000)){
				//updates the lasthit timer
				this.lastHit = this.now;
				//makes the player base call its losehealth function and passes it a
				//damage of1
				response.b.loseHealth(1);
			}
		}
	}

});

game.GameManager = Object.extend({
	init: function(x, y, settings) {
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();

		this.alwaysUpdate = true;
	},

	update: function(){
		this.now = new Date().getTime();
		//function that checks 
		//to make sure that we have a multiple of 10
		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lasCreep >= 1000)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {})
			me.game.world.addChild(creepe, 5);
		}

		return true;
	}

});
