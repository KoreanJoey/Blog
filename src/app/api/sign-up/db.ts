interface User {
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
    email: "joey.test.com",
    password: "testpassword",
    createdAt: "today",
  },
];
