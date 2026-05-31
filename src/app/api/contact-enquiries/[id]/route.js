import { getAdminSession } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import ContactEnquiry from "@/models/ContactEnquiry";

export async function DELETE(_request, { params }) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return Response.json(
        { success: false, message: "Unauthorized request." },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return Response.json(
        { success: false, message: "Enquiry id is required." },
        { status: 400 }
      );
    }

    await connectDB();
    const deletedEnquiry = await ContactEnquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return Response.json(
        { success: false, message: "Enquiry not found." },
        { status: 404 }
      );
    }

    return Response.json({ success: true, message: "Enquiry deleted." });
  } catch (error) {
    console.error("Delete contact enquiry error:", error);
    return Response.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
