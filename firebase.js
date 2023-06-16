import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyASEftq_KDHCb-gMJ5M6amnEWbwlaPjVpU',
  authDomain: 'chatgpt-te.firebaseapp.com',
  projectId: 'chatgpt-te',
  storageBucket: 'chatgpt-te.appspot.com',
  messagingSenderId: '1015411863956',
  appId: '1:1015411863956:web:abbeb974a88e78ce07df81',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
