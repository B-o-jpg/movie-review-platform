const admin = require('firebase-admin');

admin.initializeApp(); // uses default credentials, works in emulator & deployed functions

const db = admin.firestore();

module.exports = { admin, db };
