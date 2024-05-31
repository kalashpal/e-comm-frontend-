
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDSc7J9mMc962OVSn9NXxjz7vdXloaO0vM",
  authDomain: "fir-5adf7.firebaseapp.com",
  projectId: "fir-5adf7",
  storageBucket: "fir-5adf7.appspot.com",
  messagingSenderId: "124659739949",
  appId: "1:124659739949:web:f7beee61af0d74b6ddf7a4"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

export { auth, googleProvider, microsoftProvider };
