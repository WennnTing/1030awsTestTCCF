import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./navigation";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const intlMiddleware = createMiddleware({
  localePrefix,
  locales,
  defaultLocale: "zh",
});

export default async function middleware(request) {
  // 國際化
  const response = intlMiddleware(request);

  const path = request.nextUrl.pathname;
  const languages = ["zh", "en"];
  const publicRoutes = [
    /^\/$/,
    ...languages.map((lang) => new RegExp(`^/${lang}/exhibitionauth`)),
    ...languages.map((lang) => new RegExp(`^/${lang}/exhibition-login`)),
  ];

  const protectedRoutes = [
    ...languages.map((lang) => new RegExp(`^/${lang}/exhibition(?!auth)`)),
  ];

  const isProtectedRoute = protectedRoutes.some((route) => route.test(path));
  const isPublicRoute = publicRoutes.some((route) => route.test(path));

  const locale = path.split("/")[1];
  const cookieStore = cookies();
  const token = cookieStore.get("tccf_exhibition")?.value;

  if (isProtectedRoute && !token) {
    if (!path.includes("/exhibition-login")) {
      return NextResponse.redirect(
        new URL(`/${locale}/exhibition-login`, request.url)
      );
    }
  }

  if (isPublicRoute && token) {
    if (!path.includes("/exhibition") && path !== "/") {
      return NextResponse.redirect(
        new URL(`/${locale}/exhibition`, request.url)
      );
    }
  }

  const protocol = request.headers.get("x-forwarded-proto") || "http";
  const host = request.headers.get("host");
  response.headers.set("x-full-url", `${protocol}://${host}`);
  response.headers.set("x-current-path", request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ["/", "/(zh|en)/:path*"],
};
