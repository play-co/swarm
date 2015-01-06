// devkit and module imports
import animate;
import device;
import ui.View as View;
import ui.ImageView as ImageView;
import ui.SpriteView as SpriteView;
import ui.ScoreView as ScoreView;
import ui.ParticleEngine as ParticleEngine;
import entities.Entity as Entity;
import entities.EntityPool as EntityPool;
import parallax.Parallax as Parallax;

// game imports
import src.config as config;
import src.effects as effects;
import src.utils as utils;

// math and utils shortcut references
var PI = Math.PI;
var abs = Math.abs;
var min = Math.min;
var max = Math.max;
var choose = utils.choose;
var rollFloat = utils.rollFloat;
var rollInt = utils.rollInt;

// game constants
var MAX_TICK = config.maxTick;
var BG_WIDTH = config.bgWidth;
var BG_HEIGHT = config.bgHeight;
var GAME_OVER_DELAY = config.gameOverDelay;
var SHOW_HIT_BOUNDS = false;

/**
 * Application Class
 * ~ automatically instantiated by devkit
 * ~ handles game initialization and loop
 * ~ the variable 'app' is a reference to the instance of Application
 */
var app;
exports = Class(GC.Application, function(supr) {
	/**
	 * initUI
	 * ~ called automatically by devkit
	 * ~ initialize view hierarchy and game elements
	 */
	this.initUI = function() {
		app = this;

		this.setScreenDimensions(BG_WIDTH > BG_HEIGHT);

		// accepts and interprets player input
		this.inputLayer = new InputView({ parent: this.view });

		// blocks player input to avoid traversing game elements' view hierarchy
		this.bgLayer = new View({
			parent: this.view,
			y: this.view.style.height - BG_HEIGHT,
			width: BG_WIDTH,
			height: BG_HEIGHT,
			blockEvents: true
		});

		// display player's score
		this.scoreView = new ScoreView(merge({ parent: this.view }, config.scoreView));

		// game background parallax
		this.parallax = new Parallax({ parent: this.bgLayer });

		// scrolling layer relative to player
		this.elementLayer = new View({
			parent: this.bgLayer,
			zIndex: 10
		});

		// game elements
		this.player = new Player({ parent: this.elementLayer });
		this.bullets = new Bullets({ parent: this.elementLayer });
		this.enemies = new Enemies({ parent: this.elementLayer });
		this.particles = new ParticleEngine({
			parent: this.elementLayer,
			zIndex: 60
		});
	};

	/**
	 * launchUI
	 * ~ called automatically by devkit when its engine is ready
	 */
	this.launchUI = function() {
		this.reset();
	};

	/**
	 * setScreenDimensions
	 * ~ normalizes the game's root view to fit any device screen
	 */
	this.setScreenDimensions = function(horz) {
		var ds = device.screen;
		var vs = this.view.style;
		vs.width = horz ? ds.width * (BG_HEIGHT / ds.height) : BG_WIDTH;
		vs.height = horz ? BG_HEIGHT : ds.height * (BG_WIDTH / ds.width);
		vs.scale = horz ? ds.height / BG_HEIGHT : ds.width / BG_WIDTH;
	};

	/**
	 * reset
	 * ~ resets all game elements for a new game
	 */
	this.reset = function(data) {
		this.model = {
			score: 0,
			timeMult: 1,
			gameOver: false
		};

		this.scoreView.setText(this.model.score);

		this.elementLayer.style.y = 0;
		this.player.reset();
		this.parallax.reset(config.parallax);
		this.bullets.reset();
		this.enemies.reset();
		this.inputLayer.reset();
		this.particles.killAllParticles();
	};

	/**
	 * tick
	 * ~ called automatically by devkit for each frame
	 * ~ updates all game elements by delta time, dt
	 */
	this.tick = function(dt) {
		// speed up or slow down the passage of time
		dt = min(this.model.timeMult * dt, MAX_TICK);

		// update entities
		this.player.update(dt);
		this.bullets.update(dt);
		this.enemies.update(dt);

		// players vertical movement determines view offset for everything
		var screenOffsetY = -this.player.getScreenY();
		this.elementLayer.style.y = screenOffsetY;
		this.parallax.update(0, screenOffsetY);

		// collide bullets with enemies
		this.bullets.onFirstPoolCollisions(this.enemies, this.onBulletHit, this);

		// collide enemies with player
		this.enemies.onFirstCollision(this.player, this.onGameOver, this);

		// update particles
		this.particles.runTick(dt);
	};

	this.onBulletHit = function(bullet, enemy) {
		effects.emitExplosion(this.particles, enemy);
		enemy.release();
		bullet.release();
		this.model.score++;
		this.scoreView.setText(this.model.score);
	};

	this.onGameOver = function() {
		if (!this.model.gameOver) {
			// slow motion on game over
			this.model.timeMult = 0.02;
			animate(this.model).now({ timeMult: 0.2 }, GAME_OVER_DELAY, animate.easeOut);
			// special effects on player death
			effects.emitExplosion(this.particles, this.player);
			effects.emitEpicExplosion(this.particles, this.player);
			effects.shakeScreen(this.view);
			this.player.onDeath();
			this.model.gameOver = true;
			// reset the game after 2.5 seconds
			setTimeout(bind(this, 'reset'), GAME_OVER_DELAY);
		}
	};
});


