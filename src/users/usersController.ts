import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Security,
  SuccessResponse,
} from "tsoa";
import {
  ContactFormParams,
  User,
  UserCreationSuccessResponse,
  UserData,
} from "./user";
import { UsersService, UserCreationParams } from "./usersService";
import { getDBConnection } from "../db/dbSetup";

@Route("users")
export class UsersController extends Controller {
  usersService: UsersService;
  constructor() {
    super();
    const db = getDBConnection();
    const usersCollectionRef = db.collection("users");
    this.usersService = new UsersService(usersCollectionRef);
  }

  @Security("jwt")
  @Get("user:userId")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<User> {
    return this.usersService.get(userId, name);
  }

  @Get("/")
  public async searchUser(@Query() val: string): Promise<Array<UserData>> {
    console.log("query string: " + val);
    return this.usersService.search(val);
  }

  @SuccessResponse("201", "Created contact form") // Custom success response
  @Post("contact")
  public async contactUs(
    @Body() contactFormParams: ContactFormParams
  ): Promise<ContactFormParams> {
    this.setStatus(201); // set return status 201
    return this.usersService.contact(contactFormParams);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<UserCreationSuccessResponse> {
    this.setStatus(201); // set return status 201
    return this.usersService.create(requestBody);
  }
}
