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

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: body.authorId,
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

