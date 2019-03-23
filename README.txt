NPM Dependency Tree

Author: Idan Geula.
ID: 308559699.

Instructions:
1) Open cmd in this folder.
2) npm install.
3) npm start.
4) App is running. you can start querying it.

query for example:
http://localhost:3000/dependency/express/latest

API available:
GET /dependency/<packageName>/<packageVersion> - Get dependency tree
(Returns 200 Ok on success)
(Returns 404 Not Found if package name doesn't exist)
(Returns 500 Internal Server Error in case of an error)