import src.support.BaseEntityPool as BaseEntityPool;
import src.config as config;

/**
 * Bullet Class
 * ~ an individual bullet
 */
// var Bullet = Class(BaseEntity, function(supr) {
//   this.name = "Bullet";

//   this.init = function(opts) {
//     opts.compositeOperation = "lighter";
//     supr(this, 'init', arguments);
//   };
// });

/**
 * Bullets Class
 * ~ a collection of bullets
 */
exports = Class(BaseEntityPool, function(supr) {
  this.init = function(opts) {
    opts = merge(opts || {}, {
      spawnMin: config.bullets.spawnCooldown
    });
    supr(this, 'init', arguments);
  };

  this.spawnEntity = function() {
    if (this.app.gameOver) { return; }
    var x = this.app.player.x;
    var y = this.app.player.y;
    var bullet = this.obtain(x, y, config.bullets);
    bullet.style.compositeOperation = 'lighter';
    return bullet;
  };
});
