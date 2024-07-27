import { auth } from "@/auth";
import { auth_routes } from "./lib/constants";

export default auth((req) => {
  const isAuthRoute = auth_routes.includes(req.nextUrl.pathname);

  console.log(isAuthRoute);

  if (req.auth && isAuthRoute) {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
