import { posts } from "./db";

export async function GET() {
  return getAllPosts();
}

const getAllPosts = async () => {
  const postsAll = posts;

  const response = {
    status: 200,
    statusText: "GetAllPostsWell",
    data: postsAll,
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

  const postId = Math.random().toString(16).slice(2);

  const post = {
    id: postId,
    ...body,
  };

  posts.push(post);

  const savedPost = posts.find((post) => post.id === postId);

  if (!savedPost) {
    return new Response("Error: The post is not saved");
  }

  const response = {
    status: 200,
    statusText: "PostSavedWell!",
    data: savedPost,
  };

  return new Response(JSON.stringify(response));
};
