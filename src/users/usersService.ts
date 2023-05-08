import { getDBConnection } from "../db/dbSetup";
import {
  ContactFormParams,
  UserQuerySuccessResponse,
  fakeUserData,
} from "./user";
import { User } from "./user";
import { CollectionReference, Query } from "@google-cloud/firestore";

// A post request should not contain an id.
export type UserCreationParams = Pick<User, "email" | "name" | "phoneNumbers">;

export class UsersService {
  collection: CollectionReference;

  constructor() {
    const db = getDBConnection();
    const collection = db.collection("users");
    this.collection = collection;
  }

  public async getSpecific(name: string): Promise<Array<User>> {
    // since i am using name as doc id, use this.collection.doc(<id>).get() works as well
    // default is to not use name as id, leave id blank as it should be auto generated
    const snapshot = await this.collection.where("name", "==", name).get();
    const res: Array<User> = [];
    snapshot.forEach((doc) => {
      if (doc.data().name !== name) return;
      res.push(doc.data() as User);
    });

    return res;
  }

  // update status of specific user
  public async updateStatus(
    name: string,
    status: "happy" | "sad"
  ): Promise<UserQuerySuccessResponse | never> {
    const userRef = this.collection.doc(name);
    const update = await userRef.update({ status: status });
    console.log(update);

    return { message: `User ${name}'s status successfully updated!` };
  }

  // get all users
  // filter by status <optional>
  // sorted by name <optional>
  public async getAll(
    sort: "asc" | "desc" = "asc",
    status?: "happy" | "sad"
  ): Promise<Array<User>> {
    let data: Query<FirebaseFirestore.DocumentData> = this.collection;

    // appending queries if it exists
    if (!!status) {
      data = data.where("status", "==", status);
    }

    data = data.orderBy("name", sort);

    // get documents
    const snapshot = await data.get();

    // parse document data
    // Abstract out this part so we do not always have to do it. add in doc.id as one of the fields
    const res: Array<User> = snapshot.docs.map((doc) => doc.data() as User);

    return res;
  }

  // delete user doc
  public async deleteUser(name: string): Promise<UserQuerySuccessResponse> {
    const userRef = this.collection.doc(name);
    const delOperation = await userRef.delete();
    console.log(delOperation);
    return { message: `User ${name} deleted from database!` };
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
  ): Promise<UserQuerySuccessResponse | never> {
    // add to collections(user) here
    try {
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
