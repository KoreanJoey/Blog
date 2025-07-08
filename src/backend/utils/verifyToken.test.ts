/**
 * Case 1: Valid token
 * Case 2: Empty string token
 * Case 3: Invalid token
 * Case 4: Expired token
 *
 */

import { test, expect } from "@jest/globals";
import { verifyToken } from "./verifyToken";
import { TokenType } from "./tokenType";
import { testGenerateToken } from "../../../__tests__/generator/testGenerateToken";

// Set JWT secrets for testing
process.env.ACCESS_TOKEN_SECRET = "test-access-secret";
process.env.REFRESH_TOKEN_SECRET = "test-refresh-secret";

describe("verifyToken", () => {
  test("Case 1: Valid token", () => {
    // given

    const token = testGenerateToken(TokenType.ACCESS);

    // when
    const result = verifyToken(token);

    // then
    expect(result.sub).toEqual("1");
  });

  test("Case 2: Empty string token", () => {
    // given
    const token = "";

    const expectedError = new Error("Error: Invalid token", { cause: 401 });

    // when & then
    expect(() => verifyToken(token)).toThrow(expectedError);
  });

  test("Case 3: Invalid token", () => {
    // given
    const token = "invalid-token";

    const expectedError = new Error("Error: Invalid token", { cause: 401 });

    // when & then
    expect(() => verifyToken(token)).toThrow(expectedError);
  });

  // test("Case 4: Expired token", async () => {
  //   // given
  //   let token: string;

  //   const prom = new Promise((resolve) => {
  //     setTimeout(() => {
  //       token = testGenerateToken(TokenType.ACCESS);
  //       resolve(token);
  //     }, 2000);
  //   });

  //   await prom;

  //   const expectedError = new Error("Error: Invalid token", { cause: 401 });
  //   // then
  //   expect(() => verifyToken(token)).toThrow(expectedError);
  // });
});
