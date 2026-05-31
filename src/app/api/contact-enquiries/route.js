import connectDB from "@/lib/mongodb";
import ContactEnquiry from "@/models/ContactEnquiry";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, reason, message } = body;

    if (!name || !email || !reason || !message) {
      return Response.json(
        { success: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    await connectDB();
    await ContactEnquiry.create({
      name,
      phone,
      email,
      reason,
      message,
    });

    return Response.json({ success: true, message: "Enquiry submitted." });
  } catch (error) {
    console.error("Contact enquiry error:", error);
    return Response.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
