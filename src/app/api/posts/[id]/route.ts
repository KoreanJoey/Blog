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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const body = await request.json();

  if (!body.title || !body.content) {
    return new Response("Error in request body");
  }

  const post = await prisma.post.update({
    where: { id: id },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  if (!post) {
    return new Response("There is no post with the id");
  }

  //확장성 있는 코드로 변경 고려.
  // 데이터베이스에서 편집하는 코드 존재 안 함.

  const response = {
    status: 200,
    statusText: "EditedPostWell",
    data: post,
  };

  return Response.json(response);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const index = await prisma.post.delete({
    where: { id: id },
  });

  const response = {
    status: 200,
    statusText: "DeletedPostWell",
  };

  return Response.json(response);
}
