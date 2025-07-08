import { test, expect } from "@jest/globals";
import { extractBearerToken } from "./extractBearerToken";

describe("extractBearerToken", () => {
  test("Authorization header does not exist", () => {
    // given
    const request = new Request("http://localhost:3000/api/users", {
      method: "GET",
    });

    const expectedError = new Error("Error: Unexpected token", { cause: 401 });

    // when & then
    expect(() => extractBearerToken(request)).toThrow(expectedError);
  });

  test("Authorization header is empty", () => {
    // given
    const request = new Request("http://localhost:3000/api/users", {
      method: "GET",
      headers: {
        Authorization: "",
      },
    });

    const expectedError = new Error("Error: Unexpected token", { cause: 401 });

    // when & then
    expect(() => extractBearerToken(request)).toThrow(expectedError);
  });

  test("Authorization header is invalid", () => {
    // given
    const request = new Request("http://localhost:3000/api/users", {
      method: "GET",
      headers: {
        Authorization: "Bearer",
      },
    });

    const expectedError = new Error("Error: No access token", { cause: 401 });

    // when & then
    expect(() => extractBearerToken(request)).toThrow(expectedError);
  });

  test("Authorization header has invalid token type", () => {
    // given
    const request = new Request("http://localhost:3000/api/users", {
      method: "GET",
      headers: {
        Authorization: "Basic 1234567890",
      },
    });

    const expectedError = new Error("Error: Unexpected token", { cause: 401 });

    // when & then
    expect(() => extractBearerToken(request)).toThrow(expectedError);
  });

  test("Authorization header has valid token", () => {
    // given
    const request = new Request("http://localhost:3000/api/users", {
      method: "GET",
      headers: {
        Authorization: "Bearer 1234567890",
      },
    });

    // when
    const accessToken = extractBearerToken(request);

    // then
    expect(accessToken).toBe("1234567890");
  });
});

/**
 *
 * Case 1. request에 Authorization 헤더가 없는 경우
 *
 * Case 2. Authorization 헤더 뒤에 아무것도 없는 경우
 *
 * Case 3. Authorization 헤더 뒤에 토큰이 없는 경우
 *
 * Case 4. Authorization 헤더 뒤에 Bearer 대신 다른 토큰 타입이 있는 경우
 *
 * Case 5. Authorization 헤더 뒤에 토큰이 있는 경우
 *
 */
