import "./globals.css";
import ToastProvider from "@/provider/ToastProvider";
import SwrProvider from "@/provider/SwrProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`rtl flex flex-col min-h-screen`}>
        <main className="w-full h-screen flex flex-col  ">
          <ToastProvider>
            <SwrProvider>{children}</SwrProvider>
          </ToastProvider>
        </main>
      </body>
    </html>
  );
}
