import src.support.BaseEntityPool as BaseEntityPool;
import src.config as config;

/**
 * Bullets Class
 * ~ a collection of bullets
 */
exports = Class(BaseEntityPool, function(supr) {
  this.spawnEntity = function() {
    if (this.app.gameOver) { return; }
    var x = this.app.player.x;
    var y = this.app.player.y;
    var bullet = this.obtain(x, y, config.bullets);
    bullet.view.style.compositeOperation = 'lighter';
    return bullet;
  };
});
