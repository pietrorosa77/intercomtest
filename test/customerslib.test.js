
let expect = require("expect");
let custLib = require("../lib/task3/customerslib");
let nock = require("nock");

describe("getCustomers", () => {
	it("getCustomers: given an existing path should return an array of customers", (done) => {
		custLib.getCustomers("./test/testCustomers.json", "utf8")
			.then((data) => {
				expect(data).toExist();
				expect(Array.isArray(data)).toBe(true);
				expect(data.length).toEqual(32);
				done();
			})
			.catch((err) => done(err));
	});

	it("getCustomers: should fail reading from wrong path", (done) => {
		custLib.getCustomers("./wrongpath/testCustomers.json", "utf8")
			.then((data) => {
				done(new Error("should fail reading the file"));
			})
			.catch((err) => {
				expect(err).toExist();
				expect(err.message).toExist().toContain("no such file or directory");
				done()
			});
	});

	it("getCustomers: given an existing url should return an array of customers", (done) => {
		let remoteFile = "https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt";
		let expected = [
			{ "latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701" },
			{ "latitude": "51.92893", "user_id": 1, "name": "stubbbbb", "longitude": "-10.27699" },
			{ "latitude": "51.8856167", "user_id": 2, "name": "Ian McArdle", "longitude": "-10.4240951" }
		];
		let mockedHttpReq = nock("https://gist.githubusercontent.com")
			.get("/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt")
			.replyWithFile(200, `${__dirname}/testCustomers.json`);
		custLib.getCustomers(remoteFile)
			.then((data) => {
				expect(data).toExist();
				expect(Array.isArray(data)).toBe(true);
				expect(data.length).toEqual(32);
				done();
			})
			.catch((err) => done(err));
	});

	it("getCustomers: should fail if the remote file doesn't exist", (done) => {
		let remoteFile = "https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt";

		let mockedHttpReq = nock("https://gist.githubusercontent.com")
			.get("/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt")
			.reply(404, "file doesn't exists");

		custLib.getCustomers(remoteFile)
			.then((data) => {
				done(new Error("should fail reading the file"));
			})
			.catch((err) => {
				expect(err).toExist();
				expect(err.message).toExist().toContain("Failed to load page, status code: 404");
				done();
			});
	});
});

describe("customers list validator", () => {
	it("isValidList: should return true given a valid list ", () => {
		let validList = [
			{ "latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701" },
			{ "latitude": "51.92893", "user_id": 1, "name": "stubbbbb", "longitude": "-10.27699" },
			{ "latitude": "51.8856167", "user_id": 2, "name": "Ian McArdle", "longitude": "-10.4240951" }
		];

		let valResult = custLib.isValidList(validList);
		expect(valResult.valid).toBe(true);
	});

	it("isValidList: should return true given an empty list ", () => {
		let validList = [];

		let valResult = custLib.isValidList(validList);
		expect(valResult.valid).toBe(true);
	});

	it("isValidList: should return false given a null list ", () => {
		let validList = null;
		let valResult = custLib.isValidList(validList);
		expect(valResult.valid).toBe(false);
		expect(valResult.errors[0].message).toEqual("is not of a type(s) array");
	});

	it("isValidList: should return false given an entry with wrong coordinates format ", () => {
		let validList = [
			{ "latitude": "52.98.637.5", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701" },
			{ "latitude": "51.92893", "user_id": 1, "name": "stubbbbb", "longitude": "-10.27699" },
			{ "latitude": "51.8856167", "user_id": 2, "name": "Ian McArdle", "longitude": "-10.4240951" }
		];

		let valResult = custLib.isValidList(validList);
		expect(valResult.valid).toBe(false);
		expect(valResult.errors[0].property).toEqual("instance[0].latitude");
		expect(valResult.errors[0].message).toEqual('does not match pattern "^-?[0-9]+[.]{0,1}[0-9]*$"');
	});
});

describe("isCustomerInRange", () => {
	it("isCustomerInRange: should return true if customer and origin are the same ", () => {
		let customer = { "latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701" };

		let result = custLib.isCustomerInRange(customer, 52.986375, -6.043701, 0);
		expect(result).toBe(true);
	});

	it("isCustomerInRange: should throw error  if customer has invalid coordinates ", () => {
		let customer = { "latitude": "52.9863.75", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701" };
		expect(() => custLib.isCustomerInRange(customer, 52.986375, -6.043701, 0)).toThrow("(52.9863.75,-6.043701) are not valid coordinates");

	});

	it("isCustomerInRange: customer should be in range of 100 km from intercom office", () => {
		let customer = { "latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701" };
		let result = custLib.isCustomerInRange(customer, 53.3393, -6.2576841, 100);
		expect(result).toBe(true);
	});

	it("isCustomerInRange: customer shouldn't be in range of 100 km from intercom office", () => {
		let customer = { "latitude": "55.033", "user_id": 19, "name": "Enid Cahill", "longitude": "-8.112" };
		let result = custLib.isCustomerInRange(customer, 53.3393, -6.2576841, 100);
		expect(result).toBe(false);
	});
});

describe("customerComparer", () => {
	it("customerComparer: customer list should be sorted ascending on the user_id", () => {
		let custList = [
			{ "latitude": "52.98.637.5", "user_id": 7, "name": "Christina McArdle", "longitude": "-6.043701" },
			{ "latitude": "51.92893", "user_id": 5, "name": "stubbbbb", "longitude": "-10.27699" },
			{ "latitude": "51.8856167", "user_id": 2, "name": "Ian McArdle", "longitude": "-10.4240951" },
			{ "latitude": "52.98.637.5", "user_id": 8, "name": "Christina McArdle", "longitude": "-6.043701" },
			{ "latitude": "51.92893", "user_id": 1, "name": "stubbbbb", "longitude": "-10.27699" },
			{ "latitude": "51.8856167", "user_id": 4, "name": "Ian McArdle", "longitude": "-10.4240951" },
			{ "latitude": "52.98.637.5", "user_id": 6, "name": "Christina McArdle", "longitude": "-6.043701" },
			{ "latitude": "51.92893", "user_id": 0, "name": "stubbbbb", "longitude": "-10.27699" },
			{ "latitude": "51.8856167", "user_id": 3, "name": "Ian McArdle", "longitude": "-10.4240951" }
		];

		let result = custList.sort(custLib.customerComparer);
		for (let i = 0; i < result.length; i++) {
			expect(result[i].user_id).toBe(i);
		}
	});

	it("customerComparer: customer list should be sorted ascending on the user_id (alternative test)", (done) => {
		custLib.getCustomers("./test/testCustomers.json", "utf8")
			.then((custList) => {
				let result = custList.sort(custLib.customerComparer);
				for (let i, prev = 0; i < result.length; i++) {
					expect(result[i].user_id).toBeGreaterThanOrEqualTo(prev);
					prev = result[i].user_id;
				}
				done();
			})
			.catch((err) => done(err));
	});
});
