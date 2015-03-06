game.EnemyBaseEntity = me.Entity.extend ({
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",

			getShape: function() {
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
				// this shows the hight of the bases
			}
}]);
		this.broken = false;
		// this is saying that the tower has not yet been
		this.health = game.data.enemyBaseHealth;
		// starting energy for tower
		this.alwaysUpdate = true;
		// updates the screen whether or not we are not looking at it
		this.body.onCollision = this.onCollision.bind(this);
		// if somebody runs into the tower it will be able to collide with it

		this.type = "EnemyBase";
		// this is a type you can use to check to see what you are running into
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
		// renderable is a class built in melon js that we can play with the animation with

	}, 

	update: function(delta) {
		if( this.health <= 0) {
			this.broken =  true;
			game.data.win = true;
			// this means that the character is dead
			this.renderable.setCurrentAnimation("broken");
	}
		this.body.update(delta);
		// updates the code

		this._super(me.Entity, "update", [delta]);
		// telling the super class to update
		return true;
	},
		onCollision: function() {

		}, 
		loseHealth: function() {
			this.health--;
		}
	
});