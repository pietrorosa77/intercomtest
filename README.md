# Intercom 
### few instructions:
- task 1 is [here](../task1.txt)
- run npm install
- run "npm start" to run task 3 with the list of customers provided by the file ./test/testCustomers.json.
	if you want to run it against a different file run for example
		
	``` bash
	npm start -- -file <filepath>
	```

- run npm test to run all the tests (for task2 and 3)

### folders structure:

- doc (contains jsdoc documentation. Please open index.html)
- lib contains 2 folders: task2 and task3
	- task2: contains the flatten array excercise
	- task3: contains the main invitations class and the implementations of the services used by invitations
- test:  contains all the tests ut (for mocha) covering all the functionalities of the 2 tasks.
- task3main.js: an example of the usage of Invitations.js
