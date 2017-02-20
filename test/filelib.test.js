let expect = require("expect");
let filelib = require("../lib/task3/filelib");
let nock = require("nock");

describe("filelib tests", () => {
	it("readFileFromPath: should read the file from disk successfuly", (done) => {
		filelib.readFileFromPath("./test/testCustomers.json", "utf8")
			.then((data) => {
				expect(data).toExist();
				expect(data).toContain("pietro rosa");
				done();
			})
			.catch((err) => done(err));
	});

	it("readFileFromPath: should fail reading from wrong path", (done) => {
		filelib.readFileFromPath("./wrongpath/testCustomers.json", "utf8")
			.then((data) => {
				done(new Error("should fail reading the file"));
			})
			.catch((err) => {
				expect(err).toExist();
				expect(err.message).toExist().toContain("no such file or directory");
				done();
			});
	});


	it("readFileFromUrl: should read the remote file successfuly", (done) => {
		let remoteFile = "https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt";
		let expected = [
			{ "latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701" },
			{ "latitude": "51.92893", "user_id": 1, "name": "stubbbbb", "longitude": "-10.27699" },
			{ "latitude": "51.8856167", "user_id": 2, "name": "Ian McArdle", "longitude": "-10.4240951" }
		];
		let mockedHttpReq = nock("https://gist.githubusercontent.com")
			.get("/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt")
			.replyWithFile(200, `${__dirname}/testCustomers.json`);

		filelib.readFileFromUrl(remoteFile)
			.then((data) => {
				expect(data).toExist();
				expect(data).toContain("pietro rosa");
				done();
			})
			.catch((err) => done(err));
	});

	it("readFileFromUrl: should fail if the remote file doesn't exist", (done) => {
		let remoteFile = "https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt";

		let mockedHttpReq = nock("https://gist.githubusercontent.com")
			.get("/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt")
			.reply(404, "file doesn't exists");

		filelib.readFileFromUrl(remoteFile)
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