import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return Response.json({ message: "tou get the response" });
}

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  return Response.json({ message: "tou post the data", data });
}

export async function PUT(req: NextRequest) {
  const { data } = await req.json();
  return Response.json({ message: "tou update the data", data });
}

export async function DELETE(req: NextRequest) {
  return Response.json({ message: "tou delete the data" });
}
