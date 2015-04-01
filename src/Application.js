import device;
import src.GameView as GameView;

/**
 * Application Class
 * ~ automatically instantiated by devkit
 * ~ handles game initialization and loop
 */
exports = Class(GC.Application, function(supr) {
  /**
   * initUI
   * ~ called automatically by devkit
   * ~ initialize view hierarchy and game elements
   */
  this.launchUI = this.initUI = function() {
    this.resetGame();
  };

  /** Create a new BaseGameView (after removing all old views from game) */
  this.resetGame = function() {
    this.removeAllSubviews();
    var gameView = new GameView({
      superview: this,
      x: 0,
      y: 0,
      width: device.width,
      height: device.height
    });
  };
});
