export interface User {
  email: string;
  name: string;
  status: "Happy" | "Sad";
  phoneNumber: string;
}

export interface UserData {
  name: string;
  status: string;
}

export interface FakeUserData {
  [key: string]: UserData;
}

export interface ContactFormParams {
  name: string;
  email: string;
  message: string;
}

export interface UserQuerySuccessResponse {
  message: string;
}

export const fakeUserData: FakeUserData = {
  fakeUUID1: {
    name: "Ma He",
    status: "Janitor",
  },
  fakeUUID2: {
    name: "Mudassir",
    status: "Board",
  },
  fakeUUID3: {
    name: "Danish",
    status: "CEO",
  },
  fakeUUID4: {
    name: "Irfan",
    status: "afternoon dev",
  },
  fakeUUID5: {
    name: "Abia",
    status: "BE",
  },
  fakeUUID6: {
    name: "Ridzwan",
    status: "FE",
  },
  fakeUUID7: {
    name: "Nouman",
    status: "FE",
  },
  fakeUUID8: {
    name: "Faizan",
    status: "FE",
  },
};
