/**
 * Flatten array: I use input array as a stack .
 * - pop from the stack 
 * - if element is array get first element (head) and remaining (tail) array then push them into the stack (push first tail than head and push tail if only if has elements)
 * - else push element to the final result
 * @param {Array} input array to be flattened
 */
let flattenArray = (inputArray) => {
	if (!inputArray || !Array.isArray(inputArray)) {
		throw new Error("input is null or not an array");
	}
	let result = [];
	while (inputArray.length) {
		let currentElement = inputArray.shift();
		if (Array.isArray(currentElement)) {
			let head = currentElement.shift();
			let tail = currentElement;
			if (tail && tail.length) {
				inputArray.unshift(tail);
			}
			inputArray.unshift(head);
		} else {
			// we are pushing whatever isn't an array here. I decided to do this but in a real scenario
			// i would have ask if we have to check for int. this function will flatten also [1,2,[3,4,"string",5], 9, 11,[13,[14,{test: "object"}]]]
			result.push(currentElement);
		} 
	}
	return result;
}
exports.flattenArray = flattenArray;