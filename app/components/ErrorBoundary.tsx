'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  sectionName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught a render error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-[32px] p-8 text-center sm:p-10"
            style={{
              background: 'rgb(var(--surface))',
              border: '1px solid rgb(var(--accent) / 0.18)',
              boxShadow: '0 24px 80px rgb(var(--accent) / 0.08)',
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{ background: 'linear-gradient(90deg, transparent, rgb(var(--accent)), transparent)' }}
            />
            <p
              className="mb-3 text-[10px] tracking-[0.36em] uppercase font-heading"
              style={{ color: 'rgb(var(--accent) / 0.62)' }}
            >
              Oracle Interruption
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl" style={{ color: 'rgb(var(--text-primary))' }}>
              Something went wrong
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed" style={{ color: 'rgb(var(--text-body) / 0.74)' }}>
              {this.props.sectionName
                ? `The ${this.props.sectionName} could not be rendered. Try again to re-enter this part of the oracle.`
                : 'This part of the oracle could not be rendered. Try again to restore the experience.'}
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="mt-6 rounded-full px-6 py-3 font-heading text-[11px] tracking-[0.18em] uppercase"
              style={{
                background: 'rgb(var(--accent))',
                color: 'rgb(var(--bg-primary))',
              }}
            >
              Retry
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
