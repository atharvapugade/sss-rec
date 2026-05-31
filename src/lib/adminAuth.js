import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE_NAME = "sss_admin_token";

const ADMIN_BASE_PATH = "/admin-7c2b6a";

export function signAdminToken(email) {
  return jwt.sign(
    {
      email,
      role: "admin",
    },
    process.env.ADMIN_JWT_SECRET,
    { expiresIn: "1d" }
  );
}

export function verifyAdminToken(token) {
  if (!token || !process.env.ADMIN_JWT_SECRET) return null;

  try {
    return jwt.verify(token, process.env.ADMIN_JWT_SECRET);
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  return verifyAdminToken(token);
}

export async function requireAdminAuth() {
  const session = await getAdminSession();

  if (!session) {
    redirect(ADMIN_BASE_PATH);
  }

  return session;
}
