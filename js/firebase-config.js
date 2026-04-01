// Firebase initialization — reads from APP_CONFIG (config.js)

if (typeof APP_CONFIG === 'undefined' || !APP_CONFIG.firebase.apiKey) {
  if (!window.location.pathname.endsWith('setup.html')) {
    window.location.href = 'setup.html';
  }
}

const firebaseConfig = APP_CONFIG ? APP_CONFIG.firebase : {};
firebase.initializeApp(firebaseConfig);

firebase.firestore().enablePersistence({ synchronizeTabs: true })
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Offline persistence unavailable: multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.warn('Offline persistence not supported in this browser');
    }
  });

export const auth = firebase.auth();
export const db = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
