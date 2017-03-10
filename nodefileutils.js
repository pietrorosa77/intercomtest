/**
 * A module with file core functions
 * @module filelib
 * @exports isNetworkPath
 * @exports readFileFromPath
 * @exports readFileFromUrl
 */

let fs = require("fs");

/**
 * Returns true if the value passed in input is a valid network path false otherwise.
 * @param {string} path - the value we want to test.
 */
let isNetworkPath = (path) => {
	let pattern = new RegExp("^(?:[a-z]+:)?//", "i");
	return pattern.test(path);
}

/**
 * reads file content from a physical path asyncronously and returns a Promise<string> with the file content
 * @param {string} file - the path of the file we want to read.
 * @param {string} encoding - the encoding of the file we want to read.
 */
let readFileFromPath = (file, encoding) => {
	return new Promise(function (resolve, reject) {
		fs.readFile(file, encoding, function (err, data) {
			if (err) return reject(err) // rejects the promise with `err` as the reason
			resolve(data); // fulfills the promise with `data` as the valuea
		})
	})
}

/**
 * reads file content from a network path asyncronously and returns a Promise<string> with the file content
 * @param {string} url - the url of the file we want to read.
 */
let readFileFromUrl = (url) => {
	return new Promise(function (resolve, reject) {
		const lib = url.startsWith("https") ? require("https") : require("http");
		const request = lib.get(url, (response) => {
			// handle http errors
			if (response.statusCode < 200 || response.statusCode > 299) {
				reject(new Error("Failed to load page, status code: " + response.statusCode));
			}
			// temporary data holder
			const body = [];
			// on every content chunk, push it to the data array
			response.on("data", (chunk) => body.push(chunk));
			// we are done, resolve promise with those joined chunks
			response.on("end", () => resolve(body.join("")));
		});
		// handle connection errors of the request
		request.on("error", (err) => reject(err))
	})
}

exports.isNetworkPath = isNetworkPath;
exports.readFileFromPath = readFileFromPath;
exports.readFileFromUrl = readFileFromUrl;

