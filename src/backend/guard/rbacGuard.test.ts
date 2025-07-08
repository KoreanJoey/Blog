/**
 * Role에 따라 권한을 올바르게 확인하는지 테스트
 *
 * Case 1. User, Admin = False
 *
 * Case 2. Admin, Admin = True
 *
 * Case 3. User, [User, Admin] = True
 *
 * Case 4. Admin, [User, Admin] = True
 *
 */

import { test, expect } from "@jest/globals";
import { RbacGuard } from "./rbacGuard";
import { Role } from "@/generated/prisma";

describe("RbacGuard", () => {
  test("Case 1. User, Admin = False", () => {
    // given
    const userRole = "USER";
    const role = "ADMIN";

    // when
    const result = RbacGuard(userRole, role);

    // then
    expect(result).toBe(false);
  });

  test("Case 2. Admin, Admin = True", () => {
    // given
    const userRole = "ADMIN";
    const role = "ADMIN";

    // when
    const result = RbacGuard(userRole, role);

    // then
    expect(result).toBe(true);
  });

  test("Case 3. User, [User, Admin] = True", () => {
    // given
    const userRole = "USER";
    const role: Role[] = ["USER", "ADMIN"];

    // when
    const result = RbacGuard(userRole, role);

    // then
    expect(result).toBe(true);
  });

  test("Case 4. Admin, [User, Admin] = True", () => {
    // given
    const userRole = "ADMIN";
    const role: Role[] = ["USER", "ADMIN"];

    // when
    const result = RbacGuard(userRole, role);

    // then
    expect(result).toBe(true);
  });
});
