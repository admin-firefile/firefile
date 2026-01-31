import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/lib/components/Navbar";
import Sidebar from "@/lib/components/Sidebat";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "FireFile",
  description: "Wildland Firefighting management tool.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  const authenticated = Boolean(token);

  return (
    <html lang="en" data-theme="firefile">
      <body className={`${inter.className} antialiased`}>
        {authenticated ? (
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <Navbar />
              <div className="p-4">{children}</div>
            </div>
            <Sidebar />
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
