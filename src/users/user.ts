export interface User {
  id: number;
  email: string;
  name: string;
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}

export interface UserData {
  name: string;
  team: string;
}

export interface FakeUserData {
  [key: string]: UserData;
}

export interface ContactFormParams {
  name: string;
  email: string;
  message: string;
}

export const fakeUserData: FakeUserData = {
  fakeUUID1: {
    name: "Ma He",
    team: "Janitor",
  },
  fakeUUID2: {
    name: "Mudassir",
    team: "Board",
  },
  fakeUUID3: {
    name: "Danish",
    team: "CEO",
  },
  fakeUUID4: {
    name: "Irfan",
    team: "afternoon dev",
  },
  fakeUUID5: {
    name: "Abia",
    team: "BE",
  },
  fakeUUID6: {
    name: "Ridzwan",
    team: "FE",
  },
  fakeUUID7: {
    name: "Nouman",
    team: "FE",
  },
  fakeUUID8: {
    name: "Faizan",
    team: "FE",
  },
};
