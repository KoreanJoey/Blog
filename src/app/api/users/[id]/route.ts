import { prisma } from "@/utils/prisma/prisma";


export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
