import { auth } from "@/auth"
 
export default auth((req) => {
  //Use if needed to protect routes at the middleware level

  // if (!req.auth && req.nextUrl.pathname.startsWith("/projects")) {
  //   const newUrl = new URL("/", req.nextUrl.origin)
  //   // Optional: Add a query param to trigger the modal if we wanted to implement that in Navbar
  //   // newUrl.searchParams.set("login", "true")
  //   return Response.redirect(newUrl)
  // }
})
 
export const config = {
  // matcher: ["/projects/:path*"],
}
