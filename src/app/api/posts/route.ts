import { RbacGuard } from "@/app/backend/guard/rbacGuard";
import { verifyToken } from "@/app/backend/utils/verifyToken";
import { prisma } from "@/utils/prisma/prisma";

export async function GET() {
  return getAllPosts();
}

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const response = {
    status: 200,
    statusText: "GetAllPostsWell",
    data: posts,
  };

  return Response.json(response);
};

export async function POST(request: Request) {
  return postController(request);
}

const postController = async (request: Request) => {
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

  const accessPermission = RbacGuard(decoded.role, "USER");

  if (!accessPermission) {
    return new Response("Error: Unauthorized");
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

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: user.id,
    },
  });

  if (!post) {
    return new Response("Error: The post is not saved");
  }

  const response = {
    status: 200,
    statusText: "PostSavedWell!",
    data: post,
  };

  return new Response(JSON.stringify(response));
};
