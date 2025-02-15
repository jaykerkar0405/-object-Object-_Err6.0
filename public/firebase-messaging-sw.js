importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  projectId: "yogasense-87631",
  measurementId: "G-0T28X1J9Y7",
  messagingSenderId: "227827215784",
  authDomain: "yogasense-87631.firebaseapp.com",
  apiKey: "AIzaSyCPkbsJjBtnSBi74u1J9m8kJPGOC4zOfnc",
  appId: "1:227827215784:web:0a53fd461109537e2c819d",
  storageBucket: "yogasense-87631.firebasestorage.app",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification;
  const notificationOptions = {
    body,
    icon: icon || "/icons/firebase-logo.png",
    data: payload.data,
  };
  self.registration.showNotification(title, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.notification.data?.link) {
    event.waitUntil(clients.openWindow(event.notification.data.link));
  }
});
