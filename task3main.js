let custLib = require("./lib/task3/customerslib");
let Invitations = require("./lib/task3/invitations");
let clc = require('cli-color');
let prettyjson = require('prettyjson');

console.log(clc.cyanBright("---------------------------GET CUSTOMERS FOR DRINK---------------------------------"));
let filename = "./test/testCustomers.json";
if (process.argv.length > 2) {
	let parameter = process.argv[2].toLowerCase();
	if (parameter === "-file" && process.argv.length == 4) {
		filename = process.argv[3];
	} else {
		console.log(clc.yellow("usage: npm start -- -file <pathtocustomersfile>"));
		process.exit(0);
	}
}

console.log(clc.yellow(`filePath: ${filename}`));
let inv = new Invitations(custLib.getCustomers, custLib.isCustomerInRange, custLib.customerComparer, custLib.isValidList);

inv.getCustomersInRange(filename, "53.339003", -6.2576841, 100)
	.then((result) => {
		console.log(clc.green("---------------------------RESULT LIST---------------------------------"));
		console.log(prettyjson.render(result, {
			keysColor: 'green',
			dashColor: 'blue',
			stringColor: 'yellow'
		}));
	})
	.catch((err) => {
		console.log(clc.red("---------------------------GET CUSTOMERS FOR DRINK FAILURE---------------------------------"));
		console.log(clc.red(err));
		process.exit(1);
	});