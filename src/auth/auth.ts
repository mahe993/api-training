import { Request, Response } from "express";
import admin from "firebase-admin";

interface AuthenticatedRequest extends Request {
  user: admin.auth.DecodedIdToken; // is this correct?
}

const appAdmin = admin.initializeApp();

export async function expressAuthentication(
  req: AuthenticatedRequest,
  _securityName: string,
  _scopes: Array<string> = []
): Promise<Response | void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return Promise.reject(new Error("no headers")); // do error handling here
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer") {
    return Promise.reject(new Error("scheme is not bearer"));
  }
  try {
    const decoded = await appAdmin.auth().verifyIdToken(token);
    req.user = decoded;

    console.log("authorized!...");
  } catch (err) {
    return Promise.reject(new Error("unknown error"));
  }
}
