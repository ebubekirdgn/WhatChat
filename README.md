# WhatChat
 
Framework7 is an open source framework7, which let you develop mobile, desktop or web app with a native look and feel

How to use VueJS and Framework7 as frontend, Firebase as backend to build the chat app from scratch.With this project you can do it.
This project will cover 

* Firebase user Authentication

* Forget the password

* Email Verification

* Firebase real time database

* One on one chat

* Group chat

# Installation steps

```javascript
 First of all you should go to visit this web site : https://framework7.io/cli/
 
 1. $ npm install (https://docs.npmjs.com/cli/install)
 2. $ npm install -g cordova
 3. $ npm install -g framework7-cli
 4. $ framework7 create --ui
 5. $ npm install vuex --save
 6. $ npm install firebase --save
 7. $ npm install --save lodash
 8. $ npm install @babel/plugin-transform-runtime --save-dev
 Warning : The first time you compile the application you will receive the following error :
 "config to use async/await in this project (Uncaught ReferenceError: regeneratorRuntime is not defined)"
  
  The Solution : https://github.com/framework7io/framework7-template-vue-webpack/issues/71
  More details : 
    first time you should install from the terminal : npm i @babel/plugin-transform-runtime --save-dev
    last step is add to babel.config.js plugins: 
              "plugins": [
                ...
                ["@babel/plugin-transform-runtime", {
                  "corejs": false,
                  "helpers": false,
                  "regenerator": true,
                  "useESModules": false
                }],
                ...
               ]
 9. $ npm install moment --save

```

