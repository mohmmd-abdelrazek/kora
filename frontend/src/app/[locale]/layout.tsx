import type { Metadata } from "next";
import "./globals.css";
import Header from "@/src/components/header/Header";
import Providers from "./providers";
import Footer from "@/src/components/Footer";

export const metadata: Metadata = {
  title: "دوري الشباب",
  description: "دوري الشباب",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
