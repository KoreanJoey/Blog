import { RbacGuard } from "@/app/backend/guard/rbacGuard";
import { verifyToken } from "@/app/backend/utils/verifyToken";
import { prisma } from "@/utils/prisma/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const post = await prisma.post.findUnique({
    where: { id: id },
  });

  if (!post) {
    return new Response("There is no post with the id");
  }

  const response = {
    status: 200,
    statusText: "FoundOnePostWell",
    data: post,
  };

  return Response.json(response);
}

//Only Admin or Post Author can edit the post
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const body = await request.json();

  if (!body.title || !body.content) {
    return new Response("Error in request body");
  }

  const accessToken = request.headers.get("Authorization")?.split(" ")[1];

  if (!accessToken) {
    return new Response("Error: No access token");
  }

  const decoded = verifyToken(accessToken);

  if (typeof decoded === "string") {
    return new Response("Error: Invalid token");
  }

  if (!decoded.sub) {
    return new Response("Error: No user id");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.sub,
    },
  });

  if (!user) {
    return new Response("Error: User not found");
  }

  const accessPermission = RbacGuard(user.role, "ADMIN");

  const post = await prisma.post.findUnique({
    where: { id: id },
  });

  if (!post) {
    return new Response("There is no post with the id");
  }

  if (!accessPermission && user.id !== post.authorId) {
    return new Response("Error: Unauthorized to edit this post");
  }

  const updatedPost = await prisma.post.update({
    where: { id: id },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  if (!updatedPost) {
    return new Response("There is no post with the id");
  }

  //확장성 있는 코드로 변경 고려.
  // 데이터베이스에서 편집하는 코드 존재 안 함.

  const response = {
    status: 200,
    statusText: "EditedPostWell",
    data: updatedPost,
  };

  return Response.json(response);
}

//Only Admin or Post Author can delete the post
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

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.sub,
    },
  });

  if (!user) {
    return new Response("Error: User not found");
  }

  const accessPermission = RbacGuard(user.role, "ADMIN");

  const id = (await params).id;

  const post = await prisma.post.findUnique({
    where: { id: id },
  });

  if (!post) {
    return new Response("There is no post with the id");
  }

  if (!accessPermission && user.id !== post.authorId) {
    return new Response("Error: Unauthorized to delete this post");
  }

  const deletedPost = await prisma.post.delete({
    where: { id: id },
  });

  if (!deletedPost) {
    return new Response("There is no post with the id");
  }

  const response = {
    status: 200,
    statusText: "DeletedPostWell",
    data: deletedPost.id,
  };

  return Response.json(response);
}
