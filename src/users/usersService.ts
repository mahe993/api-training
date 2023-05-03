import {
  ContactFormParams,
  UserCreationSuccessResponse,
  fakeUserData,
} from "./user";
import { User } from "./user";
import { CollectionReference } from "@google-cloud/firestore";

// A post request should not contain an id.
export type UserCreationParams = Pick<User, "email" | "name" | "phoneNumbers">;

export class UsersService {
  collection: CollectionReference;
  constructor(collection: CollectionReference) {
    this.collection = collection;
  }
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

  public async create(
    userCreationParams: UserCreationParams
  ): Promise<UserCreationSuccessResponse | never> {
    // add to collections(user) here
    try {
      console.log("i am here");
      const { name } = userCreationParams;
      const docRef = this.collection.doc(name);
      await docRef.set({ status: "happy", ...userCreationParams });
      return {
        message: `User ${name} successfully added to users collection!`,
      };
    } catch (err) {
      throw new Error();
    }
  }
}
