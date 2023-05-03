import { Controller, Get, Route } from "tsoa";
import jwt from "jsonwebtoken";

@Route("auth")
export class AuthController extends Controller {
  constructor() {
    super();
  }

  @Get("bearerToken")
  public async getBearerToken() {
    // validate user login first ...

    const user = { id: 1, email: "user@example.com", role: "admin" };

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      "SECRET_KEY"
    );

    // Return the token to the client
    return token;
  }
}
