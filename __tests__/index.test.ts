import { test, expect } from "@jest/globals";
import { extractBasicToken } from "@/backend/authToken/extractBasicToken";

describe("extractBasicToken", () => {
  test("Auth Header does not exist", () => {
    // given
    const request = new Request("http://localhost:3000/api/auth/login", {
      method: "POST",
    });

    const expectedError = new Error("Auth Header does not exist", {
      cause: 401,
    });

    // when
    expect(() => extractBasicToken(request)).toThrow(expectedError);
  });

  test("Authorization header is empty", () => {
    // given
    const request = new Request("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        Authorization: "",
      },
    });

    const expectedError = new Error("Auth Header does not exist", {
      cause: 401,
    });

    // when & then
    expect(() => extractBasicToken(request)).toThrow(expectedError);
  });

  test("Invalid Authorization header format", () => {
    // given
    const request = new Request("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        Authorization: "Basic",
      },
    });

    const expectedError = new Error("Unexpected token", {
      cause: 401,
    });

    // when & then
    expect(() => extractBasicToken(request)).toThrow(expectedError);
  });

  test("Invalid Base64 encoding", () => {
    // given
    const request = new Request("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        Authorization: "Basic " + "invalid_base64",
      },
    });

    const expectedError = new Error("Invalid Authorization header format", {
      cause: 401,
    });

    // when & then
    expect(() => extractBasicToken(request)).toThrow(expectedError);
  });

  test("Invalid basic token without colon", () => {
    // given
    const request = new Request("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from("test@email.compassword").toString("base64"),
      },
    });

    const expectedError = new Error("Invalid Authorization header format", {
      cause: 401,
    });

    // when
    expect(() => extractBasicToken(request)).toThrow(expectedError);
  });

  test("Invalid basic token with multiple colons", () => {
    // given
    const request = new Request("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from("test@email.com:password:test").toString("base64"),
      },
    });

    const expectedError = new Error("Invalid Authorization header format", {
      cause: 401,
    });

    // then
    expect(() => extractBasicToken(request)).toThrow(expectedError);
  });

  test("Valid basic token", () => {
    // given
    const request = new Request("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from("test@email.com:password").toString("base64"),
      },
    });

    // when
    const result = extractBasicToken(request);

    // then
    expect(result).toEqual(["test@email.com", "password"]);
  });

  test("Bearer token", () => {
    // given
    const request = new Request("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " + Buffer.from("test@email.com:password").toString("base64"),
      },
    });

    const expectedError = new Error("Unexpected token", {
      cause: 401,
    });

    // when & then
    expect(() => extractBasicToken(request)).toThrow(expectedError);
  });

  test("basic token", () => {
    // given
    const request = new Request("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        Authorization:
          "basic " + Buffer.from("test@email.com:password").toString("base64"),
      },
    });

    const expectedError = new Error("Unexpected token", {
      cause: 401,
    });

    // when
    const result = extractBasicToken(request);

    // then
    expect(result).toEqual(["test@email.com", "password"]);
  });
});
