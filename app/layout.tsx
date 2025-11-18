import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/lib/components/Navbar";
import Sidebar from "@/lib/components/Sidebat";

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
      <body className={`${inter.className} antialiased`}>
        <div className='drawer lg:drawer-open'>
          <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
          <div className='drawer-content'>
            <Navbar />
            <div className='p-4'>{children}</div>
          </div>
          <Sidebar />
        </div>
      </body>
    </html>
  );
}
