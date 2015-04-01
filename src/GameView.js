// devkit and module imports
import ui.ParticleEngine as ParticleEngine;
import parallax.Parallax as Parallax;

// game imports
import src.Enemies as Enemies;
import src.Bullets as Bullets;
import src.InputView as InputView;
import src.Player as Player;
import src.BaseGameView as BaseGameView;

import src.config as config;
import src.effects as effects;
import src.utils as utils;

exports = Class(BaseGameView, function(supr) {

	this.init = function(opts) {
		supr(this, 'init', arguments);

		// accepts and interprets player input
		this.inputLayer = new InputView({ parent: this });

		// game background parallax
		this.parallax = new Parallax({ parent: this.bgLayer });
		this.parallax.reset(config.parallax);

		// game elements
		this.player = this.newGameElement(Player);
		this.bullets = this.newGameElement(Bullets);
		this.enemies = this.newGameElement(Enemies);
		this.particles = this.newGameElement(ParticleEngine, { zIndex: 60 });
	};

	this.update = function(dt) {
		if (this.gameOver) {
			this.timeMult += (0.2 - this.timeMult) * 0.02;
			return;
		}

		// players vertical movement determines view offset for everything
		var screenOffsetY = -this.player.getScreenY();
		this.elementLayer.style.y = screenOffsetY;
		this.parallax.update(0, screenOffsetY);

		// collide enemies with player
		this.enemies.onFirstCollision(this.player, this.onGameOver, this);
	};

	this.onGameOver = function() {
		supr(this, 'onGameOver');
		// slow motion on game over
		this.timeMult = 0.02;
		effects.shakeScreen(this);
		this.player.onDeath();
	};
});
