import entities.EntityPool as EntityPool;
import entities.Entity as Entity;

import src.config as config;
import src.effects as effects;

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
    if (this.y + b.y + b.h < this.app.player.getScreenY()) {
      this.release();
    }
  };
});

/**
 * Bullets Class
 * ~ a collection of bullets
 */
exports = Class(EntityPool, function() {
  var sup = EntityPool.prototype;
  var SPAWN_COOLDOWN = config.bullets.spawnCooldown;

  this.init = function(opts) {
    this.spawnCooldown = 0;
    opts.ctor = Bullet;
    sup.init.call(this, opts);

    this.app = GC.gameView;

    this.spawnCooldown = SPAWN_COOLDOWN;
    sup.reset.call(this);
  };

  this.onBulletHit = function(bullet, enemy) {
    effects.emitExplosion(this.particles, enemy);
    enemy.release();
    bullet.release();
    this.setScore(this.score + 1)
  };

  this.update = function(dt) {
    this.spawnCooldown -= dt;
    if (this.spawnCooldown <= 0) {
      this.spawnBullet();
      this.spawnCooldown += SPAWN_COOLDOWN;
    }
    sup.update.call(this, dt);

    // collide bullets with enemies
    this.onFirstPoolCollisions(this.app.enemies, this.onBulletHit, this.app);
  };

  this.spawnBullet = function() {
    if (this.app.gameOver) { return; }
    var x = this.app.player.x;
    var y = this.app.player.y;
    var bullet = this.obtain(x, y, config.bullets);
    bullet.app = this.app;
    config.SHOW_HIT_BOUNDS && bullet.showHitBounds();
  };
});
