import { ADMIN_COOKIE_NAME, signAdminToken } from "@/lib/adminAuth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { success: false, message: "Please enter email and password." },
        { status: 400 }
      );
    }

    const isValidAdmin =
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD;

    if (!isValidAdmin) {
      return Response.json(
        { success: false, message: "Invalid admin credentials." },
        { status: 401 }
      );
    }

    if (!process.env.ADMIN_JWT_SECRET) {
      return Response.json(
        { success: false, message: "Admin auth secret is missing." },
        { status: 500 }
      );
    }

    const token = signAdminToken(email);
    const response = Response.json({
      success: true,
      message: "Logged in successfully.",
    });

    response.headers.append(
      "Set-Cookie",
      `${ADMIN_COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`
    );

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return Response.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
