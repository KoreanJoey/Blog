import { posts } from "../posts/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const onePost = posts.find((post) => post.id === id);

  if (!onePost) {
    return new Response("There is no post with the id");
  }

  const response = {
    status: 200,
    statusText: "FoundOnePostWell",
    data: onePost,
  };

  return Response.json(response);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const onePost = posts.find((post) => post.id === id);

  if (!onePost) {
    return new Response("There is no post with the id");
  }

  const body = await request.json();

  if (!body.title || !body.content) {
    return new Response("Error in request body");
  }

  onePost.title = body.title;

  onePost.content = body.content;

  //확장성 있는 코드로 변경 고려.

  const response = {
    status: 200,
    statusText: "EditedPostWell",
    data: onePost,
  };

  return Response.json(response);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    return new Response("There is no post with the id");
  }

  posts.splice(index, 1);

  const response = {
    status: 200,
    statusText: "DeletedPostWell",
  };

  return Response.json(response);
}
