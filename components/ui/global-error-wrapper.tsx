"use client";

import { useEffect } from 'react';
import { toast } from "sonner";

interface GlobalErrorWrapperProps {
  children: React.ReactNode;
}

export function GlobalErrorWrapper({ children }: GlobalErrorWrapperProps) {
  useEffect(() => {
    // Handle any unhandled errors globally
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      toast.error(event.error?.message || "Something went wrong. Please try again.");
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      
      // Check if it's a network error
      if (!navigator.onLine || 
          event.reason?.message?.toLowerCase().includes('network') ||
          event.reason?.message?.toLowerCase().includes('fetch')) {
        toast.error("Network error. Please check your internet connection and try again.");
      } else {
        toast.error(event.reason?.message || "Something went wrong. Please try again.");
      }
      
      event.preventDefault();
    };

    // Handle network status
    const handleOffline = () => {
      toast.error("You are offline. Please check your internet connection.");
    };

    const handleOnline = () => {
      console.log("Back online");
    };

    // Add listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Check initial network status
    if (!navigator.onLine) {
      handleOffline();
    }

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return <>{children}</>;
}