/**
 * Player Class
 */
var Player = Class(Entity, function() {
	var sup = Entity.prototype;
	var OFF_X = config.player.offsetX;
	var OFF_Y = config.player.offsetY;
	var PLAYER_MOVE_MULT = config.player.inputMoveMultiplier;
	var ROLL_MAGNITUDE = config.player.rollMagnitude;
	var BANK_MAGNITUDE = config.player.bankMagnitude;
	this.name = "Player";
	this.viewClass = SpriteView;

	this.init = function(opts) {
		sup.init.call(this, opts);
		this.inputStartX = 0;
		this.animating = false;
	};

	this.reset = function() {
		sup.reset.call(this, OFF_X, OFF_Y, config.player);
		this.view.resetAllAnimations(config.player);
		this.animating = false;
		SHOW_HIT_BOUNDS && this.showHitBounds();
	};

	this.startInput = function() {
		this.inputStartX = this.x;
	};

	this.updateInput = function(dx, dy) {
		var xPrev = this.x;
		this.x = max(0, min(BG_WIDTH, this.inputStartX + PLAYER_MOVE_MULT * dx));

		// player animations based on horizontal movement
		var mx = this.x - xPrev;
		var animName = '';
		if (abs(mx) > ROLL_MAGNITUDE) {
			animName = 'roll';
		} else if (mx < -BANK_MAGNITUDE) {
			animName = 'bank';
			this.view.style.flipX = false;
		} else if (mx > BANK_MAGNITUDE) {
			animName = 'bank';
			this.view.style.flipX = true;
		}

		if (animName && !this.animating) {
			this.animating = true;
			this.view.startAnimation(animName, {
				callback: bind(this, function() { this.animating = false; })
			});
		}
	};

	this.onDeath = function() {
		this.view.style.visible = false;
	};

	this.getScreenY = function() {
		return this.y - OFF_Y;
	};
});


/**
 * Bullet Class
 * ~ an individual bullet
 */
var Bullet = Class(Entity, function() {
	var sup = Entity.prototype;
	this.name = "Bullet";

	this.init = function(opts) {
		opts.compositeOperation = "lighter";
		sup.init.call(this, opts);
	};

	this.update = function(dt) {
		sup.update.call(this, dt);
		var b = this.viewBounds;
		if (this.y + b.y + b.h < app.player.getScreenY()) {
			this.release();
		}
	};
});


/**
 * Bullets Class
 * ~ a collection of bullets
 */
