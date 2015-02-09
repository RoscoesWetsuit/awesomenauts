
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

		this.body.setVelocity(5, 20);
		this.facing = "right";
		//changes the characters Y position

		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80)

		this.renderable.setCurrentAnimation("idle");
	},	


	update: function(delta) {
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

		else if(this.body.vel.x !== 0) {
			if(!this.renderable.isCurrentAnimation("walk")) {
				this.renderable.setCurrentAnimation("walk");
			}
		}else{
			this.renderable.setCurrentAnimation("idle");
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

			if (xdif>-20 && this.facing=== 'right' xdif<0) {
				this.body.vel.x = 0;
				// stops the player from moving
				this.pos.x = this.pos.x - 1;
				// slighty turns the character
			}
			else if (xdif<60 && this.facing=== 'left' && xdif>0) {
				this.body.vel.x = 0;
				// stops the player from moving
				this.pos.x = this.pos.x + 1;
				// cant walk into castle from left or right
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
		console.log("init");
		this.type = "PlayerBaseEntity";
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
	},

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
		
	}

});

