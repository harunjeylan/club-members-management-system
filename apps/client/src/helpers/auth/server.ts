import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import "server-only";

export default function isAuthenticated(request: NextRequest| null) {
  if (request) {
    return request.cookies.has("token") ?? false;
  } 
  const cookieStore = cookies();
  const token = cookieStore.get("token") ?? false;
  return token;
}
