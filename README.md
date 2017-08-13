# react-bookmark

live demo: https://blooming-mountain-19326.herokuapp.com/


NodeJs:

1. setup 

	express bookmark --hogan

2. port: 3000	=>  nodemon

3. setup routes => API

4. setup models

	& install mongoose

5. setup controllers 

	& connect to models

6. connect controller in API

7. connect to MongoDB in app.js
	
	& npm install --save dotenv


8. APIs:
	
	> Main Page: localhost:3000
	> list(GET): http://localhost:3000/api/bookmark
	> search(GET): http://localhost:3000/api/bookmark/123	
	> create(POST): http://localhost:3000/api/bookmark
	> .
	> .
	> .
	> login(POST): http://localhost:3000/account/login
	> check Login(GET): http://localhost:3000/account/currentuser
	> logout(GET): http://localhost:3000/account/logout

9. cheerio => fetch info from url

	& integrated in bookmark create API

10. login encryption

	& npm install --save bcryptjs	

11. edit output json
	
	in models schema !!!	

12. login setup

	& npm install --save jsonwebtoken	
	& setup utils/JWT
	& create token when login func
	& npm install --save client-sessions
	$ setup app.js


React:
	
	> npm install --save react react-dom webpack babel-core babel-loader babel-preset-react babel-preset-es2015


	> webpack -w

1. npm i -S superagent	

2. setup util/APIManager

	> get
	> post

3. redux setup
	
	npm install --save redux react-redux redux-thunk
