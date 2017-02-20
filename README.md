# Intercom Take home test.

First of all I have to say that the test took me more than the 3 hours you expect. I think I spent almost 6 hours to do it:
I want to tell you straight away that I'm not a genious and I don't think I am smarter then the average. 
I tried to do the excercise as it was a normal day to day job: I used my "free" (quoted because with a wife and 2 kids it's hard to say free time!!) evening time.
I'm not completly happy with the code and I hope I'll have the chance to discuss it with you in a sort of code review chat.
In case I'll be rejected I would really appreciate an honest feedback. When I say honest I mean, please feel free to be brutal and,
if you think my code is rubbish, just say it's rubbish!! Over time I realized that accepting negative feedbacks is a great way to improove and learn.

Thanks again for the opportunity and best regards

Pietro


### few instructions:
- task 1 is [here](../task1.txt)
- run npm install
- run "npm start" to run task 3 with the list of customers provided by the file ./test/testCustomers.json.
	if you want to run it against a different file run for example
		
	``` bash
	npm start -- -file C:\\Users\\pirosa\\Desktop\\ee.json
	```

- run npm test to run all the tests (for task2 and 3)

### folders structure:

- doc (contains jsdoc documentation. Please open index.html)
- lib contains 2 folders: task2 and task3
	- task2: contains the flatten array excercise
	- task3: contains the main invitations class and the implementations of the services used by invitations
- test:  contains all the tests ut (for mocha) covering all the functionalities of the 2 tasks.
- [task1.txt](../task1.txt) file with the task1
- task3main.js: an example of the usage of Invitations.js
