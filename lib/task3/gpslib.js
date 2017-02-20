/**
 * A module with gps core functions
 * @module gpslib
 */

/**
 * Returns true if the value passed in input is a valid number false otherwise.
 * @param {string} value - the value we want to test.
 */
let isValidNumber = (value) => {
	let pattern = new RegExp("^\-?[0-9]+[\.]{0,1}[0-9]*$", "i");
	return pattern.test(value);
}

/**
 * Returns true if the number is between min and max
 * @param {number|string} number - the number we want to test.
 * @param {number} min - upperbound.
 * @param {number} max - lowerbound.
 */
let inrange = (min, number, max) => {
	return isValidNumber(number) && (number >= min) && (number <= max);
}

/** the earth radius in km */
const EARTH_RADIUS = 6371;

/**
 * Returns true if the coordinates passed in input in degrees are within the allowed bounds : 
 * -90 to 90 for latitude
 * -180 to 180 for longitude
 * @param {number|string} latitude - latitude we want to test.
 * @param {number|string} longitude - longitude we want to test.
 */
let validCoordiNates = (latitude, longitude) => {
	if (isValidNumber(latitude) && isValidNumber(longitude)) {
		return (inrange(-90, latitude, 90) && inrange(-180, longitude, 180));
	}
	return false;
}

/**
 * Convert the input value from degrees to radiants.  Throws error if the input provided is not valid
 * @param {number|string} degrees - quantity we want to convert into radiants
 */
let degreesToRadiants = (degrees) => {
	if (!isValidNumber(degrees)) {
		throw new Error("input is not a valid number");
	}
	return degrees * (Math.PI / 180);
}

/**
 * calculates the distance in km between 2 points (tolat, tolon) and (originLat, originLon) whoose cohordinates
 * are expressed in degrees. Throws error if the coordinates provided are not valid
 * @param {number|string} tolat - destination latitude
 * @param {number|string} tolon - destination longitude
 * @param {number|string} originLat - origin latitude
 * @param {number|string} originLon - origin longitude
 */
let getDistanceBetweenTwoPoints = (tolat, tolon, originLat, originLon) => {
	if(!validCoordiNates(tolat, tolon)){
		throw new Error(`(${tolat},${tolon}) are not valid coordinates`);
	}

	if(!validCoordiNates(originLat, originLon)){
		throw new Error(`(${originLat},${originLon}) are not valid coordinates`);
	}

	let tolatRad =  degreesToRadiants(tolat);
	let toLonRad =  degreesToRadiants(tolon);
	let orLatRan =  degreesToRadiants(originLat);
	let orLonRad =  degreesToRadiants(originLon);
	return Math.acos(Math.sin(orLatRan) * Math.sin(tolatRad) +
		Math.cos(orLatRan) * Math.cos(tolatRad) * Math.cos(orLonRad - toLonRad)) * EARTH_RADIUS;
};


exports.degreesToRadiants = degreesToRadiants;
exports.validCoordiNates = validCoordiNates;
exports.getDistanceBetweenTwoPoints = getDistanceBetweenTwoPoints;

