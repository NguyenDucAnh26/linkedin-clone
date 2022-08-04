import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCicRW57vuyMDb0n0LUfwAHWXFyXP9sSfI",
  authDomain: "linkedin-clone-a87fc.firebaseapp.com",
  projectId: "linkedin-clone-a87fc",
  storageBucket: "linkedin-clone-a87fc.appspot.com",
  messagingSenderId: "583227453260",
  appId: "1:583227453260:web:eff3d2fe7fc156331069e9",
  measurementId: "G-9CJTDMQERW",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const Provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
export { auth, Provider, storage };
export default db;
