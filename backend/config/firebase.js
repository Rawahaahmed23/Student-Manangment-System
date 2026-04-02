// config/firebase.js

const admin = require('firebase-admin');
const multer = require('multer');

// Initialize Firebase Admin SDK
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET // e.g. "your-app.appspot.com"
  });
}

const bucket = admin.storage().bucket();

const storage = multer.memoryStorage();
const upload = multer({ storage });


const uploadToFirebase = (fileBuffer, mimetype, originalname) => {
  return new Promise((resolve, reject) => {
    const fileName = `students/${Date.now()}_${originalname}`;
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: mimetype,  // e.g. "image/jpeg"
      },
      resumable: false,
    });

    stream.on('error', (error) => reject(error));

    stream.on('finish', async () => {
      try {
        // Make the file publicly accessible
        await file.makePublic();

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        resolve({ url: publicUrl, fileName });
      } catch (error) {
        reject(error);
      }
    });

    stream.end(fileBuffer);
  });
};

module.exports = { upload, uploadToFirebase, bucket };