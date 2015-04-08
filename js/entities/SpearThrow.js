game.SpearThrow = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, {
			image: "spear",
			width: 48,
			height: 48,
			spritewidth: "48",
			spriteheight: "48",

			getShape: function() {
				return (new me.Rect(0, 0, 48, 48)).toPolygon();
				// this shows the hight of the base
			}
		}]);

			this.alwaysUpdate = true;
			this.body.setVelocity(8, 0)
  			this.Attack = game.data.ability3*3;
			this.type = "spear";
			this.facing = facing;

	},

	update: function(delta){
		if(this.facing==="left"){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
		}else{
			this.body.vel.x +- this.body.accel.x * me.timer.tick;
		}

			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			// cahnging the drection of the creep

			// Checks for collisions with my player, if there are, it'll passit to our CollideHandler function
			me.collision.check(this, true, this.collideHandler.bind(this), true);
			this.body.update(delta);


			this._super(me.Entity, "update", [delta]);
			// this is updating the animations on the fly
	
			return true;
	},

	collideHandler: function(response){
		if(response.b.type==='EnemyBase' || response.b.type==='EnemyCreep') {
			response.b.loseHealth(game.data.this.Attack);
			me.game.world.removeChild(this);
	}	
})