import connectDB, { getDatabaseErrorResponse } from "@/lib/mongodb";
import ServiceEnquiry from "@/models/ServiceEnquiry";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      countryCode,
      phone,
      service,
      method,
      location,
      requirement,
    } = body;

    if (!name || !email || !countryCode || !phone || !service || !method || !location) {
      return Response.json(
        { success: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    await connectDB();
    await ServiceEnquiry.create({
      name,
      email,
      countryCode,
      phone,
      service,
      method,
      location,
      requirement,
    });

    return Response.json({ success: true, message: "Service request submitted." });
  } catch (error) {
    console.error("Service enquiry error:", error);
    const errorResponse = getDatabaseErrorResponse(error);

    return Response.json(
      { success: false, message: errorResponse.message },
      { status: errorResponse.status }
    );
  }
}
