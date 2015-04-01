import entities.EntityPool as EntityPool;
import entities.Entity as Entity;

import src.config as config;
import src.utils as utils;

var choose = utils.choose;
var rollFloat = utils.rollFloat;

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
    if (this.y + b.y > this.app.player.getScreenY() + config.bgHeight) {
      this.release();
    }
  };
});

/**
 * Enemies Class
 * ~ a collection of enemies
 */
exports = Class(EntityPool, function() {
  var sup = EntityPool.prototype;

  this.init = function(opts) {
    opts.ctor = Enemy;
    sup.init.call(this, opts);
    this.app = GC.gameView;

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
    var x = rollFloat(0, config.bgWidth);
    var y = -(b.y + b.h) + this.app.player.getScreenY();
    var enemy = this.obtain(x, y, type);
    enemy.app = this.app;
    config.SHOW_HIT_BOUNDS && enemy.showHitBounds();

    // vary enemy speeds
    enemy.vy = rollFloat(0.67, 1.33) * enemy.vy;
  };
});
