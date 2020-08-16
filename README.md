# shpeucfbackend
SHPE UCF backend for app and website
How to install Firebase command Line Inference 
Install the CLI by running the following npm commands:
npm install --save firebase
npm -g install firebase-tools

Next Authorize the Firebase CLI by running the following command:
firebase login

Your command line should give you a url so you can sign in to your firebase console so just copy and paste the url into your browser and sign in with the browser.
Once signed in your command line should give you this message
✔  Success! Logged in as shpeucfapps@gmail.com

After you are signed in use the following command to associate your app with your firebase project:
firebase use --add

To start your firestore emulator use the following command:
firebase emulators:start

And use the following command to deploy new cloud function: 
npm run build

