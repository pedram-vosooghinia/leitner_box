"use client";

import { Toaster } from "react-hot-toast";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#d5efff",
            border: "1px solid #0b4e72",
            color: "#0b4e72",
            padding: "16px",
            borderRadius: "6px",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
          },
          success: {
            duration: 2000,
            style: {
              background: "#dcfce7",
              border: "1px solid #22c55e",
              color: "#166534",
            },
            iconTheme: {
              primary: "#22c55e",
              secondary: "#f9fafb",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#fee2e2",
              border: "1px solid #ef4444",
              color: "#b91c1c",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fee2e2",
            },
          },
        }}
      />
    </>
  );
}
