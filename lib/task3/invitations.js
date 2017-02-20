
/**
 * @callback customerInRange
 * @param {Object} customer - the  customers we want to test
 * @param {string|number} origLatRad - origin latitude in degrees
 * @param {string|number} origLongRad - origin longitude in degrees
 * @param {number} range - distance from origin in KM
 */

/**
 * @callback customerLoader
 * returns a Promise of the list of customers contained in the provided input file
 * @param {string} file - the path or url of the file we want to read.
 * @param {string} encoding - the optional encoding of the file containing the customers list
 */

/**
 * @callback customerListValidator
 * validates the data in input against the custome list schema returning a validation result object
 * the customer list
 * @param {Array} data - the array of customers
 */

/**
 * @callback customerComparer
 * function that compares 2 customers using their user_id
 * @param {Object} cust1 - the  customers we want to test
 * @param {Object} cust2 - the  customers we want to test
 */

/**
 * @constructor
 * @param {customerLoader}  cuLoader - the customer list provider 
 * @param {customerInRange} cuEvaluator - the callback used to filter the customer in range
 * @param {customerComparer} cuComparer - the callback used to sort the filtered list of customers
 * @param {customerListValidator} clValidator - used to perform validation on the loaded customer list
 */
function Invitations(cuLoader, cuEvaluator, cuComparer, clValidator) {
	/** @member {customerLoader} */
	this.cuLoader = cuLoader;
	/** @member {customerInRange} */
	this.cuEvaluator = cuEvaluator;
	/** @member {customerComparer} */
	this.cuComparer = cuComparer;
	/** @member {customerListValidator} */
	this.clValidator = clValidator;
}

/**
 * Returns a sorted  list of customer within the provided range of the origin point.
 * @param {string} filepath - path to the list of customers
 * @param {string|number} origLat - origin latitude
 * @param {string|number} origLon - origin longitude
 * @param {number} range - distance from origin in KM: customers has to be within it in order to be invited
 * @param {string} encoding - optional encoding for the input file
 */
Invitations.prototype.getCustomersInRange = function (filepath, origLat, origLon, range, encoding = "utf8") {
	return new Promise((resolve, reject) => {
		this.cuLoader(filepath, encoding)
			.then((customersList) => {
				let valResult = this.clValidator(customersList);

				if (!valResult.valid) {
					throw new Error(valResult.errors.reduce((prev, curr) => { return `${prev.property}: ${prev.message} \n ${curr.property}: ${curr.message}` }))
				}

				if(range < 0) {
					throw new Error("range should be a positive number")
				}

				let inRange = customersList.filter((customer) => {
					return this.cuEvaluator(customer, origLat, origLon, range);
				});

				let sortedCustomers = inRange.sort(this.cuComparer);
				resolve(sortedCustomers);
			})
			.catch((error) => {
				reject(error);
			})
	});
}

module.exports = Invitations;