import { toast } from "sonner";

export class GlobalErrorHandler {
  static handleError(error: any, context?: string) {
    console.error(`Error${context ? ` in ${context}` : ''}:`, error);
    
    // Check for network errors
    if (this.isNetworkError(error)) {
      toast.error("Please check your internet connection and try again.");
      return;
    }
    
    // Check for server errors
    if (this.isServerError(error)) {
      toast.error("Server error. Please try again later.");
      return;
    }
    
    // Check for authentication errors
    if (this.isAuthError(error)) {
      toast.error("Authentication failed. Please log in again.");
      return;
    }
    
    // Generic error message
    const message = "Something went wrong. Please try again.";
    toast.error(message);
  }
  
  private static isNetworkError(error: any): boolean {
    return (
      !navigator.onLine ||
      error?.name === 'NetworkError' ||
      error?.code === 'NETWORK_ERROR' ||
      error?.message?.toLowerCase().includes('network') ||
      error?.message?.toLowerCase().includes('fetch') ||
      error?.message?.toLowerCase().includes('connection') ||
      error?.cause?.code === 'ECONNREFUSED' ||
      error?.cause?.code === 'ENOTFOUND'
    );
  }
  
  private static isServerError(error: any): boolean {
    return (
      error?.status >= 500 ||
      error?.response?.status >= 500 ||
      error?.message?.toLowerCase().includes('server error')
    );
  }
  
  private static isAuthError(error: any): boolean {
    return (
      error?.status === 401 ||
      error?.response?.status === 401 ||
      error?.message?.toLowerCase().includes('unauthorized')
    );
  }
}

// components/error-boundary.tsx
"use client";

import React from 'react';
import { GlobalErrorHandler } from '@/lib/error-handler';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    GlobalErrorHandler.handleError(error, 'React Error Boundary');
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />;
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#1d2021] text-[#ebdbb2]">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Something went wrong</h2>
            <p className="text-[#a89984]">An unexpected error occurred</p>
            <button
              onClick={this.resetError}
              className="px-4 py-2 bg-[#fe8019] text-[#1d2021] rounded hover:bg-[#d65d0e]"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// hooks/use-error-handler.ts
"use client";

import { useCallback } from 'react';
import { GlobalErrorHandler } from '@/lib/error-handler';

export const useErrorHandler = () => {
  const handleError = useCallback((error: any, context?: string) => {
    GlobalErrorHandler.handleError(error, context);
  }, []);

  return { handleError };
};