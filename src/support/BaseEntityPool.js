import entities.EntityPool as EntityPool;

import src.support.BaseEntity as BaseEntity;

import src.config as config;
import src.support.utils as utils;

var choose = utils.choose;
var rollFloat = utils.rollFloat;

/**
 * Enemies Class
 * ~ a collection of enemies
 */
exports = Class(EntityPool, function(supr) {
  this.init = function(opts) {
    opts = merge(opts || {}, {
      ctor: BaseEntity
    });
    supr(this, 'init', arguments);
    this.app = GC.gameView;

    if (opts.spawnEntity) {
      this.spawnEntity = bind(this, opts.spawnEntity);
    }

    this.spawnCooldown = 0;
    this.spawnMin = opts.spawnMin || 10;
    this.spawnMax = opts.spawnMax || this.spawnMin;
    supr(this, 'reset');
  };

  this.update = function(dt) {
    this.spawnCooldown -= dt;
    if (this.spawnCooldown <= 0) {
      var newEnt = this.spawnEntity();
      if (newEnt) {
        newEnt.app = this.app;
        config.SHOW_HIT_BOUNDS && newEnt.showHitBounds();
      }

      this.spawnCooldown += rollFloat(this.spawnMin, this.spawnMax);
    }
    supr(this, 'update', arguments);
  };

  /**
    * Stub
    */
  this.spawnEntity = function() {};
});
