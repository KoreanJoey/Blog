export const extractBearerToken = (request: Request) => {
  const bearerToken = request.headers.get("Authorization");

  if (!bearerToken) {
    throw new Error("Error: Unexpected token", { cause: 401 });
  }

  const rawToken = bearerToken.split(" ");

  if (rawToken.length !== 2) {
    throw new Error("Error: No access token", { cause: 401 });
  }

  const [_, accessToken] = rawToken;

  return accessToken;
};
