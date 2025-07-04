export const extractBasicToken = (request: Request) => {
  const authHeaders = request.headers.get("Authorization");

  if (!authHeaders) {
    throw new Error("Auth Header does not exist", { cause: 401 });
  }

  const headersArray = authHeaders.split(" ");

  if (headersArray.length != 2) {
    throw new Error("Unexpected token", { cause: 401 });
  }

  const [basic, header] = headersArray;

  if (basic.toLowerCase() !== "basic") {
    throw new Error("Unexpected token", { cause: 401 });
  }

  const decoded = Buffer.from(header, "base64").toString("utf-8").split(":");

  if (decoded.length !== 2) {
    throw new Error("Invalid Authorization header format", { cause: 401 });
  }

  return decoded;
};
