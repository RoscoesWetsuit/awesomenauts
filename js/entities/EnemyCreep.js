game.EnemyCreep = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y, {
			image: "creep1",
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",

			getShape: function() {
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
				// this shows the hight of the base
			}
		}]);

			this.health = game.data.enemyCreepHealth;
			this.alwaysUpdate = true;
			// A timer for when attacking
			this.now = new Date() .getTime();
  
			this.type = "EnemyCreep";

			this.renderable.addAnimation("walk", [3, 4, 5], 80);
			this.renderable.setCurrentAnimation("walk");
	},

	loseHealth: function(damage){
		this.health = this.health - damage;
	},

			update: function(delta) {
				console.log(this.health);
				if(this.health <= 0) {
					me.game.world.removeChild(this);
				}

				// It will refresh every single time
				this.now = new Date() .getTime();

				this.body.vel.x -= this.body.accel.x * me.timer.tick;
				// cahnging the drection of the creep

				// Checks for collisions with my player, if there are, it'll passit to our CollideHandler function
				me.collision.check(this, true, this.collideHandler.bind(this), true);
				this.body.update(delta);


				this._super(me.Entity, "update", [delta]);
				// this is updating the animations on the fly
				return true;
				},	

			// Make our base loose a little bit of health everytime it's attacked
			loseHealth: function(damage) {
				this.health = this.health - damage;
			},

			collideHandler: function(response){
				if (response.b.type==='PlayerBase') {
					this.attacking=true;
					this.lastAttacking=this.now;
					this.body.vel.x = 0;

					if(xdif>0){
						console.log(xdif)
					// Keeps moving the creep to the right to maintain its position	
					this.pos.x = this.pos.x + 1;
					this.body.vel.x = 0;
					}
					// Checks that it has been at least 1 second since the creep hit the base
					if ((this.now-this.lastHit >= 1000)) {
						this.lastHit = this.now;
						// Makes the player base call its looseHealth function and passes it a damage of 1
						response.b.loseHealth(game.data.enemyCreepAttack);
					}
			}else if (response.b.type==='PlayerEntity'){
					var xdif = this.pos.x - response.b.pos.x;
				this.attacking=true;
					this.lastAttacking=this.now;
					this.pos.x = this.pos.x + 1;
					// Checks that it has been at least 1 second since the creep hit something
					if ((this.now-this.lastHit >= 1000)) {
						this.lastHit = this.now;
						// Makes the player base call its looseHealth function and passes it a damage of 1
						response.b.loseHealth(game.data.enemyCreepAttack);
					}
			}
		}

});