import ui.SpriteView as SpriteView;

import entities.Entity as Entity;
import src.config as config;
import src.effects as effects;

var max = Math.max;
var min = Math.min;
var abs = Math.abs;

/**
 * Player Class
 */
exports = Class(Entity, function() {
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
    this.app = GC.gameView;

    sup.reset.call(this, OFF_X, OFF_Y, config.player);
    this.view.resetAllAnimations(config.player);
    this.animating = false;
    this.inputStartX = 0;
    config.SHOW_HIT_BOUNDS && this.showHitBounds();
  };

  this.startInput = function() {
    this.inputStartX = this.x;
  };

  this.updateInput = function(dx, dy) {
    var xPrev = this.x;
    this.x = max(0, min(config.bgWidth, this.inputStartX + PLAYER_MOVE_MULT * dx));

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
    // special effects on player death
    effects.emitExplosion(this.app.particles, this);
    effects.emitEpicExplosion(this.app.particles, this);
  };

  this.getScreenY = function() {
    return this.y - OFF_Y;
  };
});