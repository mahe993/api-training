import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Query,
  Route,
  Security,
  SuccessResponse,
} from "tsoa";
import {
  ContactFormParams,
  User,
  UserQuerySuccessResponse,
  UserData,
} from "./user";
import { UsersService, UserCreationParams } from "./usersService";

@Route("users")
export class UsersController extends Controller {
  usersService: UsersService;
  constructor() {
    super();
    this.usersService = new UsersService();
  }

  // Get specific user (test for firestore)
  @Security("jwt")
  @Get("specific/{userName}")
  public async getUser(@Path() userName: string): Promise<Array<User>> {
    return this.usersService.getSpecific(userName);
  }

  @Get("all")
  public async getUsers(
    @Query() sort?: "asc" | "desc",
    @Query() status?: "happy" | "sad"
  ): Promise<Array<User>> {
    return this.usersService.getAll(sort, status);
  }

  @Put("status/{userName}")
  public async updateUserStatus(
    @Path() userName: string,
    @Body() reqBody: { status: "happy" | "sad" }
  ): Promise<UserQuerySuccessResponse> {
    return this.usersService.updateStatus(userName, reqBody.status);
  }

  // Search user (for app endpoint)
  @Get("/")
  public async searchUser(@Query() val: string): Promise<Array<UserData>> {
    console.log("query string: " + val);
    return this.usersService.search(val);
  }

  // Contact us form (app endpoint)
  @SuccessResponse("201", "Created contact form") // Custom success response
  @Post("contact")
  public async contactUs(
    @Body() contactFormParams: ContactFormParams
  ): Promise<ContactFormParams> {
    this.setStatus(201); // set return status 201
    return this.usersService.contact(contactFormParams);
  }

  // Create new user (test for firestore)
  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<UserQuerySuccessResponse> {
    this.setStatus(201); // set return status 201
    return this.usersService.create(requestBody);
  }
}
