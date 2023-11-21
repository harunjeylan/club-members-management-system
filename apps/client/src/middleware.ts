import { NextRequest, NextResponse } from "next/server";
import { privateClientRoutes, privateServerRoutes } from "./helpers/routers";
import isAuthenticated from "./helpers/auth/server";


export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.nextUrl.pathname.startsWith("/api")) {
    if (!isAuthenticated(request)) {
      const isRoutePublic = privateClientRoutes.every(
        (route) => !request.nextUrl.pathname.startsWith(route)
      );
      if (!isRoutePublic) {
        return NextResponse.redirect(new URL(`/auth/login?next=${request.nextUrl.pathname}`, request.url));
      }
    } else if (
      request.nextUrl.pathname === "/auth/login" ||
      request.nextUrl.pathname === "/auth/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/api")) {
    if (!isAuthenticated(request)) {
      const isRoutePublic = privateServerRoutes.every(
        (route) => !request.nextUrl.pathname.startsWith(route)
      );
      if (!isRoutePublic) {
        return Response.json(
          { success: false, message: "authentication failed" },
          { status: 401 }
        );
      }
    }

    response.headers.append("Access-Control-Allow-Credentials", "true");
    response.headers.append("Access-Control-Allow-Origin", "*");
    response.headers.append(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT"
    );
    response.headers.append(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
  }

  return response;
}

export const config = {
  matcher: "/:path*",
};
