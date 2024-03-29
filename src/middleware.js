export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  let currentUser = null;

  try {
    const response = await fetch("http://localhost:5000/me", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    currentUser = data.user;
  } finally {
    if (
      !currentUser &&
      !pathname.startsWith("/signin") &&
      !pathname.startsWith("/signup") &&
      !pathname.startsWith("/verify-email")
    ) {
      return Response.redirect(new URL("/signin", request.url));
    } else if (
      currentUser &&
      currentUser.emailVerified &&
      pathname.startsWith("/verify-email")
    ) {
      return Response.redirect(new URL("/", request.url));
    } else if (
      currentUser &&
      !currentUser.emailVerified &&
      !pathname.startsWith("/verify-email") &&
      !pathname.startsWith("/signup") &&
      !pathname.startsWith("/signin")
    ) {
      return Response.redirect(new URL("/verify-email", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
