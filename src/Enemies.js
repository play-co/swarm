import src.support.BaseEntityPool as BaseEntityPool;
import src.config as config;
import src.support.utils as utils;

var choose = utils.choose;
var rollFloat = utils.rollFloat;

/**
 * Enemies Class
 * ~ a collection of enemies
 */
exports = Class(BaseEntityPool, function(supr) {
  this.init = function(opts) {
    opts = merge(opts || {}, {
      spawnMin: config.enemies.spawnCooldownMin,
      spawnMax: config.enemies.spawnCooldownMax
    });
    supr(this, 'init', arguments);
  };

  this.spawnEntity = function() {
    // increase game difficulty by spawning more enemies over time
    if (this.spawnMax > this.spawnMin) {
      this.spawnMax--;
    }

    var type = choose(config.enemies.types);
    var b = type.viewBounds;
    var x = rollFloat(0, config.bgWidth);
    var y = -(b.y + b.h) + this.app.player.getScreenY();
    var enemy = this.obtain(x, y, type);

    // vary enemy speeds
    enemy.vy = rollFloat(0.67, 1.33) * enemy.vy;

    return enemy;
  };
});
