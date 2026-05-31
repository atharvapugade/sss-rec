import { ADMIN_COOKIE_NAME } from "@/lib/adminAuth";

export async function POST() {
  const response = Response.json({
    success: true,
    message: "Logged out successfully.",
  });

  response.headers.append(
    "Set-Cookie",
    `${ADMIN_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`
  );

  return response;
}
