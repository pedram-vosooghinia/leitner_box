"use client";

import "../globals.css";
import ToastProvider from "@/provider/ToastProvider";
import SwrProvider from "@/provider/SwrProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="fa" dir="rtl">
      <body>
        <div className="flex min-h-screen flex-col">
          <ToastProvider>
            <SwrProvider>{children}</SwrProvider>
          </ToastProvider>
        </div>
      </body>
    </html>
  );
}
