import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBfyG_J0CyEw7CM_HQjsHqLBbwe131tmoo",
  authDomain: "trucking-task-app.firebaseapp.com",
  projectId: "trucking-task-app",
  storageBucket: "trucking-task-app.appspot.com",
  messagingSenderId: "431315060635",
  appId: "1:431315060635:web:fd7acd2634108a5016c33e",
  measurementId: "G-ZQCNMTM3ZD"
});

const db=firebaseApp.firestore();
const auth=firebase.auth();
export {auth,db};
