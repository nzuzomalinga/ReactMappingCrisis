# Mapping Crisis

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the projects dependancies.

- clean install (faster)

```powershell
npm ci
```
- install additional packages

```powershell
npm i
```
## Run on Express/Node server

To serve on the project on an express server, first build the project with the following 
npm command.

```powershell
npm run build
```

Then run the Express server on http://localhost:5000 by 
typing this into the terminal.

```powershell
node server.js
```
## Run React project (Developement mode)

First start the express server with 
```powershell
node server.js
```

Then run the project on http://localhost:3000 by 
typing this into a seperate terminal

```powershell
npm run start
```

## Styling 

Navigate to the styles > variables folder.

From here you'll be able to change all the major styling attributes by changing the values of
the exported variables within the "colors.scss" and "utils.scss" files