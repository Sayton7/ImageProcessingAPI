# ImageProcessing API Project

* A simple project where users can request images from the data base and specify their required size
* The server was build using express and nodejs.


## General Information

* This is the First project in Udacity's Advanced Full-Stack Web Development Nanodegree Program.
* This project had no starter code and was built from scratch.
* This project was written in typescript.
* This project uses jasmine to test the code.
* This project uses prettier configured with Eslint to format the code.
* This project uses nodemon to restart the server when changes are made.

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm run start`

## Backend Server

    * The backend server is built using express and nodejs.
    * To test the app use this sample url: http://localhost:3000/resize/images?name=imageName&height=heightInNumbers&width=widthInNumbers
    * The server will check whether the requested image with those spicified dimensions was already in the database or not.
    * If it was, it will return the image from the database.
    * If it wasn't, it will check whether the requested image is in the data base or not.
    * If it was, it will resize the image and save it to the database and return the result to the user.

## Available Scripts

In the project directory, you can run:

### `npm run lint`
This will run esLint to check the code for errors.

### `npm run prettier`
This will run prettier to format the code.

### `npm run check`
This will run prettier first then esLint to check the code for errors in one script.

### `npm run build`
This will convert the code into javascript in the build folder.

### `npm run jasmine`
This will run the pre-defined tests written in the tests folder using jasmine.

### `npm run test`
This will run the build and jasmine scripts, which will build the code and run the tests in one script.

### `npm run start`
This will start the server using nodemon.


## Code Fixes

As per the project's last review, the following points were adjusted:

* Moved imageProcessing function to a separate module in the utils folder.
* Moved jasmine, jasmine-spec-reporter and supertest to devDependencies.
* Added an error message for the user when using "0" as a value for width or height.
* Added imageProcessingSpec to the tests folder to test the imageProcessing function.
* Added missing parameter type in the resize main route file index.ts.
* Added additional tests to the images endpoint.