var PLAYER_SIZE = 112;
var BULLET_SIZE = 28;
var CIRCLE_ENEMY_SIZE = 80;
var SQUARE_ENEMY_SIZE = 100;
var RECT_ENEMY_WIDTH = 30;
var RECT_ENEMY_HEIGHT = 120;

exports = {
	player: {
		isCircle: true,
		hitBounds: {
			x: 0,
			y: 0,
			r: PLAYER_SIZE / 2
		},
		viewBounds: {
			x: -PLAYER_SIZE / 2,
			y: -PLAYER_SIZE / 2,
			w: PLAYER_SIZE,
			h: PLAYER_SIZE
		},
		image: "resources/images/shapeCircle.png",
		inputMoveMultiplier: 1.5
	},
	bullets: {
		isCircle: true,
		vx: 0,
		vy: -1.25,
		hitBounds: {
			x: 0,
			y: 0,
			r: BULLET_SIZE / 2
		},
		viewBounds: {
			x: -BULLET_SIZE / 2,
			y: -BULLET_SIZE / 2,
			w: BULLET_SIZE,
			h: BULLET_SIZE
		},
		image: "resources/images/shapeCircle.png",
		spawnCooldown: 100
	},
	enemies: {
		types: [
			{
				id: "enemyCircle",
				isCircle: true,
				vx: 0,
				vy: 0.5,
				hitBounds: {
					x: 0,
					y: 0,
					r: CIRCLE_ENEMY_SIZE / 2
				},
				viewBounds: {
					x: -CIRCLE_ENEMY_SIZE / 2,
					y: -CIRCLE_ENEMY_SIZE / 2,
					w: CIRCLE_ENEMY_SIZE,
					h: CIRCLE_ENEMY_SIZE
				},
				image: "resources/images/shapeCircle.png"
			},
			{
				id: "enemySquare",
				isCircle: false,
				vx: 0,
				vy: 0.66,
				hitBounds: {
					x: -SQUARE_ENEMY_SIZE / 2,
					y: -SQUARE_ENEMY_SIZE / 2,
					w: SQUARE_ENEMY_SIZE,
					h: SQUARE_ENEMY_SIZE
				},
				viewBounds: {
					x: -SQUARE_ENEMY_SIZE / 2,
					y: -SQUARE_ENEMY_SIZE / 2,
					w: SQUARE_ENEMY_SIZE,
					h: SQUARE_ENEMY_SIZE
				},
				image: "resources/images/shapeRect.png"
			},
			{
				id: "enemyRect",
				isCircle: false,
				vx: 0,
				vy: 0.4,
				hitBounds: {
					x: -RECT_ENEMY_WIDTH / 2,
					y: -RECT_ENEMY_HEIGHT / 2,
					w: RECT_ENEMY_WIDTH,
					h: RECT_ENEMY_HEIGHT
				},
				viewBounds: {
					x: -RECT_ENEMY_WIDTH / 2,
					y: -RECT_ENEMY_HEIGHT / 2,
					w: RECT_ENEMY_WIDTH,
					h: RECT_ENEMY_HEIGHT
				},
				image: "resources/images/shapeRect.png"
			}
		],
		spawnCooldownMin: 50,
		spawnCooldownMax: 350
	}	
};
