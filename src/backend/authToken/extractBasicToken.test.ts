import { extractBasicToken } from "./extractBasicToken";

// export const extractBasicToken = (request: Request) => {
//   const authHeaders = request.headers.get("Authorization");

//   if (!authHeaders) {
//     throw new Error("Auth Header does not exist", { cause: 401 });
//   }

//   const headersArray = authHeaders.split(" ");

//   if (headersArray.length != 2) {
//     throw new Error("Unexpected token", { cause: 401 });
//   }

//   const [_, header] = headersArray;

//   const decoded = Buffer.from(header, "base64").toString("utf-8").split(":");

//   if (decoded.length !== 2) {
//     throw new Error("Invalid Authorization header format", { cause: 401 });
//   }

//   return decoded;
// };

/*
extractBasicToken 함수 동작 설명:

1. Request 객체에서 Authorization 헤더를 가져옴
2. Authorization 헤더가 존재하는지 확인하고 없으면 401 에러 발생
3. Authorization 헤더를 공백으로 분리하여 배열 생성 
4. 헤더 배열이 정확히 2개의 요소(Basic과 토큰)로 구성되어 있는지 확인
5. 배열의 두 번째 요소(토큰)를 추출
6. Base64로 인코딩된 토큰을 디코딩하고 콜론(:)으로 분리
7. 디코딩된 값이 이메일과 비밀번호 두 부분으로 정확히 나뉘는지 확인
8. 이메일과 비밀번호가 담긴 배열 반환

테스트 케이스:

Case 1: Authorization 헤더가 존재하지 않는 경우
- 입력: Authorization 헤더가 없는 Request
- 예상 결과: "Auth Header does not exist" 에러 발생 (401)

Case 2: Authorization 헤더 값이 비어있는 경우
- 입력: Authorization: ""
- 예상 결과: "Unexpected token" 에러 발생 (401)

Case 3: Authorization 헤더 형식이 잘못된 경우
- 입력: Authorization: "Basic" (토큰 부분 누락)
- 예상 결과: "Unexpected token" 에러 발생 (401)

Case 4: 잘못된 Base64 인코딩 -> ??
- 입력: Authorization: "Basic invalid_base64"
- 예상 결과: Base64 디코딩 에러 발생

Case 5: 콜론(:)이 없는 경우
- 입력: Authorization: "Basic " + Base64("invalidformat")
- 예상 결과: "Invalid Authorization header format" 에러 발생 (401)

Case 6: 콜론이 여러 개인 경우
- 입력: Authorization: "Basic " + Base64("test:pass:word")
- 예상 결과: "Invalid Authorization header format" 에러 발생 (401)

Case 7: 정상적인 입력
- 입력: Authorization: "Basic " + Base64("test@email.com:password")
- 예상 결과: ["test@email.com", "password"] 배열 반환
*/

const testCase1 = () => {
  // given
  const request = new Request("http://localhost:3000/api/auth/login", {
    method: "POST",
  });

  const expectedError = new Error("Auth Header does not exist", { cause: 401 });

  try {
    // when
    const result = extractBasicToken(request);

    return false;
  } catch (error) {
    // then
    if (error === expectedError) {
      return true;
    } else {
      return false;
    }
  }
};

console.log("testCase1: ", testCase1());

// Test Code

// given
// header에 토큰을 담아서 요청

// when 실제 로직을 돌려서 결과 값 받기
// 두개의 요소를 가진 배열을 반환

// then 결과 값을 바탕으로 테스트 코드 작성
// 두개의 요소를 가진 배열을 반환

/**
 * Case 1
 * Authorization 헤더가 존재하지 않는 경우
 *
 * Case 2
 * Authorization 후에 아무것도 없을 경우
 *
 * Case 3
 *
 *
 * Case 4
 * :이 없을 경우
 *
 * Case 5
 *
 *
 *
 */
