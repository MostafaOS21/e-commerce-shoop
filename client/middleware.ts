import { auth } from "@/auth";
import { auth_routes } from "./lib/constants";

export default auth((req) => {
  const isAuthRoute = auth_routes.includes(req.nextUrl.pathname);
  const isAdminRoute = req.nextUrl.pathname.includes("/dashboard");
  const newUrl = new URL("/", req.nextUrl.origin);

  const isAdmin = req.auth?.user?.role === "admin";

  if (req.auth && isAuthRoute) {
    return Response.redirect(newUrl);
  }

  if (isAdminRoute && !isAdmin) {
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
