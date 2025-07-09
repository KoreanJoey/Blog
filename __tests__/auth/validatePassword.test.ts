import { validatePassword } from "@/utils/lib/validatePassword";
import { test, expect } from "@jest/globals";

describe("validatePassword", () => {
  test("Case 1.1 password length", () => {
    // given
    const password = "1234567";

    // then
    expect(validatePassword(password)).toBe(false);
  });

  test("Case 1.2 password length", () => {
    // given
    const password = "1234567890123456732423432423423";

    // then
    expect(validatePassword(password)).toBe(false);
  });

  test("Case 2. password contains at least one uppercase letter", () => {
    // given
    const password = "1234abcd";

    // then
    expect(validatePassword(password)).toBe(false);
  });

  test("Case 3. password contains at least one lowercase letter", () => {
    // given
    const password = "12345ABC!";

    // then
    expect(validatePassword(password)).toBe(false);
  });

  test("Case 4. password contains at least one number", () => {
    // given
    const password = "abcdABCD!";

    // then
    expect(validatePassword(password)).toBe(false);
  });

  test("Case 5. password contains at least one special character", () => {
    // given
    const password = "abcdABCD1234";

    // then
    expect(validatePassword(password)).toBe(false);
  });

  test("Case 6. space is not allowed", () => {
    // given
    const password = "abcdABCD 1234!";

    // then
    expect(validatePassword(password)).toBe(false);
  });

  test("Case 7. (),<>,{},[] is not allowed", () => {
    // given
    const password = "abcdABCD1234!()";

    // then
    expect(validatePassword(password)).toBe(false);
  });

  test("Valid password", () => {
    // given
    const password = "abcdABCD1234~";

    // then
    expect(validatePassword(password)).toBe(true);
  });
});

/**
 * Case 1. password length
 * Case 2. password contains at least one uppercase letter
 * Case 3. password contains at least one lowercase letter
 * Case 4. password contains at least one number
 * Case 5. password contains at least one special character( !@#$%^&*~)
 * Case 6. space is not allowed
 * Case 7. (),<>,{},[] is not allowed
 * Case 8. password is valid
 */

/**
 * Password rules
 * 8 <= password.length <= 16
 * At least one capital letter, lowercase letter, number, special character
 * Password: 8~16 characters consisting of letters(A-Z, a-z), numbers, or special characters.
 * space is not allowed
 * (),<>,{},[] is not allowed
 *
 *
 *
 *
 *
 */
