// server/config/firebase.js
const admin = require('firebase-admin');
const path = require('path');

// For local development
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS || 
  'C:\\Users\\USER\\firebase-keys\\serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});