import * as admin from "firebase-admin";
import { Firestore } from "@google-cloud/firestore";
import { applicationDefault } from "firebase-admin/app";

let db: Firestore;

const dbSetup = () => {
  // Initialize Firebase Admin SDK
  admin.initializeApp({
    credential: applicationDefault(), // export GOOGLE_APPLICATION_CREDENTIAL in npm run dev
  });

  // Initialize Firestore client
  db = new Firestore();
  return db;
};

export const getDBConnection = () => {
  if (db) return db;
  return dbSetup();
};
