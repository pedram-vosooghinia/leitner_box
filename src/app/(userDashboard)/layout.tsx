import MenuDrop from "@/components/menu/MenuDrop";
import "../globals.css";
import ToastProvider from "@/provider/ToastProvider";
import SwrProvider from "@/provider/SwrProvider";
export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={``}>
        <MenuDrop />
        <ToastProvider>
          <SwrProvider>{children}</SwrProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
