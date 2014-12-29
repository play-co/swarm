import ui.resource.loader as loader;

// devkit utility functions

// shortcuts
var log = Math.log;
var random = Math.random;
var resourceMap = loader.getMap();

// return a randomly selected item from an array
exports.choose = function(arr) {
	return arr[~~(random() * arr.length)];
};

// copy object properties, without copying other objects or arrays
exports.copyShallow = function(src, dest, keys) {
	keys = keys || Object.keys(src);
	for (var i = 0, len = keys.length; i < len; i++) {
		var prop = keys[i];
		var val = src[prop];
		dest[prop] = val && typeof val === 'object' ? val.length === void 0 ? {} : [] : val;
	}
};

// create global or object property enumerations
exports.Enum = function (vars, target) {
	target = target || window;
	for (var i = 0, len = vars.length; i < len; i++) {
		target[vars[i]] = i;
	}
	return target;
};

// create global or object property enumerations identifying an array of objects
exports.EnumObjectsByID = function (varsObjArray, nameKey, indexKey, target) {
	nameKey = nameKey || 'name';
	indexKey = indexKey || 'id';
	target = target || window;
	for (var i = 0, len = varsObjArray.length; i < len; i++) {
		var obj = varsObjArray[i];
		target[obj[nameKey]] = i;
		obj[indexKey] = i;
	}
	return target;
};

// return the width of an image asset
exports.getImageWidth = function(url) {
	var map = resourceMap[url];
	var width = 0;
	if (map) {
		width = map.w + map.marginLeft + map.marginRight;
	}
	return width;
};

// return the height of an image asset
exports.getImageHeight = function(url) {
	var map = resourceMap[url];
	var height = 0;
	if (map) {
		height = map.h + map.marginTop + map.marginBottom;
	}
	return height;
};

// logarithm with any base
exports.logBase = function(b, x) {
	return log(x) / log(b);
};

// read JSON from a file
exports.readJSON = function(url) {
	try {
		if (typeof window.CACHE[url] === 'string') {
			window.CACHE[url] = JSON.parse(window.CACHE[url]);
		}
		if (window.CACHE[url] === void 0) {
			console.error('utils.readJSON: Unable to read file:', url);
			throw new Error('utils.readJSON: Fail!');
		}
		return window.CACHE[url];
	} catch (e) {
		console.error('utils.readJSON: Invalid JSON!');
		throw e;
	}
};

// return a random float, min <= n < max
exports.rollFloat = function(min, max) {
	return min + random() * (max - min);
};

// return a random integer, min <= n <= max
exports.rollInt = function(min, max) {
	return ~~(min + random() * (1 + max - min));
};

// shuffle an array
exports.shuffle = function(a) {
	var l = a.length;
	while (l > 0) {
		var i = ~~(random() * l--);
		var temp = a[l];
		a[l] = a[i];
		a[i] = temp;
	}
	return a;
};
