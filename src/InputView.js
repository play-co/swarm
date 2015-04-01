import ui.View as View;

/**
 * InputView Class
 * ~ a view that manages game input
 */
exports = Class(View, function() {
  var sup = View.prototype;

  this.init = function(opts) {
    opts.infinite = true;
    var parentStyle = (opts.parent && opts.parent.style) || (opts.superview && opts.superview.style);
    opts.width = parentStyle.width;
    opts.height = parentStyle.height;
    sup.init.call(this, opts);
    this.app = GC.gameView;

    this.touchId = null;
    this.startPt = null;
  };

  this.onInputStart = function(evt, pt) {
    if (this.touchId === null) {
      this.app.player.startInput();
      this.touchId = evt.id;
      this.startPt = pt;
    }
  };

  this.onInputMove = function(evt, pt) {
    if (evt.id !== this.touchId) { return; }

    var startPt = this.startPt;
    var scale = 1 / this.app.bgLayer.style.scale;
    var dx = scale * (pt.x - startPt.x);
    var dy = scale * (pt.y - startPt.y);
    this.app.player.updateInput(dx, dy);
  };

  this.onInputSelect = function(evt, pt) {
    if (evt.id !== this.touchId) { return; }

    this.touchId = null;
  };
});
