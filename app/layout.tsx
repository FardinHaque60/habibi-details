import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Habibi Details | Car Detailing",
    template: "%s | Habibi Details",
  },
  description:
    "Professional car detailing services with interior, exterior, and full-detail packages.",
  keywords: ["car detailing", "auto detailing", "paint protection", "interior detailing"],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
