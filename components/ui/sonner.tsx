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
      richColors={false}
      closeButton
      duration={4000}
      gap={8}
      visibleToasts={5}
      toastOptions={{
        style: {
          background: 'hsl(0 0% 9%)',
          border: '1px solid hsl(0 0% 15%)',
          color: 'hsl(0 0% 95%)',
          fontSize: '14px',
          fontWeight: '500',
          borderRadius: '8px',
          padding: '12px 16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
        classNames: {
          toast: 'group toast group-[.toaster]:bg-[hsl(0_0%_9%)] group-[.toaster]:text-[hsl(0_0%_95%)] group-[.toaster]:border-[hsl(0_0%_15%)] group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-[hsl(0_0%_70%)] text-sm opacity-90',
          actionButton: 'group-[.toast]:bg-[hsl(0_0%_95%)] group-[.toast]:text-[hsl(0_0%_9%)] hover:group-[.toast]:bg-[hsl(0_0%_85%)] group-[.toast]:border-[hsl(0_0%_15%)]',
          cancelButton: 'group-[.toast]:bg-[hsl(0_0%_15%)] group-[.toast]:text-[hsl(0_0%_95%)] hover:group-[.toast]:bg-[hsl(0_0%_20%)] group-[.toast]:border-[hsl(0_0%_25%)]',
          closeButton: 'group-[.toast]:border-[hsl(0_0%_15%)] group-[.toast]:hover:border-[hsl(0_0%_25%)] group-[.toast]:bg-transparent group-[.toast]:hover:bg-[hsl(0_0%_15%)] group-[.toast]:text-[hsl(0_0%_70%)] group-[.toast]:hover:text-[hsl(0_0%_95%)]',
          success: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-green-500 group-[.toaster]:border-[hsl(0_0%_15%)]',
          error: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-red-500 group-[.toaster]:border-[hsl(0_0%_15%)]',
          warning: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-yellow-500 group-[.toaster]:border-[hsl(0_0%_15%)]',
          info: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-blue-500 group-[.toaster]:border-[hsl(0_0%_15%)]',
        },
      }}
      icons={{
        success: (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ),
        error: (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ),
        warning: (
          <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        ),
        info: (
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        ),
        loading: (
          <svg className="w-4 h-4 text-blue-500 animate-spin" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        ),
      }}
      {...props}
    />
  )
}

export { Toaster }