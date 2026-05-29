import "./globals.css";

export const metadata = {
  title: "SSS Recruitment",
  description: "Achieve Together !!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}