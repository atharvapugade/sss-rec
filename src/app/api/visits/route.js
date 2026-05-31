import connectDB from "@/lib/mongodb";
import Visit from "@/models/Visit";

export async function POST(request) {
  try {
    const { path, referrer } = await request.json();

    if (!path || path.startsWith("/admin-7c2b6a") || path.startsWith("/api")) {
      return Response.json({ success: true, message: "Visit ignored." });
    }

    const userAgent = request.headers.get("user-agent") || "";
    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const ip = forwardedFor.split(",")[0]?.trim() || "unknown";

    await connectDB();
    await Visit.create({
      path,
      referrer,
      userAgent,
      ip,
    });

    return Response.json({ success: true, message: "Visit recorded." });
  } catch (error) {
    console.error("Visit tracking error:", error);
    return Response.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
