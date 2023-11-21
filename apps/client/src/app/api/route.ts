export async function GET(req) {
  return Response.json({ message: "tou get the response" });
}

export async function POST(req) {
  const { data } = await req.json();
  return Response.json({ message: "tou post the data", data });
}

export async function PUT(req) {
  const { data } = await req.json();
  return Response.json({ message: "tou update the data", data });
}

export async function DELETE(req) {
  return Response.json({ message: "tou delete the data" });
}
