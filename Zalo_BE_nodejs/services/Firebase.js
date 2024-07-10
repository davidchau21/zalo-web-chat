const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");

const serviceAccount = require("../config/firebase-sdk.json");

// const BUCKET = "bsc-symtem.appspot.com";
const BUCKET = "fir-auth-uicha.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImage = (image) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filename = uuidv4();
      const file = bucket.file(filename);

      const stream = file.createWriteStream({
        metadata: {
          contentType: image.mimetype,
        },
      });

      stream.on("error", (e) => {
        console.log(e);
      });

      stream.on("finish", async () => {
        await file.makePublic();
      });
      stream.end(image.buffer);
      resolve(
        `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${filename}?alt=media`
      );
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

module.exports = {
  uploadImage,
};
