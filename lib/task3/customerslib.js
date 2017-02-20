/**
 * A module with core functions to manage customers invites
 * @module customerlib
 */
let utils = require("./filelib");
let Validator = require("jsonschema").Validator;
let gpsUtils = require("./gpslib");

/**
 * reads file content from a physical or network path asyncronously and returns a Promise<Array<Customers>> with the file containing 
 * the customer list
 * @param {string} file - the path or url of the file we want to read.
 * @param {string} encoding - the optional encoding of the file containing the customers list
 */
let getCustomers = (file, encoding) => {
	return new Promise(function (resolve, reject) {
		let customersDataLoader = null;
		if(!utils.isNetworkPath(file)){
			customersDataLoader = utils.readFileFromPath(file, encoding || "utf8");
		} else {
			customersDataLoader = utils.readFileFromUrl(file);
		}
		customersDataLoader.then((data) => {
			resolve(JSON.parse(data));
		}).catch((error)=> {
			reject(error);
		})
	})
}

/**
 * JSON schema of a valid customer list file
 */
let customerListSchema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "latitude": {
        "type": "string",
		"pattern": "^\-?[0-9]+[\.]{0,1}[0-9]*$"
      },
      "user_id": {
        "type": "integer"
      },
      "name": {
        "type": "string"
      },
      "longitude": {
        "type": "string",
		"pattern": "^\-?[0-9]+[\.]{0,1}[0-9]*$"
      }
    },
    "required": [
      "latitude",
      "user_id",
      "name",
      "longitude"
    ]
  }
}

/**
 * validates the data in input against the custome list schema returning a validation result object
 * the customer list
 * @param {Array} data - the array of customers
 */
let isValidList = (data) => {
	 let validator = new Validator();
	 return validator.validate(data, customerListSchema);
}

/**
 * check if a customer is within a specific range from an origin
 * point (origLatRad, origLongRad) whose coordinates are expressed in degrees
 * @param {Object} customer - the  customers we want to test
 * @param {string|number} origLatRad - origin latitude in degrees
 * @param {string|number} origLongRad - origin longitude in degrees
 * @param {number} range - distance from origin in KM
 */
let isCustomerInRange = (customer, origLatRad, origLongRad, range) => {
	return gpsUtils.getDistanceBetweenTwoPoints(customer.latitude, customer.longitude, origLatRad, origLongRad) <= range;
}

/**
 * function that compares 2 customers using their user_id
 * @param {Object} cust1 - the  customers we want to test
 * @param {Object} cust2 - the  customers we want to test
 */
let customerComparer = (cust1, cust2) => {
	return cust1.user_id - cust2.user_id;
}

exports.customersListSchema = customerListSchema;
exports.isValidList = isValidList;
exports.getCustomers = getCustomers;
exports.customerComparer = customerComparer;
exports.isCustomerInRange = isCustomerInRange;



