# stock-watchlist

This is a stock watchlist app using the following tech stack:  
Front-end: Angular (v.16)  
Backend: Node.js (v.18), Express Framework in TypeScript  
Databases: MySQL, and MongoDB  
Caching: Redis

### Demo

[![Demo of Stock Watchlist](https://img.youtube.com/vi/LMEPXB4q6ng/maxresdefault.jpg)](https://www.youtube.com/watch?v=LMEPXB4q6ng)

### Features Implemented

1. This app supports users log in and log out, and provides a single screen with a search bar, and a list of stocks with their current prices.
2. It contains both a stock watchlist service and a client application that allow users to view their favorite stock prices.
3. Users are able to search for stocks by name or ticker and add them to a watchlist.
4. Users are able to remove a stock from their watchlist.
5. Users are able to see the current price of the stocks in their watchlist.
6. During the market trading hours, users can see the prices update every 5 seconds.
7. The backend service is designed to support millions of users each with their own watchlist.
8. A user's favorite stocks are persisted into DB and will be loaded from DB when this users logs in again to the app.
9. You can review the service architecture and communication between the service and client application; client-code is stored in the client/ directory and the server side code is stored in the server/ directory.
10. The server side uses Redis to cache data so it limits the number of times to hit the 3rd party APIs for the company list and stock prices.

### Getting Started

1. Unzip the .zip file if you receive a solution.zip file from the author. And when doing unzip, you can issue command `$ unzip solution.zip -d YOUR_PREFRRED_DIRECTORY`
2. From the directory of `YOUR_PREFRRED_DIRECTORY` (ie. `stock-wathlist`), issue the command `$ make up` to build all the necessary docker images and bring up all the sercies.
3. `$ make open-app` to open the application on your default browser, with `http://localhost:8200` to be the default URL to start with.
4. You can start from the Register tab from the UI to create an account for a user.
5. For the make commands, you may issue command `$ make help` to see all the available commands that might be useful to you.

### References

1. Login and Registration Example with JWT: [Link](https://www.bezkoder.com/node-js-angular-12-jwt-auth/)
2. Dockerize React, Node.js + MySQL: [Link](https://www.bezkoder.com/docker-compose-react-nodejs-mysql/)
