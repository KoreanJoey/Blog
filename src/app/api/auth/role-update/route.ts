import { RbacGuard } from "@/backend/guard/rbacGuard";
import { verifyToken } from "@/backend/utils/verifyToken";
import { prisma } from "@/utils/prisma/prisma";

export async function PATCH(request: Request) {
  const accessToken = request.headers.get("Authorization")?.split(" ")[1];

  if (!accessToken) {
    return new Response("Error: No access token");
  }

  const decoded = verifyToken(accessToken);

  if (typeof decoded === "string") {
    return new Response("Error: Invalid token");
  }

  const accessPermission = RbacGuard(decoded.role, "ADMIN");

  if (!accessPermission) {
    return new Response("Error: Unauthorized");
  }
  const body = await request.json();

  if (!body.id) {
    return new Response("Error: No id");
  }

  if (!body.role) {
    return new Response("Error: No role");
  }

  const user = await prisma.user.findUnique({
    where: { id: body.id },
  });

  if (!user) {
    return new Response("Error: User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id: body.id },
    data: { role: body.role },
  });

  const response = {
    status: 200,
    statusText: "Role updated successfully",
    data: updatedUser,
  };

  return Response.json(response);
}
