// src/users/usersService.ts
import { ContactFormParams, fakeUserData } from "./user";
import { User } from "./user";

// A post request should not contain an id.
export type UserCreationParams = Pick<User, "email" | "name" | "phoneNumbers">;

export class UsersService {
  public get(id: number, name?: string): User {
    return {
      id,
      email: "jane@doe.com",
      name: name ?? "Jane Doe",
      status: "Happy",
      phoneNumbers: [],
    };
  }

  public search(query: string) {
    const regexp = new RegExp(query, "i");

    const resData = Object.keys(fakeUserData)
      .map((key) => fakeUserData[key])
      .filter((data) => regexp.test(data.name));

    return resData;
  }

  public contact(
    contactFormParams: ContactFormParams
  ): ContactFormParams | never {
    try {
      // throw new Error();
      console.log(contactFormParams);
      return contactFormParams;
    } catch (err) {
      console.log("working");
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("unknown error");
      }
    }
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      status: "Happy",
      ...userCreationParams,
    };
  }
}
