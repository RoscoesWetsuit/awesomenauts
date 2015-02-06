<<<<<<< HEAD
=======


>>>>>>> 582bede42ca83d0f6c1a6887dff2d667812d28f7
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
		//changes the characters Y position

		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 80);

		this.renderable.setCurrentAnimation("idle");
	},	


	update: function(delta) {
		if(me.input.isKeyPressed("right")) {
//adds to the position of my x by the velocity defined above
//in setVelocity and by multiplying by me.timer.tick.
//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x + me.timer.tick;
			
		}else{
			this.body.vel.x = 0;
		}

		if(this.body.vel.x !== 0) {
			if(!this.renderable.isCurrentAnimation("walk")) {
				this.renderable.setCurrentAnimation("walk");
			}
		}else{
			this.renderable.setCurrentAnimation("idle");
		}



		this.body.update(delta);
		
		this._super(me.Entity, "update", [delta]);
		return true;

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

		this.type = "PlayerBaseEntity";

	},
	//basically if the tower's health is less then 0 then, its dead
	update:function(){
		if(this.health<=0) {
			this.broken = true;
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
				return (new me.rect(0, 0, 100)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "EnemybaseEntity";

	},

	update:function(){
		if(this.health<=0) {
			this.broken = true;
		}
		this.body.update(delta);
	},

	onCollision: function(){
		
	}

});
=======
>>>>>>> 582bede42ca83d0f6c1a6887dff2d667812d28f7
