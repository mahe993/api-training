import { Firestore } from "@google-cloud/firestore";

let db: Firestore;

const dbSetup = () => {
  // Initialize Firestore client
  db = new Firestore();
  return db;
};

export const getDBConnection = () => {
  if (db) return db;
  return dbSetup();
};
