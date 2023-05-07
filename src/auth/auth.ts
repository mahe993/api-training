import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user: JwtPayload | string;
}

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
    const decoded: JwtPayload | string = jwt.verify(token, "SECRET_KEY");
    req.user = decoded;

    console.log("authorized!...");
  } catch (err) {
    return Promise.reject(new Error("unknown error"));
  }
}
