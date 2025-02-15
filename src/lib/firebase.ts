import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  projectId: "yogasense-87631",
  measurementId: "G-0T28X1J9Y7",
  messagingSenderId: "227827215784",
  authDomain: "yogasense-87631.firebaseapp.com",
  apiKey: "AIzaSyCPkbsJjBtnSBi74u1J9m8kJPGOC4zOfnc",
  appId: "1:227827215784:web:0a53fd461109537e2c819d",
  storageBucket: "yogasense-87631.firebasestorage.app",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey:
          "BMZrxcRklCtGi9ecfNkbUqmC3bp8gpU2yj5cXE9owZlZcVraNO3utO_7LKavcCAD3dyvFIplIV_CPuVOS9rUisM",
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
