export async function GET(request: Request) {
  return new Response("HELLO");
}

export async function POST(request: Request) {
  const body = await request.json();

  console.log("DEBUG: body - ", body);

  return new Response(JSON.stringify(body));
}
