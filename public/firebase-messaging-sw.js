importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
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
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const link = payload.fcmOptions?.link || payload.data?.link;
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
    data: { url: link },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click received.");

  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        const url = event.notification.data.url;
        if (!url) return;

        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          console.log("OPENWINDOW ON CLIENT");
          return clients.openWindow(url);
        }
      })
  );
});
