
let expect = require("expect");
let flattenModule = require("../lib/task2/flattenArray");
describe("Flatten Nested Arrays", function () {
	it("should flatten an arbitrarly nested array of int", function () {
		let input = [[1, 2, [3, [6, 7, [9, 10, [1, 2, [3, [6, 7, [9, 10]]]]]]]], 4];
		let expected = [ 1, 2, 3, 6, 7, 9, 10, 1, 2, 3, 6, 7, 9, 10, 4 ];
		let res = flattenModule.flattenArray(input);
		expect(res).toEqual(expected);
	});

	it("should flatten an arbitrarly nested array of objects", function () {
		let input = [1,2,[3,4,"string",5], 9, 11,[13,[14,{test: "object"}]]];
		let expected = [ 1, 2, 3, 4, 'string', 5, 9, 11, 13, 14, { test: 'object' } ];
		let res = flattenModule.flattenArray(input);
		expect(res).toEqual(expected);
	});

	it("should fail with undefined input", function () {
		let input = undefined;
		expect(() => flattenModule.flattenArray(input)).toThrow("input is null or not an array");
	});

	it("should fail with null input", function () {
		let input = null;
		expect(() => flattenModule.flattenArray(input)).toThrow("input is null or not an array");
	});

	it("should fail with input that isn't an array", function () {
		let input = {test:"not an array"};
		expect(() => flattenModule.flattenArray(input)).toThrow("input is null or not an array");
	});

	it("should return empty array if imput is empty array", function () {
		let input = [];
		let res = flattenModule.flattenArray(input);
		expect(res).toEqual([]);
	});

	it("should return same array if array is already flat", function () {
		let input = [1,2,3,4,5];
		let res = flattenModule.flattenArray(input);
		expect(res).toEqual([1,2,3,4,5]);
	});
});