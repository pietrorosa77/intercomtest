
let expect = require("expect");
let gpslib = require("../lib/task3/gpslib");

describe("convert degrees to radians", () => {
	it("degrees to radians: should fail with wrong input ", () => {
		expect(() => gpslib.degreesToRadiants("5678.678.890.123")).toThrow("input is not a valid number");
	});

	it("degrees to radians: should give correct value", () => {
		let radians = gpslib.degreesToRadiants("90");
		expect(radians).toBeGreaterThan(1.57079).toBeLessThan(1.57080);
	});

	it("degrees to radians: should give 0 if input is 0", () => {
		let radians = gpslib.degreesToRadiants("0.000");
		expect(radians).toBe(0);
	});

	it("degrees to radians: should give 1 if input is 57.2958", () => {
		let radians = gpslib.degreesToRadiants("57.2958");
		//to fixed gets the specified number of decimal but returns a string
		// using the Unary plus (+) to converting back to number
		let roundedRadians = +radians.toFixed(2);
		expect(roundedRadians).toBe(1.00);
	});
});

describe("check validCoordiNates", () => {
	it("validCoordiNates: should return false with wrong input format", () => {
		let areValid = gpslib.validCoordiNates("5678.678.890.123", "90");
		expect(areValid).toBe(false);
	});

	it("validCoordiNates: should return false with wrong input size: lat > 90 ", () => {
		let areValid = gpslib.validCoordiNates("97", "90");
		expect(areValid).toBe(false);
	});

	it("validCoordiNates: should return false with wrong input size: lon > 180 ", () => {
		let areValid = gpslib.validCoordiNates("45", "190");
		expect(areValid).toBe(false);
	});

	it("validCoordiNates: should return true with lat and lon at edge values", () => {
		let areValid1 = gpslib.validCoordiNates("90", "180");
		let areValid2 = gpslib.validCoordiNates("-90", "180");
		let areValid3 = gpslib.validCoordiNates("-90", "-180");
		let areValid4 = gpslib.validCoordiNates("90", "-180");
		let areValid5 = gpslib.validCoordiNates("0", "0");
		expect(areValid1).toBe(true);
		expect(areValid2).toBe(true);
		expect(areValid3).toBe(true);
		expect(areValid4).toBe(true);
		expect(areValid5).toBe(true);
	});

	it("validCoordiNates: should return true with random valid value", () => {
		let areValid = gpslib.validCoordiNates(53.3393, -6.2576841);
		expect(areValid).toBe(true);
	});
});

describe("getDistanceBetweenTwoPoints", () => {
	it("getDistanceBetweenTwoPoints: should give 0 for same points", () => {
		let distance = gpslib.getDistanceBetweenTwoPoints(53.3393, -6.2576841, 53.3393, -6.2576841);
		expect(distance).toBe(0);
	});

	it("getDistanceBetweenTwoPoints: should give distance greater than 800 km", () => {
		let distance = gpslib.getDistanceBetweenTwoPoints(53.3393, -6.2576841, 53.3393, 6.2576841);
		expect(distance).toBeMoreThan(800);
	});

	it("getDistanceBetweenTwoPoints: should give distance between 8 and 9", () => {
		let expected = 9;
		// coordinates of my village Arqua' Polesine and the main city Rovigo
		// I know that by car is 9 km
		let distance = gpslib.getDistanceBetweenTwoPoints(45.0100, 11.7405, 45.0756, 11.7847);
		expect(expected - distance).toBeLessThan(1);
	});

	it("getDistanceBetweenTwoPoints: should throw an error if invalid coordinates are provided in input", () => {

		expect(() => gpslib.getDistanceBetweenTwoPoints(97, 11.7405, 45.0756, 11.7847))
			.toThrow(`(${97},${11.7405}) are not valid coordinates`);
	});
});

