import src.utils as utils;

var PI = Math.PI;
var TAU = 2 * PI;
var pow = Math.pow;
var abs = Math.abs;
var sin = Math.sin;
var cos = Math.cos;
var sqrt = Math.sqrt;
var random = Math.random;
var choose = utils.choose;
var rollFloat = utils.rollFloat;
var rollInt = utils.rollInt;

var SMOKE_IMAGES = [
	"resources/images/particleSmoke1.png",
	"resources/images/particleSmoke2.png",
	"resources/images/particleSmoke3.png",
	"resources/images/particleSmoke4.png",
	"resources/images/particleSmoke5.png",
	"resources/images/particleSmoke6.png"
];

exports.emitExplosion = function(engine, entity) {
	var count = 16;
	var data = engine.obtainParticleArray(count);
	var size = 50;
	var ttl = 350;
	var stop = -1000 / ttl;
	var vb = entity.viewBounds;
	var x = entity.x + vb.x + vb.w / 2;
	var y = entity.y + vb.y + vb.h / 2;
	for (var i = 0; i < count; i++) {
		var p = data[i];
		p.polar = true;
		p.ox = x - size / 2 + rollFloat(-5, 5);
		p.oy = y - size / 2 + rollFloat(-5, 5);
		p.radius = rollFloat(-5, 5);
		p.dradius = rollFloat(0, 400);
		p.ddradius = stop * p.dradius;
		p.theta = TAU * random();
		p.r = TAU * random();
		p.dr = rollFloat(-4, 4);
		p.ddr = stop * p.dr;
		p.anchorX = size / 2;
		p.anchorY = size / 2;
		p.width = size;
		p.height = size;
		p.scale = rollFloat(0.25, 2.5);
		p.dscale = stop * p.scale;
		p.ttl = ttl;
		p.image = choose(SMOKE_IMAGES);
		p.compositeOperation = random() < 0.95 ? "lighter" : "";
	}
	engine.emitParticles(data);
};
