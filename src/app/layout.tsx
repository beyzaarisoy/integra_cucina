import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { Cursor } from "@/components/layout/Cursor";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://integracucina.com"),
  title: {
    default: "Integra Cucina — Italian Kitchens, Crafted for American Homes",
    template: "%s — Integra Cucina",
  },
  description:
    "Luxury Italian-designed kitchens, cabinetry and stone countertops. Visit our showrooms in New York, Miami, Los Angeles and Chicago or book a private design consultation.",
  openGraph: {
    title: "Integra Cucina",
    description: "The art of the kitchen. Italian design, crafted for American homes.",
    images: ["/images/kitchen-midnight-calacatta-oro.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScroll>
          <Preloader />
          <Cursor />
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
