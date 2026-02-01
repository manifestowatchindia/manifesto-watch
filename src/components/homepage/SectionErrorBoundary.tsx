/**
 * SectionErrorBoundary - Error boundary for homepage sections
 * Phase 4 - STORY-066
 * Catches errors in individual sections without breaking the entire page
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';

export interface SectionErrorBoundaryProps {
    /** Section name for error reporting */
    sectionName: string;
    /** Fallback UI to render on error */
    fallback?: ReactNode;
    /** Error callback */
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    /** Children components */
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * SectionErrorBoundary Component
 * Isolates errors to individual sections
 */
export class SectionErrorBoundary extends Component<SectionErrorBoundaryProps, State> {
    constructor(props: SectionErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`Error in section "${this.props.sectionName}":`, error, errorInfo);
        this.props.onError?.(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div
                    className="section-error"
                    data-testid={`section-error-${this.props.sectionName}`}
                    style={{
                        padding: '32px 24px',
                        backgroundColor: '#fef2f2',
                        borderRadius: '8px',
                        margin: '16px 0',
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            fontSize: '2rem',
                            marginBottom: '12px',
                        }}
                        aria-hidden="true"
                    >
                        ⚠️
                    </div>
                    <p
                        style={{
                            margin: '0 0 8px 0',
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#991b1b',
                        }}
                    >
                        Something went wrong
                    </p>
                    <p
                        style={{
                            margin: 0,
                            fontSize: '0.875rem',
                            color: '#7f1d1d',
                        }}
                    >
                        We're having trouble loading this section. Please refresh the page.
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default SectionErrorBoundary;
