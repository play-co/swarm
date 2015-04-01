import device;
import ui.View as View;
import ui.ScoreView as ScoreView;

import src.config as config;

var min = Math.min;

exports = Class(View, function(supr) {

  this.init = function(opts) {
    GC.gameView = this;
    supr(this, 'init', arguments);

    this.score = 0;
    this.timeMult = 1;
    this.gameOver = false;

    this.setScreenDimensions(config.bgWidth > config.bgHeight);

    // blocks player input to avoid traversing game elements' view hierarchy
    this.bgLayer = new View({
      parent: this,
      y: this.style.height - config.bgHeight,
      width: config.bgWidth,
      height: config.bgHeight,
      blockEvents: true
    });

    // scrolling layer relative to player
    this.elementLayer = new View({
      parent: this.bgLayer,
      zIndex: 10,
      x: 0,
      y: 0
    });

    // display player's score
    this.scoreView = new ScoreView(merge({ parent: this }, config.scoreView));
    this.scoreView.setText(this.score);

    this._gameElements = [];
  };

  /** Registers a new game element, will be updated every tick with the adjusted
        dt */
  this.newGameElement = function(ctor, opts) {
    opts = merge({ parent: this.elementLayer }, opts || {});
    // var newArgs = [].splice.call(arguments, 1);
    var e = new ctor(opts);
    this._gameElements.push(e);
    return e;
  };

  /** Set the current score and update the score text */
  this.setScore = function(score) {
    this.score = score;
    this.scoreView.setText(this.score);
  };

  /**
   * setScreenDimensions
   * ~ normalizes the game's root view to fit any device screen
   */
  this.setScreenDimensions = function(horz) {
    var ds = device.screen;
    var vs = this.style;
    vs.width = horz ? ds.width * (config.bgHeight / ds.height) : config.bgWidth;
    vs.height = horz ? config.bgHeight : ds.height * (config.bgWidth / ds.width);
    vs.scale = horz ? ds.height / config.bgHeight : ds.width / config.bgWidth;
  };

  this.onGameOver = function() {
    this.gameOver = true;
    // reset the game after 2.5 seconds
    setTimeout(bind(GC.app, 'resetGame'), config.gameOverDelay);
  };

  /**
   * tick
   * ~ called automatically by devkit for each frame
   * ~ updates all game elements by delta time, dt
   */
  this.tick = function(dt) {
    // speed up or slow down the passage of time
    dt = min(this.timeMult * dt, config.maxTick);
    for (var i = 0; i < this._gameElements.length; ++i) {
      var e = this._gameElements[i];
      if (e.update) {
        e.update(dt);
      } else if (e.runTick) {
        e.runTick(dt);
      }
    }

    this.update(dt);
  };

  /** Stub to update game logic */
  this.update = function(dt) {};

});