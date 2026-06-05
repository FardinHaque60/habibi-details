import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // The main title for Google Search
  title: {
    template: '%s | Habibi Details',
    default: 'Habibi Details | Premium Mobile Car Detailing', 
  },
  description: "Top-tier mobile car detailing services. We bring the shine to your driveway with ceramic coatings, interior deep cleaning, and paint correction.",
  
  // formatting for iMessage/Facebook/Twitter
  openGraph: {
    title: 'Habibi Details | Premium Mobile Car Detailing',
    description: 'Top-tier mobile car detailing services right at your doorstep.',
    url: 'https://www.habibisdetail.com',
    siteName: 'Habibi Details',
    images: [
      {
        url: '/site_preview.png', // Create a nice 1200x630 image and put it in your public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  // Tells Google where your business is generally located
  alternates: {
    canonical: 'https://www.habibisdetail.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}