import animate;

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

/**
 * emitExplosion
 * ~ general explosion effect
 */
exports.emitExplosion = function(engine, entity) {
	var count = 16;
	var data = engine.obtainParticleArray(count);
	var size = 50;
	var ttl = 350;
	var stop = -1000 / ttl;
	var vb = entity.viewBounds;
	var x = entity.x + vb.x + (vb.w - size) / 2;
	var y = entity.y + vb.y + (vb.h - size) / 2;
	// define each particles trajectory
	for (var i = 0; i < count; i++) {
		var p = data[i];
		p.polar = true;
		p.ox = x + rollFloat(-5, 5);
		p.oy = y + rollFloat(-5, 5);
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
		// the rare, non-blending smoke particle is cool
		p.compositeOperation = random() < 0.95 ? "lighter" : "";
	}
	engine.emitParticles(data);
};

/**
 * emitEpicExplosion
 * ~ an over-the-top explosion effect, ideal for player death
 */
exports.emitEpicExplosion = function(engine, entity) {
	var count = 120;
	var circle = count / 8;
	var data = engine.obtainParticleArray(count);
	var size = 50;
	var ttl = 600;
	var stop = -1000 / ttl;
	var vb = entity.viewBounds;
	var x = entity.x + vb.x + (vb.w - size) / 2;
	var y = entity.y + vb.y + (vb.h - size) / 2;
	// define each particles trajectory
	for (var i = 0; i < count; i++) {
		var p = data[i];
		p.polar = true;
		p.anchorX = size / 2;
		p.anchorY = size / 2;
		p.width = size;
		p.height = size;
		p.image = "resources/images/particleCircle.png";
		p.compositeOperation = "lighter";
		if (i === 0) {
			// giant particle fades over the entire screen
			p.ox = x;
			p.oy = y;
			p.scale = 100;
			p.dopacity = -1000 / 75;
			p.ttl = 75;
		} else if (i < circle) {
			// ring shape of particles defines the outer-most explosion
			p.ox = x;
			p.oy = y;
			p.r = TAU * i / circle + PI / 2;
			p.theta = TAU * i / circle;
			p.radius = 0;
			p.dradius = 500;
			p.ddradius = 40000;
			p.scale = 0;
			p.dscale = 8;
			p.ttl = ttl;
			p.transition = "easeOut";
		} else {
			// random distribution of particles defines the inner-explosion
			p.ox = x + rollFloat(-25, 25);
			p.oy = y + rollFloat(-40, 40);
			p.r = TAU * random();
			p.theta = TAU * random();
			p.radius = rollFloat(0, 30);
			p.dradius = rollFloat(250, 750);
			p.ddradius = rollFloat(25000, 75000);
			p.scale = 0;
			p.dscale = rollFloat(0.5, 10);
			p.ttl = ttl;
		}
	}
	engine.emitParticles(data);
};

/**
 * shakeScreen
 * ~ a realistic screen shake effect
 */
exports.shakeScreen = function(rootView) {
	// shake timing
	var ttl = 1000;
	var dt = ttl / 16;
	// shake magnitude
	var m = 1.75;
	var x = rootView.style.x;
	var y = rootView.style.y;
	var s = rootView.style.scale;
	// random shake radii
	var r1 = TAU * random();
	var r2 = TAU * random();
	var r3 = TAU * random();
	var r4 = TAU * random();
	var r5 = TAU * random();
	var r6 = TAU * random();
	var r7 = TAU * random();
	var r8 = TAU * random();
	var r9 = TAU * random();
	var r10 = TAU * random();
	var r11 = TAU * random();
	var r12 = TAU * random();
	var r13 = TAU * random();
	var r14 = TAU * random();

	animate(rootView)
	.then({ scale: s * (1 + 0.05 * m) }, dt, animate.easeIn)
	.then({ x: x + 14 * m * cos(r1), y: y + 14 * m * sin(r1), scale: s * (1 + 0.046 * m) }, dt, animate.easeOut)
	.then({ x: x + 13 * m * cos(r2), y: y + 13 * m * sin(r2), scale: s * (1 + 0.042 * m) }, dt, animate.easeInOut)
	.then({ x: x + 12 * m * cos(r3), y: y + 12 * m * sin(r3), scale: s * (1 + 0.038 * m) }, dt, animate.easeInOut)
	.then({ x: x + 11 * m * cos(r4), y: y + 11 * m * sin(r4), scale: s * (1 + 0.034 * m) }, dt, animate.easeInOut)
	.then({ x: x + 10 * m * cos(r5), y: y + 10 * m * sin(r5), scale: s * (1 + 0.030 * m) }, dt, animate.easeInOut)
	.then({ x: x + 9 * m * cos(r6), y: y + 9 * m * sin(r6), scale: s * (1 + 0.026 * m) }, dt, animate.easeInOut)
	.then({ x: x + 8 * m * cos(r7), y: y + 8 * m * sin(r7), scale: s * (1 + 0.022 * m) }, dt, animate.easeInOut)
	.then({ x: x + 7 * m * cos(r8), y: y + 7 * m * sin(r8), scale: s * (1 + 0.018 * m) }, dt, animate.easeInOut)
	.then({ x: x + 6 * m * cos(r9), y: y + 6 * m * sin(r9), scale: s * (1 + 0.014 * m) }, dt, animate.easeInOut)
	.then({ x: x + 5 * m * cos(r10), y: y + 5 * m * sin(r10), scale: s * (1 + 0.010 * m) }, dt, animate.easeInOut)
	.then({ x: x + 4 * m * cos(r11), y: y + 4 * m * sin(r11), scale: s * (1 + 0.008 * m) }, dt, animate.easeInOut)
	.then({ x: x + 3 * m * cos(r12), y: y + 3 * m * sin(r12), scale: s * (1 + 0.006 * m) }, dt, animate.easeInOut)
	.then({ x: x + 2 * m * cos(r13), y: y + 2 * m * sin(r13), scale: s * (1 + 0.004 * m) }, dt, animate.easeInOut)
	.then({ x: x + 1 * m * cos(r14), y: y + 1 * m * sin(r14), scale: s * (1 + 0.002 * m) }, dt, animate.easeInOut)
	.then({ x: x, y: y, scale: s }, dt, animate.easeIn);
};
