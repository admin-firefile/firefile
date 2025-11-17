import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "FireFile",
  description: "Wildland Firefighting management tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' data-theme={"firefile"}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
