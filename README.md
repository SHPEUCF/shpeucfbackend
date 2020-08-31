# shpeucfbackend
SHPE UCF backend for app and website

Firestore Admin doc: [Admin Firestore](https://firebase.google.com/docs/reference/admin/node/admin.firestore)

How to install Firebase command Line Inference 

Install the CLI by running the following npm commands:

npm install --save firebase

npm -g install firebase-tools

Next Authorize the Firebase CLI by running the following command:
firebase login
![loginPic](https://github.com/SHPEUCF/shpeucfbackend/blob/master/assets/signIn.png)

Your command line should give you a url so you can sign in to your firebase console so just copy and paste the url into your browser and sign in with the browser.
Once signed in your command line should give you this message
✔  Success! Logged in as shpeucfapps@gmail.com
![finishedLogin](https://github.com/SHPEUCF/shpeucfbackend/blob/master/assets/onlineFirebase.png)

Next cd into your functions folder then run the following command to start your firebase emulator:

firebase emulators:start
![emulator](https://github.com/SHPEUCF/shpeucfbackend/blob/master/assets/emulatorFirebase.png)

And use the following command to deploy new cloud function: 
npm run build

