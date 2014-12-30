var BG_WIDTH = 576;
var BG_HEIGHT = 1024;
var PLAYER_SIZE = 112;
var BULLET_SIZE = 28;
var CIRCLE_ENEMY_SIZE = 80;
var SQUARE_ENEMY_SIZE = 100;
var RECT_ENEMY_WIDTH = 30;
var RECT_ENEMY_HEIGHT = 120;

exports = {
	bgWidth: BG_WIDTH,
	bgHeight: BG_HEIGHT,
	player: {
		zIndex: 50,
		isCircle: true,
		vx: 0,
		vy: -0.25,
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
		inputMoveMultiplier: 1.5,
		offsetX: BG_WIDTH / 2,
		offsetY: BG_HEIGHT - 1.5 * PLAYER_SIZE
	},
	bullets: {
		zIndex: 45,
		isCircle: true,
		vx: 0,
		vy: -1.5,
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
				id: "enemySquare",
				zIndex: 41,
				isCircle: false,
				vx: 0,
				vy: 0.35,
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
				id: "enemyCircle",
				zIndex: 40,
				isCircle: true,
				vx: 0,
				vy: 0.25,
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
				id: "enemyRect",
				zIndex: 39,
				isCircle: false,
				vx: 0,
				vy: 0.15,
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
		spawnCooldownMax: 500
	},
	parallax: [
		{
			id: "bg",
			zIndex: 1,
			xMultiplier: 0,
			xCanSpawn: false,
			xCanRelease: false,
			yMultiplier: 0.125,
			yCanSpawn: true,
			yCanRelease: true,
			ordered: true,
			pieceOptions: [
				{
					id: "bg1",
					image: "resources/images/bg1.png"
				},
				{
					id: "bg2",
					image: "resources/images/bg2.png"
				},
				{
					id: "bg3",
					image: "resources/images/bg3.png"
				},
				{
					id: "bg4",
					image: "resources/images/bg4.png"
				}
			]
		},
		{
			id: "farClouds",
			zIndex: 2,
			xMultiplier: 0,
			xCanSpawn: false,
			xCanRelease: false,
			yMultiplier: 0.2,
			yCanSpawn: true,
			yCanRelease: true,
			yGapRange: [256, 768],
			pieceOptions: [
				{
					id: "farCloudstream1",
					opacity: 0.125,
					compositeOperation: "lighter",
					image: "resources/images/bgStream1.png"
				},
				{
					id: "farCloudstream2",
					opacity: 0.125,
					compositeOperation: "lighter",
					image: "resources/images/bgStream2.png"
				},
				{
					id: "farCloudstreamFlip1",
					flipX: true,
					opacity: 0.125,
					compositeOperation: "lighter",
					image: "resources/images/bgStream1.png"
				},
				{
					id: "farCloudstreamFlip2",
					flipX: true,
					opacity: 0.125,
					compositeOperation: "lighter",
					image: "resources/images/bgStream2.png"
				}
			]
		},
		{
			id: "midClouds",
			zIndex: 3,
			xMultiplier: 0,
			xCanSpawn: false,
			xCanRelease: false,
			yMultiplier: 0.4,
			yCanSpawn: true,
			yCanRelease: true,
			yGapRange: [512, 1536],
			pieceOptions: [
				{
					id: "midCloudstream1",
					styleRanges: { scale: [1.5, 3] },
					opacity: 0.175,
					compositeOperation: "lighter",
					image: "resources/images/bgStream1.png"
				},
				{
					id: "midCloudstream2",
					styleRanges: { scale: [1.5, 3] },
					opacity: 0.175,
					compositeOperation: "lighter",
					image: "resources/images/bgStream2.png"
				},
				{
					id: "midCloudstreamFlip1",
					flipX: true,
					styleRanges: { scale: [1.5, 3] },
					opacity: 0.175,
					compositeOperation: "lighter",
					image: "resources/images/bgStream1.png"
				},
				{
					id: "midCloudstreamFlip2",
					flipX: true,
					styleRanges: { scale: [1.5, 3] },
					opacity: 0.175,
					compositeOperation: "lighter",
					image: "resources/images/bgStream2.png"
				}
			]
		}
	],
	scoreView: {
		x: 8,
		y: 4,
		width: 200,
		height: 75,
		text: "0",
		horizontalAlign: "left",
		spacing: 0,
		characterData: {
			"0": { image: "resources/images/blue_0.png" },
			"1": { image: "resources/images/blue_1.png" },
			"2": { image: "resources/images/blue_2.png" },
			"3": { image: "resources/images/blue_3.png" },
			"4": { image: "resources/images/blue_4.png" },
			"5": { image: "resources/images/blue_5.png" },
			"6": { image: "resources/images/blue_6.png" },
			"7": { image: "resources/images/blue_7.png" },
			"8": { image: "resources/images/blue_8.png" },
			"9": { image: "resources/images/blue_9.png" }
		},
		compositeOperation: "lighter"
	}
};
