var BG_WIDTH = 576;
var BG_HEIGHT = 1024;
var PLAYER_SIZE = 96;
var BULLET_SIZE = 28;
var ENEMY_MINE_SIZE = 80;
var ENEMY_DRONE_SIZE = 112;
var ENEMY_DEBRIS_WIDTH = 36;
var ENEMY_DEBRIS_HEIGHT = 168;

exports = {
	bgWidth: BG_WIDTH,
	bgHeight: BG_HEIGHT,
	player: {
		url: "resources/images/player",
		defaultAnimation: "fly",
		autoStart: true,
		loop: true,
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
					x: -ENEMY_DRONE_SIZE / 2,
					y: -ENEMY_DRONE_SIZE / 2,
					w: ENEMY_DRONE_SIZE,
					h: ENEMY_DRONE_SIZE
				},
				viewBounds: {
					x: -ENEMY_DRONE_SIZE / 2,
					y: -ENEMY_DRONE_SIZE / 2,
					w: ENEMY_DRONE_SIZE,
					h: ENEMY_DRONE_SIZE
				},
				image: "resources/images/enemyDrone.png"
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
					r: ENEMY_MINE_SIZE / 2
				},
				viewBounds: {
					x: -ENEMY_MINE_SIZE / 2,
					y: -ENEMY_MINE_SIZE / 2,
					w: ENEMY_MINE_SIZE,
					h: ENEMY_MINE_SIZE
				},
				image: "resources/images/enemyMine.png"
			},
			{
				id: "enemyRect",
				zIndex: 39,
				isCircle: false,
				vx: 0,
				vy: 0.15,
				hitBounds: {
					x: -ENEMY_DEBRIS_WIDTH / 2,
					y: -ENEMY_DEBRIS_HEIGHT / 2,
					w: ENEMY_DEBRIS_WIDTH,
					h: ENEMY_DEBRIS_HEIGHT
				},
				viewBounds: {
					x: -ENEMY_DEBRIS_WIDTH / 2,
					y: -ENEMY_DEBRIS_HEIGHT / 2,
					w: ENEMY_DEBRIS_WIDTH,
					h: ENEMY_DEBRIS_HEIGHT
				},
				image: "resources/images/enemyDebris.png"
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
			yGapRange: [200, 500],
			pieceOptions: [
				{
					id: "farCloudstream1",
					styleRanges: { scale: [1, 2] },
					opacity: 0.125,
					compositeOperation: "lighter",
					image: "resources/images/bgStream1.png"
				},
				{
					id: "farCloudstream2",
					styleRanges: { scale: [1, 2] },
					opacity: 0.125,
					compositeOperation: "lighter",
					image: "resources/images/bgStream2.png"
				},
				{
					id: "farCloudstreamFlip1",
					flipX: true,
					styleRanges: { scale: [1, 2] },
					opacity: 0.125,
					compositeOperation: "lighter",
					image: "resources/images/bgStream1.png"
				},
				{
					id: "farCloudstreamFlip2",
					flipX: true,
					styleRanges: { scale: [1, 2] },
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
			yGapRange: [400, 1000],
			pieceOptions: [
				{
					id: "midCloudstream1",
					styleRanges: { scale: [2, 4] },
					opacity: 0.175,
					compositeOperation: "lighter",
					image: "resources/images/bgStream1.png"
				},
				{
					id: "midCloudstream2",
					styleRanges: { scale: [2, 4] },
					opacity: 0.175,
					compositeOperation: "lighter",
					image: "resources/images/bgStream2.png"
				},
				{
					id: "midCloudstreamFlip1",
					flipX: true,
					styleRanges: { scale: [2, 4] },
					opacity: 0.175,
					compositeOperation: "lighter",
					image: "resources/images/bgStream1.png"
				},
				{
					id: "midCloudstreamFlip2",
					flipX: true,
					styleRanges: { scale: [2, 4] },
					opacity: 0.175,
					compositeOperation: "lighter",
					image: "resources/images/bgStream2.png"
				}
			]
		},
		{
			id: "debrisFar",
			zIndex: 4,
			xMultiplier: 0,
			xCanSpawn: false,
			xCanRelease: false,
			yMultiplier: 0.6,
			yCanSpawn: true,
			yCanRelease: true,
			pieceOptions: [
				{
					id: "debrisFar1",
					image: "resources/images/bgFarDebris1.png"
				},
				{
					id: "debrisFar2",
					image: "resources/images/bgFarDebris2.png"
				},
				{
					id: "debrisFar3",
					image: "resources/images/bgFarDebris3.png"
				},
				{
					id: "debrisFar4",
					image: "resources/images/bgFarDebris4.png"
				},
				{
					id: "debrisFar5",
					image: "resources/images/bgFarDebris5.png"
				},
				{
					id: "debrisFar6",
					flipX: true,
					image: "resources/images/bgFarDebris1.png"
				},
				{
					id: "debrisFar7",
					flipX: true,
					image: "resources/images/bgFarDebris2.png"
				},
				{
					id: "debrisFar8",
					flipX: true,
					image: "resources/images/bgFarDebris3.png"
				},
				{
					id: "debrisFar9",
					flipX: true,
					image: "resources/images/bgFarDebris4.png"
				},
				{
					id: "debrisFar10",
					flipX: true,
					image: "resources/images/bgFarDebris5.png"
				}
			]
		},
		{
			id: "debrisLeft",
			zIndex: 5,
			xMultiplier: 0,
			xCanSpawn: false,
			xCanRelease: false,
			yMultiplier: 0.8,
			yCanSpawn: true,
			yCanRelease: true,
			yGapRange: [0, 250],
			pieceOptions: [
				{
					id: "debrisLeft1",
					image: "resources/images/bgDebris1.png"
				},
				{
					id: "debrisLeft2",
					image: "resources/images/bgDebris2.png"
				},
				{
					id: "debrisLeft3",
					image: "resources/images/bgDebris3.png"
				},
				{
					id: "debrisLeft4",
					image: "resources/images/bgDebris4.png"
				}
			]
		},
		{
			id: "debrisRight",
			zIndex: 5,
			xMultiplier: 0,
			xCanSpawn: false,
			xCanRelease: false,
			yMultiplier: 0.8,
			yCanSpawn: true,
			yCanRelease: true,
			yGapRange: [0, 250],
			pieceOptions: [
				{
					id: "debrisRight1",
					x: BG_WIDTH,
					xAlign: "right",
					flipX: true,
					image: "resources/images/bgDebris1.png"
				},
				{
					id: "debrisRight2",
					x: BG_WIDTH,
					xAlign: "right",
					flipX: true,
					image: "resources/images/bgDebris2.png"
				},
				{
					id: "debrisRight3",
					x: BG_WIDTH,
					xAlign: "right",
					flipX: true,
					image: "resources/images/bgDebris3.png"
				},
				{
					id: "debrisRight4",
					x: BG_WIDTH,
					xAlign: "right",
					flipX: true,
					image: "resources/images/bgDebris4.png"
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
