import "./globals.css";
import VisitTracker from "@/components/VisitTracker";

export const metadata = {
  title: "SSS Recruitment",
  description: "Achieve Together !!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <VisitTracker />
        {children}
      </body>
    </html>
  );
}
