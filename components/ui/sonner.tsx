"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      expand={false}
      richColors={true}
      closeButton={false}
      duration={4000}
      gap={8}
      visibleToasts={5}
      toastOptions={{
        style: {
          background: "#1d2021",
          border: "1px solid #3c3836",
          color: "#ebdbb2",
          fontSize: "14px",
          fontWeight: "500",
          borderRadius: "10px",
          padding: "12px 16px",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)",
        },
        classNames: {
          toast:
            "group toast bg-[#1d2021] text-[#ebdbb2] border-[#3c3836] shadow-lg",
          description:
            "text-[#a89984] text-sm opacity-90 group-[.toast]:mt-1",
          actionButton:
            "bg-[#1d2021] text-[#ebddb2] hover:bg-[#fabd2f] border border-[#d65d0e]",
          cancelButton:
            "bg-[#282828] text-[#ebdbb2] hover:bg-[#3c3836] border border-[#3c3836]",
          closeButton:
            "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836] border border-[#3c3836]",
          success:
            "border-l-4 border-l-[#8ec07c] bg-[#1d2021] text-[#ebdbb2]",
          error:
            "border-l-4 border-l-[#fb4934] bg-[#1d2021] text-[#ebdbb2]",
          warning:
            "border-l-4 border-l-[#fabd2f] bg-[#1d2021] text-[#ebdbb2]",
          info:
            "border-l-4 border-l-[#83a598] bg-[#1d2021] text-[#ebdbb2]",
        },
      }}
      icons={{
        success: (
          <svg
            className="w-4 h-4 text-[#8ec07c]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ),
        error: (
          <svg
            className="w-4 h-4 text-[#fb4934]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ),
        warning: (
          <svg
            className="w-4 h-4 text-[#fabd2f]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        ),
        info: (
          <svg
            className="w-4 h-4 text-[#83a598]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        ),
        loading: (
          <svg
            className="w-4 h-4 text-[#d79921] animate-spin"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        ),
      }}
      {...props}
    />
  )
}

export { Toaster }