var Bullets = Class(EntityPool, function() {
	var sup = EntityPool.prototype;
	var SPAWN_COOLDOWN = config.bullets.spawnCooldown;

	this.init = function(opts) {
		this.spawnCooldown = 0;
		opts.ctor = Bullet;
		sup.init.call(this, opts);
	};

	this.reset = function() {
		this.spawnCooldown = SPAWN_COOLDOWN;
		sup.reset.call(this);
	};

	this.update = function(dt) {
		this.spawnCooldown -= dt;
		if (this.spawnCooldown <= 0) {
			this.spawnBullet();
			this.spawnCooldown += SPAWN_COOLDOWN;
		}
		sup.update.call(this, dt);
	};

	this.spawnBullet = function() {
		if (app.model.gameOver) { return; }
		var x = app.player.x;
		var y = app.player.y;
		var bullet = this.obtain(x, y, config.bullets);
		SHOW_HIT_BOUNDS && bullet.showHitBounds();
	};
});


/**
 * Enemy Class
 * ~ an individual enemy
 */
var Enemy = Class(Entity, function() {
	var sup = Entity.prototype;
	this.name = "Enemy";

	this.update = function(dt) {
		sup.update.call(this, dt);
		var b = this.viewBounds;
		if (this.y + b.y > app.player.getScreenY() + BG_HEIGHT) {
			this.release();
		}
	};
});


/**
 * Enemies Class
 * ~ a collection of enemies
 */
var Enemies = Class(EntityPool, function() {
	var sup = EntityPool.prototype;

	this.init = function(opts) {
		opts.ctor = Enemy;
		sup.init.call(this, opts);
	};

	this.reset = function() {
		this.spawnCooldown = 0;
		this.spawnMin = config.enemies.spawnCooldownMin;
		this.spawnMax = config.enemies.spawnCooldownMax;
		sup.reset.call(this);
	};

	this.update = function(dt) {
		this.spawnCooldown -= dt;
		if (this.spawnCooldown <= 0) {
			this.spawnEnemy();
			this.spawnCooldown += rollFloat(this.spawnMin, this.spawnMax);
		}
		sup.update.call(this, dt);
	};

	this.spawnEnemy = function() {
		// increase game difficulty by spawning more enemies over time
		if (this.spawnMax > this.spawnMin) {
			this.spawnMax--;
		}

		var type = choose(config.enemies.types);
		var b = type.viewBounds;
		var x = rollFloat(0, BG_WIDTH);
		var y = -(b.y + b.h) + app.player.getScreenY();
		var enemy = this.obtain(x, y, type);
		SHOW_HIT_BOUNDS && enemy.showHitBounds();

		// vary enemy speeds
		enemy.vy = rollFloat(0.67, 1.33) * enemy.vy;
	};
});


/**
 * InputView Class
 * ~ a view that manages game input
 */
var InputView = Class(View, function() {
	var sup = View.prototype;

	this.init = function(opts) {
		opts.infinite = true;
		sup.init.call(this, opts);
	};

	this.reset = function() {
		this.startEvt = null;
		this.startPt = null;
	};

	this.onInputStart = function(evt, pt) {
		if (this.startEvt === null) {
			app.player.startInput();
			this.startEvt = evt;
			this.startPt = pt;
		}
	};

	this.onInputMove = function(evt, pt) {
		var startEvt = this.startEvt;
		if (startEvt === null || evt.id !== startEvt.id) {
			return;
		}

		var startPt = this.startPt;
		var scale = 1 / app.bgLayer.style.scale;
		var dx = scale * (pt.x - startPt.x);
		var dy = scale * (pt.y - startPt.y);
		app.player.updateInput(dx, dy);
	};

	this.onInputSelect = function(evt, pt) {
		var startEvt = this.startEvt;
		if (startEvt === null || evt.id !== startEvt.id) {
			return;
		}

		this.reset();
	};
});
