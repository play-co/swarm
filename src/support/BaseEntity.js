import entities.Entity as Entity;

import src.config as config;

exports = Class(Entity, function(supr) {
  /**
    * Update the individual entity. Release from the parent EntityPool if
    * off screen
    */
  this.update = function(dt) {
    supr(this, 'update', arguments);

    var b = this.viewBounds;
    var thisY = this.y + b.y;
    var playerY = this.app.player.getScreenY();
    // Make sure the entity is still on screen
    if (thisY > playerY + config.bgHeight
        || thisY + b.h < playerY) {
      this.release();
    }
  };
});