export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export const users: User[] = [
  {
    id: "1",
    name: "joey",
    email: "joeytest.com",
    password: "1234",
    createdAt: "today",
  },
  {
    id: "2",
    name: "joey2",
    email: "joeytest2.com",
    password: "12345",
    createdAt: "today",
  },
];
