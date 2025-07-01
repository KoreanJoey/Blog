import { RbacGuard } from "@/backend/guard/rbacGuard";
import { verifyToken } from "@/backend/utils/verifyToken";
import { prisma } from "@/utils/prisma/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

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

  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    return new Response("There is no user with the id");
  }

  const response = {
    status: 200,
    statusText: "GetAllUsersWell",
    data: user,
  };

  return Response.json(response);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const userId = (await params).id;

  if (!userId) {
    return new Response("Error: User ID is required", { status: 400 });
  }

  // Simulate deleting the user
  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });

  const response = {
    status: 200,
    statusText: "UserDeletedWell!",
    data: deletedUser,
  };

  return new Response(JSON.stringify(response));
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const userId = (await params).id;

  if (!userId || !body.name) {
    return new Response("Error in request body", { status: 400 });
  }

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

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return new Response("There is no user with the id");
  }

  if (user.id !== decoded.sub) {
    return new Response("Error: Unauthorized");
  }

  // Simulate updating the user
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name: body.name,
    },
  });

  if (!updatedUser) {
    return new Response("Error: The user is not updated", { status: 500 });
  }

  const response = {
    status: 200,
    statusText: "UserUpdatedWell!",
    data: updatedUser,
  };

  return new Response(JSON.stringify(response));
}
