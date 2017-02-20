
let expect = require("expect");
let custLib = require("../lib/task3/customerslib");
let Invitations = require("../lib/task3/invitations");
let nock = require("nock");

describe("get invitations", () => {
	it("get invitations should return a list of 16 customers ordered by user_id", (done) => {
		let inv = new Invitations(custLib.getCustomers, custLib.isCustomerInRange, custLib.customerComparer, custLib.isValidList);
		inv.getCustomersInRange("./test/testCustomers.json", 53.339003, -6.2576841, 100)
			.then((result) => {
				expect(result.length).toBe(16)
				for (let i, prev = 0; i < result.length; i++) {
					expect(result[i].user_id).toBeGreaterThanOrEqualTo(prev);
					prev = result[i].user_id;
				}
				done();
			})
			.catch((err) => done(err));
	});

	it("get invitations should fail if wrong origin coordinates are provided", (done) => {
		let inv = new Invitations(custLib.getCustomers, custLib.isCustomerInRange, custLib.customerComparer, custLib.isValidList);
		inv.getCustomersInRange("./test/testCustomers.json", "53.339.003", -6.2576841, 100)
			.then((result) => {
				done(new Error("should fail"));
			})
			.catch((err) => {
				expect(err.message).toEqual("(53.339.003,-6.2576841) are not valid coordinates");
				done();
			});
	});

	it("get invitations should fail negative range is provided", (done) => {
		let inv = new Invitations(custLib.getCustomers, custLib.isCustomerInRange, custLib.customerComparer, custLib.isValidList);
		inv.getCustomersInRange("./test/testCustomers.json", "53.339003", -6.2576841, -100)
			.then((result) => {
				done(new Error("should fail"));
			})
			.catch((err) => {
				expect(err.message).toEqual("range should be a positive number");
				done();
			});
	});

	it("get invitations should fail if invalid customerlist is provided", (done) => {
		let invalidList = [
			{ "latitude": "52.98.637.5", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701" },
			{ "latitude": "51.92893", "user_id": 1, "name": "stubbbbb", "longitude": "-10.27699" },
			{ "latitude": "51.8856167", "user_id": 2, "name": "Ian McArdle", "longitude": "-10.4240951" }
		];
		let remoteFile = "https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt";

		let mockedHttpReq = nock("https://gist.githubusercontent.com")
			.get("/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt")
			.reply(200, JSON.stringify(invalidList));
		let inv = new Invitations(custLib.getCustomers, custLib.isCustomerInRange, custLib.customerComparer, custLib.isValidList);
		inv.getCustomersInRange(remoteFile, 53.339003, -6.2576841, 100)
			.then((result) => {
				done(new Error("should fail"));
			})
			.catch((err) => {
				expect(err.message).toEqual('instance[0].latitude does not match pattern "^-?[0-9]+[.]{0,1}[0-9]*$"');
				done();
			});
	});
});


