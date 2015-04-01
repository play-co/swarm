// devkit and module imports
import ui.ParticleEngine as ParticleEngine;

// game imports
import src.Enemies as Enemies;
import src.Bullets as Bullets;
import src.InputView as InputView;
import src.Player as Player;
import src.support.BaseGameView as BaseGameView;

import src.config as config;
import src.support.effects as effects;

exports = Class(BaseGameView, function(supr) {

  this.init = function(opts) {
    supr(this, 'init', arguments);

    // Create the player object
    this.player = this.newGameElement(Player);

    // Create the bullets entity pool
    this.bullets = this.newGameElement(Bullets, {
      spawnMin: config.bullets.spawnCooldown
    });

    // Create the enemies entity pool
    this.enemies = this.newGameElement(Enemies, {
      spawnMin: config.enemies.spawnCooldownMin,
      spawnMax: config.enemies.spawnCooldownMax
    });

    // Create the main particle system for the game
    this.particles = this.newGameElement(ParticleEngine, { zIndex: 60 });

    // game background parallax
    this.parallax = this.newParallax();

    // accepts and interprets player input
    this.inputLayer = new InputView({ parent: this });
  };

  this.update = function(dt) {
    if (this.gameOver) {
      // Speed slow mo back up
      this.timeMult += (0.2 - this.timeMult) * 0.02 * dt;

      return;
    }

    // players vertical movement determines view offset for everything
    var screenOffsetY = -this.player.getScreenY();
    this.elementLayer.style.y = screenOffsetY;

    // update the parallax
    this.parallax.update(0, screenOffsetY);

    // Collide bullets with enemies
    this.bullets.onFirstPoolCollisions(this.enemies, this.onBulletHit, this);
    // Collide enemies with player
    this.enemies.onFirstCollision(this.player, this.onGameOver, this);
  };

  /**
    * Called on the first collision with a bullet for a tick
    */
  this.onBulletHit = function(bullet, enemy) {
    effects.emitExplosion(this.particles, enemy);
    bullet.release();
    enemy.release();
    this.setScore(this.score + 1);
  };

  this.onGameOver = function() {
    supr(this, 'onGameOver');
    this.player.onDeath();

    // slow motion on game over
    this.timeMult = 0.02;
    effects.shakeScreen(this);
  };
});
